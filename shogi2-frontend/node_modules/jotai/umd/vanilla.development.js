(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jotai/vanilla/internals')) :
  typeof define === 'function' && define.amd ? define(['exports', 'jotai/vanilla/internals'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.jotaiVanilla = {}, global.jotaiVanillaInternals));
})(this, (function (exports, internals) { 'use strict';

  var keyCount = 0;
  function atom(read, write) {
    var key = "atom" + ++keyCount;
    var config = {
      toString: function toString() {
        return this.debugLabel ? key + ':' + this.debugLabel : key;
      }
    };
    if (typeof read === 'function') {
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
    return set(this, typeof arg === 'function' ? arg(get(this)) : arg);
  }

  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }
  function _createForOfIteratorHelperLoose(r, e) {
    var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (t) return (t = t.call(r)).next.bind(t);
    if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e) {
      t && (r = t);
      var o = 0;
      return function () {
        return o >= r.length ? {
          done: true
        } : {
          done: false,
          value: r[o++]
        };
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
  }

  var createDevStoreRev4 = function createDevStoreRev4() {
    var inRestoreAtom = 0;
    var storeHooks = internals.INTERNAL_initializeStoreHooks({});
    var atomStateMap = new WeakMap();
    var mountedAtoms = new WeakMap();
    var store = internals.INTERNAL_buildStoreRev1(atomStateMap, mountedAtoms, undefined, undefined, undefined, undefined, storeHooks, undefined, function (atom, get, set) {
      for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
        args[_key - 3] = arguments[_key];
      }
      if (inRestoreAtom) {
        return set.apply(void 0, [atom].concat(args));
      }
      return atom.write.apply(atom, [get, set].concat(args));
    });
    var debugMountedAtoms = new Set();
    storeHooks.m.add(undefined, function (atom) {
      debugMountedAtoms.add(atom);
      var atomState = atomStateMap.get(atom);
      atomState.m = mountedAtoms.get(atom);
    });
    storeHooks.u.add(undefined, function (atom) {
      debugMountedAtoms.delete(atom);
      var atomState = atomStateMap.get(atom);
      delete atomState.m;
    });
    var devStore = {
      dev4_get_internal_weak_map: function dev4_get_internal_weak_map() {
        console.log('Deprecated: Use devstore from the devtools library');
        return atomStateMap;
      },
      dev4_get_mounted_atoms: function dev4_get_mounted_atoms() {
        return debugMountedAtoms;
      },
      dev4_restore_atoms: function dev4_restore_atoms(values) {
        var restoreAtom = {
          read: function read() {
            return null;
          },
          write: function write(_get, set) {
            ++inRestoreAtom;
            try {
              for (var _iterator = _createForOfIteratorHelperLoose(values), _step; !(_step = _iterator()).done;) {
                var _step$value = _step.value,
                  atom = _step$value[0],
                  value = _step$value[1];
                if ('init' in atom) {
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
  var overiddenCreateStore;
  function INTERNAL_overrideCreateStore(fn) {
    overiddenCreateStore = fn(overiddenCreateStore);
  }
  function createStore() {
    if (overiddenCreateStore) {
      return overiddenCreateStore();
    }
    {
      return createDevStoreRev4();
    }
  }
  var defaultStore;
  function getDefaultStore() {
    if (!defaultStore) {
      defaultStore = createStore();
      {
        var _ref;
        (_ref = globalThis).__JOTAI_DEFAULT_STORE__ || (_ref.__JOTAI_DEFAULT_STORE__ = defaultStore);
        if (globalThis.__JOTAI_DEFAULT_STORE__ !== defaultStore) {
          console.warn('Detected multiple Jotai instances. It may cause unexpected behavior with the default store. https://github.com/pmndrs/jotai/discussions/2044');
        }
      }
    }
    return defaultStore;
  }

  exports.INTERNAL_overrideCreateStore = INTERNAL_overrideCreateStore;
  exports.atom = atom;
  exports.createStore = createStore;
  exports.getDefaultStore = getDefaultStore;

}));
