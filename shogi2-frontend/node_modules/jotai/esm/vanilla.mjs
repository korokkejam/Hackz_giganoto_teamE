import { INTERNAL_buildStoreRev1, INTERNAL_initializeStoreHooks } from 'jotai/vanilla/internals';

let keyCount = 0;
function atom(read, write) {
  const key = `atom${++keyCount}`;
  const config = {
    toString() {
      return (import.meta.env ? import.meta.env.MODE : void 0) !== "production" && this.debugLabel ? key + ":" + this.debugLabel : key;
    }
  };
  if (typeof read === "function") {
    config.read = read;
  } else {
    config.init = read;
    config.read = defaultRead;
    config.write = defaultWrite;
  }
  if (write) {
    config.write = write;
  }
  return config;
}
function defaultRead(get) {
  return get(this);
}
function defaultWrite(get, set, arg) {
  return set(
    this,
    typeof arg === "function" ? arg(get(this)) : arg
  );
}

const createDevStoreRev4 = () => {
  let inRestoreAtom = 0;
  const storeHooks = INTERNAL_initializeStoreHooks({});
  const atomStateMap = /* @__PURE__ */ new WeakMap();
  const mountedAtoms = /* @__PURE__ */ new WeakMap();
  const store = INTERNAL_buildStoreRev1(
    atomStateMap,
    mountedAtoms,
    void 0,
    void 0,
    void 0,
    void 0,
    storeHooks,
    void 0,
    (atom, get, set, ...args) => {
      if (inRestoreAtom) {
        return set(atom, ...args);
      }
      return atom.write(get, set, ...args);
    }
  );
  const debugMountedAtoms = /* @__PURE__ */ new Set();
  storeHooks.m.add(void 0, (atom) => {
    debugMountedAtoms.add(atom);
    const atomState = atomStateMap.get(atom);
    atomState.m = mountedAtoms.get(atom);
  });
  storeHooks.u.add(void 0, (atom) => {
    debugMountedAtoms.delete(atom);
    const atomState = atomStateMap.get(atom);
    delete atomState.m;
  });
  const devStore = {
    // store dev methods (these are tentative and subject to change without notice)
    dev4_get_internal_weak_map: () => {
      console.log("Deprecated: Use devstore from the devtools library");
      return atomStateMap;
    },
    dev4_get_mounted_atoms: () => debugMountedAtoms,
    dev4_restore_atoms: (values) => {
      const restoreAtom = {
        read: () => null,
        write: (_get, set) => {
          ++inRestoreAtom;
          try {
            for (const [atom, value] of values) {
              if ("init" in atom) {
                set(atom, value);
              }
            }
          } finally {
            --inRestoreAtom;
          }
        }
      };
      store.set(restoreAtom);
    }
  };
  return Object.assign(store, devStore);
};
let overiddenCreateStore;
function INTERNAL_overrideCreateStore(fn) {
  overiddenCreateStore = fn(overiddenCreateStore);
}
function createStore() {
  if (overiddenCreateStore) {
    return overiddenCreateStore();
  }
  if ((import.meta.env ? import.meta.env.MODE : void 0) !== "production") {
    return createDevStoreRev4();
  }
  return INTERNAL_buildStoreRev1();
}
let defaultStore;
function getDefaultStore() {
  if (!defaultStore) {
    defaultStore = createStore();
    if ((import.meta.env ? import.meta.env.MODE : void 0) !== "production") {
      globalThis.__JOTAI_DEFAULT_STORE__ || (globalThis.__JOTAI_DEFAULT_STORE__ = defaultStore);
      if (globalThis.__JOTAI_DEFAULT_STORE__ !== defaultStore) {
        console.warn(
          "Detected multiple Jotai instances. It may cause unexpected behavior with the default store. https://github.com/pmndrs/jotai/discussions/2044"
        );
      }
    }
  }
  return defaultStore;
}

export { INTERNAL_overrideCreateStore, atom, createStore, getDefaultStore };
