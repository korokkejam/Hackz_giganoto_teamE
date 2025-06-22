'use strict';

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

var isSelfAtom = function isSelfAtom(atom, a) {
  return atom.unstable_is ? atom.unstable_is(a) : a === atom;
};
var hasInitialValue = function hasInitialValue(atom) {
  return 'init' in atom;
};
var isActuallyWritableAtom = function isActuallyWritableAtom(atom) {
  return !!atom.write;
};
var isAtomStateInitialized = function isAtomStateInitialized(atomState) {
  return 'v' in atomState || 'e' in atomState;
};
var returnAtomValue = function returnAtomValue(atomState) {
  if ('e' in atomState) {
    throw atomState.e;
  }
  if (process.env.NODE_ENV !== 'production' && !('v' in atomState)) {
    throw new Error('[Bug] atom state is not initialized');
  }
  return atomState.v;
};
var promiseStateMap = new WeakMap();
var isPendingPromise = function isPendingPromise(value) {
  var _promiseStateMap$get;
  return isPromiseLike(value) && !!((_promiseStateMap$get = promiseStateMap.get(value)) != null && _promiseStateMap$get[0]);
};
var abortPromise = function abortPromise(promise) {
  var promiseState = promiseStateMap.get(promise);
  if (promiseState != null && promiseState[0]) {
    promiseState[0] = false;
    promiseState[1].forEach(function (fn) {
      return fn();
    });
  }
};
var registerAbortHandler = function registerAbortHandler(promise, abortHandler) {
  var promiseState = promiseStateMap.get(promise);
  if (!promiseState) {
    promiseState = [true, new Set()];
    promiseStateMap.set(promise, promiseState);
    var settle = function settle() {
      promiseState[0] = false;
    };
    promise.then(settle, settle);
  }
  promiseState[1].add(abortHandler);
};
var isPromiseLike = function isPromiseLike(p) {
  return typeof (p == null ? void 0 : p.then) === 'function';
};
var addPendingPromiseToDependency = function addPendingPromiseToDependency(atom, promise, dependencyAtomState) {
  if (!dependencyAtomState.p.has(atom)) {
    dependencyAtomState.p.add(atom);
    promise.then(function () {
      dependencyAtomState.p.delete(atom);
    }, function () {
      dependencyAtomState.p.delete(atom);
    });
  }
};
var setAtomStateValueOrPromise = function setAtomStateValueOrPromise(atom, valueOrPromise, ensureAtomState) {
  var atomState = ensureAtomState(atom);
  var hasPrevValue = 'v' in atomState;
  var prevValue = atomState.v;
  if (isPromiseLike(valueOrPromise)) {
    for (var _iterator = _createForOfIteratorHelperLoose(atomState.d.keys()), _step; !(_step = _iterator()).done;) {
      var a = _step.value;
      addPendingPromiseToDependency(atom, valueOrPromise, ensureAtomState(a));
    }
  }
  atomState.v = valueOrPromise;
  delete atomState.e;
  if (!hasPrevValue || !Object.is(prevValue, atomState.v)) {
    ++atomState.n;
    if (isPromiseLike(prevValue)) {
      abortPromise(prevValue);
    }
  }
};
var getMountedOrPendingDependents = function getMountedOrPendingDependents(atom, atomState, mountedMap) {
  var dependents = new Set();
  for (var _iterator2 = _createForOfIteratorHelperLoose(((_mountedMap$get = mountedMap.get(atom)) == null ? void 0 : _mountedMap$get.t) || []), _step2; !(_step2 = _iterator2()).done;) {
    var _mountedMap$get;
    var a = _step2.value;
    if (mountedMap.has(a)) {
      dependents.add(a);
    }
  }
  for (var _iterator3 = _createForOfIteratorHelperLoose(atomState.p), _step3; !(_step3 = _iterator3()).done;) {
    var atomWithPendingPromise = _step3.value;
    dependents.add(atomWithPendingPromise);
  }
  return dependents;
};
var createStoreHook = function createStoreHook() {
  var callbacks = new Set();
  var notify = function notify() {
    callbacks.forEach(function (fn) {
      return fn();
    });
  };
  notify.add = function (fn) {
    callbacks.add(fn);
    return function () {
      callbacks.delete(fn);
    };
  };
  return notify;
};
var createStoreHookForAtoms = function createStoreHookForAtoms() {
  var all = {};
  var callbacks = new WeakMap();
  var notify = function notify(atom) {
    var _callbacks$get, _callbacks$get2;
    (_callbacks$get = callbacks.get(all)) == null || _callbacks$get.forEach(function (fn) {
      return fn(atom);
    });
    (_callbacks$get2 = callbacks.get(atom)) == null || _callbacks$get2.forEach(function (fn) {
      return fn();
    });
  };
  notify.add = function (atom, fn) {
    var key = atom || all;
    var fns = (callbacks.has(key) ? callbacks : callbacks.set(key, new Set())).get(key);
    fns.add(fn);
    return function () {
      fns == null || fns.delete(fn);
      if (!fns.size) {
        callbacks.delete(key);
      }
    };
  };
  return notify;
};
var initializeStoreHooks = function initializeStoreHooks(storeHooks) {
  var _ref, _ref2, _ref3, _ref4;
  (_ref = storeHooks).c || (_ref.c = createStoreHookForAtoms());
  (_ref2 = storeHooks).m || (_ref2.m = createStoreHookForAtoms());
  (_ref3 = storeHooks).u || (_ref3.u = createStoreHookForAtoms());
  (_ref4 = storeHooks).f || (_ref4.f = createStoreHook());
  return storeHooks;
};
var BUILDING_BLOCKS = Symbol();
var getBuildingBlocks = function getBuildingBlocks(store) {
  return store[BUILDING_BLOCKS];
};
var buildStore = function buildStore(atomStateMap, mountedMap, invalidatedAtoms, changedAtoms, mountCallbacks, unmountCallbacks, storeHooks, atomRead, atomWrite, atomOnInit, atomOnMount) {
  if (atomStateMap === void 0) {
    atomStateMap = new WeakMap();
  }
  if (mountedMap === void 0) {
    mountedMap = new WeakMap();
  }
  if (invalidatedAtoms === void 0) {
    invalidatedAtoms = new WeakMap();
  }
  if (changedAtoms === void 0) {
    changedAtoms = new Set();
  }
  if (mountCallbacks === void 0) {
    mountCallbacks = new Set();
  }
  if (unmountCallbacks === void 0) {
    unmountCallbacks = new Set();
  }
  if (storeHooks === void 0) {
    storeHooks = {};
  }
  if (atomRead === void 0) {
    atomRead = function atomRead(atom) {
      for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        params[_key - 1] = arguments[_key];
      }
      return atom.read.apply(atom, params);
    };
  }
  if (atomWrite === void 0) {
    atomWrite = function atomWrite(atom) {
      for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        params[_key2 - 1] = arguments[_key2];
      }
      return atom.write.apply(atom, params);
    };
  }
  if (atomOnInit === void 0) {
    atomOnInit = function atomOnInit(atom, store) {
      return atom.unstable_onInit == null ? void 0 : atom.unstable_onInit(store);
    };
  }
  if (atomOnMount === void 0) {
    atomOnMount = function atomOnMount(atom, setAtom) {
      return atom.onMount == null ? void 0 : atom.onMount(setAtom);
    };
  }
  var ensureAtomState = (arguments.length <= 11 ? undefined : arguments[11]) || function (atom) {
    if (process.env.NODE_ENV !== 'production' && !atom) {
      throw new Error('Atom is undefined or null');
    }
    var atomState = atomStateMap.get(atom);
    if (!atomState) {
      atomState = {
        d: new Map(),
        p: new Set(),
        n: 0
      };
      atomStateMap.set(atom, atomState);
      atomOnInit == null || atomOnInit(atom, store);
    }
    return atomState;
  };
  var flushCallbacks = (arguments.length <= 12 ? undefined : arguments[12]) || function () {
    var errors = [];
    var call = function call(fn) {
      try {
        fn();
      } catch (e) {
        errors.push(e);
      }
    };
    var _loop = function _loop() {
      if (storeHooks.f) {
        call(storeHooks.f);
      }
      var callbacks = new Set();
      var add = callbacks.add.bind(callbacks);
      changedAtoms.forEach(function (atom) {
        var _mountedMap$get2;
        return (_mountedMap$get2 = mountedMap.get(atom)) == null ? void 0 : _mountedMap$get2.l.forEach(add);
      });
      changedAtoms.clear();
      unmountCallbacks.forEach(add);
      unmountCallbacks.clear();
      mountCallbacks.forEach(add);
      mountCallbacks.clear();
      callbacks.forEach(call);
      if (changedAtoms.size) {
        recomputeInvalidatedAtoms();
      }
    };
    do {
      _loop();
    } while (changedAtoms.size || unmountCallbacks.size || mountCallbacks.size);
    if (errors.length) {
      throw new AggregateError(errors);
    }
  };
  var recomputeInvalidatedAtoms = (arguments.length <= 13 ? undefined : arguments[13]) || function () {
    var topSortedReversed = [];
    var visiting = new WeakSet();
    var visited = new WeakSet();
    var stack = Array.from(changedAtoms);
    while (stack.length) {
      var a = stack[stack.length - 1];
      var aState = ensureAtomState(a);
      if (visited.has(a)) {
        stack.pop();
        continue;
      }
      if (visiting.has(a)) {
        if (invalidatedAtoms.get(a) === aState.n) {
          topSortedReversed.push([a, aState]);
        } else if (process.env.NODE_ENV !== 'production' && invalidatedAtoms.has(a)) {
          throw new Error('[Bug] invalidated atom exists');
        }
        visited.add(a);
        stack.pop();
        continue;
      }
      visiting.add(a);
      for (var _iterator4 = _createForOfIteratorHelperLoose(getMountedOrPendingDependents(a, aState, mountedMap)), _step4; !(_step4 = _iterator4()).done;) {
        var d = _step4.value;
        if (!visiting.has(d)) {
          stack.push(d);
        }
      }
    }
    for (var i = topSortedReversed.length - 1; i >= 0; --i) {
      var _ref5 = topSortedReversed[i],
        _a = _ref5[0],
        _aState = _ref5[1];
      var hasChangedDeps = false;
      for (var _iterator5 = _createForOfIteratorHelperLoose(_aState.d.keys()), _step5; !(_step5 = _iterator5()).done;) {
        var dep = _step5.value;
        if (dep !== _a && changedAtoms.has(dep)) {
          hasChangedDeps = true;
          break;
        }
      }
      if (hasChangedDeps) {
        readAtomState(_a);
        mountDependencies(_a);
      }
      invalidatedAtoms.delete(_a);
    }
  };
  var readAtomState = (arguments.length <= 14 ? undefined : arguments[14]) || function (atom) {
    var atomState = ensureAtomState(atom);
    if (isAtomStateInitialized(atomState)) {
      if (mountedMap.has(atom) && invalidatedAtoms.get(atom) !== atomState.n) {
        return atomState;
      }
      if (Array.from(atomState.d).every(function (_ref6) {
        var a = _ref6[0],
          n = _ref6[1];
        return (readAtomState(a).n === n
        );
      })) {
        return atomState;
      }
    }
    atomState.d.clear();
    var isSync = true;
    var mountDependenciesIfAsync = function mountDependenciesIfAsync() {
      if (mountedMap.has(atom)) {
        mountDependencies(atom);
        recomputeInvalidatedAtoms();
        flushCallbacks();
      }
    };
    var getter = function getter(a) {
      if (isSelfAtom(atom, a)) {
        var _aState2 = ensureAtomState(a);
        if (!isAtomStateInitialized(_aState2)) {
          if (hasInitialValue(a)) {
            setAtomStateValueOrPromise(a, a.init, ensureAtomState);
          } else {
            throw new Error('no atom init');
          }
        }
        return returnAtomValue(_aState2);
      }
      var aState = readAtomState(a);
      try {
        return returnAtomValue(aState);
      } finally {
        var _mountedMap$get3;
        atomState.d.set(a, aState.n);
        if (isPendingPromise(atomState.v)) {
          addPendingPromiseToDependency(atom, atomState.v, aState);
        }
        (_mountedMap$get3 = mountedMap.get(a)) == null || _mountedMap$get3.t.add(atom);
        if (!isSync) {
          mountDependenciesIfAsync();
        }
      }
    };
    var controller;
    var setSelf;
    var options = {
      get signal() {
        if (!controller) {
          controller = new AbortController();
        }
        return controller.signal;
      },
      get setSelf() {
        if (process.env.NODE_ENV !== 'production' && !isActuallyWritableAtom(atom)) {
          console.warn('setSelf function cannot be used with read-only atom');
        }
        if (!setSelf && isActuallyWritableAtom(atom)) {
          setSelf = function setSelf() {
            if (process.env.NODE_ENV !== 'production' && isSync) {
              console.warn('setSelf function cannot be called in sync');
            }
            if (!isSync) {
              try {
                for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                  args[_key3] = arguments[_key3];
                }
                return writeAtomState.apply(void 0, [atom].concat(args));
              } finally {
                recomputeInvalidatedAtoms();
                flushCallbacks();
              }
            }
          };
        }
        return setSelf;
      }
    };
    var prevEpochNumber = atomState.n;
    try {
      var valueOrPromise = atomRead(atom, getter, options);
      setAtomStateValueOrPromise(atom, valueOrPromise, ensureAtomState);
      if (isPromiseLike(valueOrPromise)) {
        registerAbortHandler(valueOrPromise, function () {
          var _controller;
          return (_controller = controller) == null ? void 0 : _controller.abort();
        });
        valueOrPromise.then(mountDependenciesIfAsync, mountDependenciesIfAsync);
      }
      return atomState;
    } catch (error) {
      delete atomState.v;
      atomState.e = error;
      ++atomState.n;
      return atomState;
    } finally {
      isSync = false;
      if (prevEpochNumber !== atomState.n && invalidatedAtoms.get(atom) === prevEpochNumber) {
        invalidatedAtoms.set(atom, atomState.n);
        changedAtoms.add(atom);
        storeHooks.c == null || storeHooks.c(atom);
      }
    }
  };
  var invalidateDependents = (arguments.length <= 15 ? undefined : arguments[15]) || function (atom) {
    var stack = [atom];
    while (stack.length) {
      var a = stack.pop();
      var aState = ensureAtomState(a);
      for (var _iterator6 = _createForOfIteratorHelperLoose(getMountedOrPendingDependents(a, aState, mountedMap)), _step6; !(_step6 = _iterator6()).done;) {
        var d = _step6.value;
        var dState = ensureAtomState(d);
        invalidatedAtoms.set(d, dState.n);
        stack.push(d);
      }
    }
  };
  var writeAtomState = (arguments.length <= 16 ? undefined : arguments[16]) || function (atom) {
    var isSync = true;
    var getter = function getter(a) {
      return returnAtomValue(readAtomState(a));
    };
    var setter = function setter(a) {
      var aState = ensureAtomState(a);
      try {
        for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
          args[_key5 - 1] = arguments[_key5];
        }
        if (isSelfAtom(atom, a)) {
          if (!hasInitialValue(a)) {
            throw new Error('atom not writable');
          }
          var prevEpochNumber = aState.n;
          var v = args[0];
          setAtomStateValueOrPromise(a, v, ensureAtomState);
          mountDependencies(a);
          if (prevEpochNumber !== aState.n) {
            changedAtoms.add(a);
            storeHooks.c == null || storeHooks.c(a);
            invalidateDependents(a);
          }
          return undefined;
        } else {
          return writeAtomState.apply(void 0, [a].concat(args));
        }
      } finally {
        if (!isSync) {
          recomputeInvalidatedAtoms();
          flushCallbacks();
        }
      }
    };
    try {
      for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        args[_key4 - 1] = arguments[_key4];
      }
      return atomWrite.apply(void 0, [atom, getter, setter].concat(args));
    } finally {
      isSync = false;
    }
  };
  var mountDependencies = (arguments.length <= 17 ? undefined : arguments[17]) || function (atom) {
    var atomState = ensureAtomState(atom);
    var mounted = mountedMap.get(atom);
    if (mounted && !isPendingPromise(atomState.v)) {
      for (var _iterator7 = _createForOfIteratorHelperLoose(atomState.d), _step7; !(_step7 = _iterator7()).done;) {
        var _step7$value = _step7.value,
          a = _step7$value[0],
          _n = _step7$value[1];
        if (!mounted.d.has(a)) {
          var aState = ensureAtomState(a);
          var aMounted = mountAtom(a);
          aMounted.t.add(atom);
          mounted.d.add(a);
          if (_n !== aState.n) {
            changedAtoms.add(a);
            storeHooks.c == null || storeHooks.c(a);
            invalidateDependents(a);
          }
        }
      }
      for (var _iterator8 = _createForOfIteratorHelperLoose(mounted.d || []), _step8; !(_step8 = _iterator8()).done;) {
        var _a2 = _step8.value;
        if (!atomState.d.has(_a2)) {
          mounted.d.delete(_a2);
          var _aMounted = unmountAtom(_a2);
          _aMounted == null || _aMounted.t.delete(atom);
        }
      }
    }
  };
  var mountAtom = (arguments.length <= 18 ? undefined : arguments[18]) || function (atom) {
    var atomState = ensureAtomState(atom);
    var mounted = mountedMap.get(atom);
    if (!mounted) {
      readAtomState(atom);
      for (var _iterator9 = _createForOfIteratorHelperLoose(atomState.d.keys()), _step9; !(_step9 = _iterator9()).done;) {
        var a = _step9.value;
        var aMounted = mountAtom(a);
        aMounted.t.add(atom);
      }
      mounted = {
        l: new Set(),
        d: new Set(atomState.d.keys()),
        t: new Set()
      };
      mountedMap.set(atom, mounted);
      storeHooks.m == null || storeHooks.m(atom);
      if (isActuallyWritableAtom(atom)) {
        var processOnMount = function processOnMount() {
          var isSync = true;
          var setAtom = function setAtom() {
            try {
              for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
                args[_key6] = arguments[_key6];
              }
              return writeAtomState.apply(void 0, [atom].concat(args));
            } finally {
              if (!isSync) {
                recomputeInvalidatedAtoms();
                flushCallbacks();
              }
            }
          };
          try {
            var onUnmount = atomOnMount(atom, setAtom);
            if (onUnmount) {
              mounted.u = function () {
                isSync = true;
                try {
                  onUnmount();
                } finally {
                  isSync = false;
                }
              };
            }
          } finally {
            isSync = false;
          }
        };
        mountCallbacks.add(processOnMount);
      }
    }
    return mounted;
  };
  var unmountAtom = (arguments.length <= 19 ? undefined : arguments[19]) || function (atom) {
    var atomState = ensureAtomState(atom);
    var mounted = mountedMap.get(atom);
    if (mounted && !mounted.l.size && !Array.from(mounted.t).some(function (a) {
      var _mountedMap$get4;
      return (_mountedMap$get4 = mountedMap.get(a)) == null ? void 0 : _mountedMap$get4.d.has(atom);
    })) {
      if (mounted.u) {
        unmountCallbacks.add(mounted.u);
      }
      mounted = undefined;
      mountedMap.delete(atom);
      storeHooks.u == null || storeHooks.u(atom);
      for (var _iterator0 = _createForOfIteratorHelperLoose(atomState.d.keys()), _step0; !(_step0 = _iterator0()).done;) {
        var a = _step0.value;
        var aMounted = unmountAtom(a);
        aMounted == null || aMounted.t.delete(atom);
      }
      return undefined;
    }
    return mounted;
  };
  var buildingBlocks = [atomStateMap, mountedMap, invalidatedAtoms, changedAtoms, mountCallbacks, unmountCallbacks, storeHooks, atomRead, atomWrite, atomOnInit, atomOnMount, ensureAtomState, flushCallbacks, recomputeInvalidatedAtoms, readAtomState, invalidateDependents, writeAtomState, mountDependencies, mountAtom, unmountAtom];
  var store = {
    get: function get(atom) {
      return returnAtomValue(readAtomState(atom));
    },
    set: function set(atom) {
      try {
        for (var _len7 = arguments.length, args = new Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
          args[_key7 - 1] = arguments[_key7];
        }
        return writeAtomState.apply(void 0, [atom].concat(args));
      } finally {
        recomputeInvalidatedAtoms();
        flushCallbacks();
      }
    },
    sub: function sub(atom, listener) {
      var mounted = mountAtom(atom);
      var listeners = mounted.l;
      listeners.add(listener);
      flushCallbacks();
      return function () {
        listeners.delete(listener);
        unmountAtom(atom);
        flushCallbacks();
      };
    }
  };
  Object.defineProperty(store, BUILDING_BLOCKS, {
    value: buildingBlocks
  });
  return store;
};
var INTERNAL_buildStoreRev1 = buildStore;
var INTERNAL_getBuildingBlocksRev1 = getBuildingBlocks;
var INTERNAL_initializeStoreHooks = initializeStoreHooks;
var INTERNAL_isSelfAtom = isSelfAtom;
var INTERNAL_hasInitialValue = hasInitialValue;
var INTERNAL_isActuallyWritableAtom = isActuallyWritableAtom;
var INTERNAL_isAtomStateInitialized = isAtomStateInitialized;
var INTERNAL_returnAtomValue = returnAtomValue;
var INTERNAL_promiseStateMap = promiseStateMap;
var INTERNAL_isPendingPromise = isPendingPromise;
var INTERNAL_abortPromise = abortPromise;
var INTERNAL_registerAbortHandler = registerAbortHandler;
var INTERNAL_isPromiseLike = isPromiseLike;
var INTERNAL_addPendingPromiseToDependency = addPendingPromiseToDependency;
var INTERNAL_setAtomStateValueOrPromise = setAtomStateValueOrPromise;
var INTERNAL_getMountedOrPendingDependents = getMountedOrPendingDependents;

exports.INTERNAL_abortPromise = INTERNAL_abortPromise;
exports.INTERNAL_addPendingPromiseToDependency = INTERNAL_addPendingPromiseToDependency;
exports.INTERNAL_buildStoreRev1 = INTERNAL_buildStoreRev1;
exports.INTERNAL_getBuildingBlocksRev1 = INTERNAL_getBuildingBlocksRev1;
exports.INTERNAL_getMountedOrPendingDependents = INTERNAL_getMountedOrPendingDependents;
exports.INTERNAL_hasInitialValue = INTERNAL_hasInitialValue;
exports.INTERNAL_initializeStoreHooks = INTERNAL_initializeStoreHooks;
exports.INTERNAL_isActuallyWritableAtom = INTERNAL_isActuallyWritableAtom;
exports.INTERNAL_isAtomStateInitialized = INTERNAL_isAtomStateInitialized;
exports.INTERNAL_isPendingPromise = INTERNAL_isPendingPromise;
exports.INTERNAL_isPromiseLike = INTERNAL_isPromiseLike;
exports.INTERNAL_isSelfAtom = INTERNAL_isSelfAtom;
exports.INTERNAL_promiseStateMap = INTERNAL_promiseStateMap;
exports.INTERNAL_registerAbortHandler = INTERNAL_registerAbortHandler;
exports.INTERNAL_returnAtomValue = INTERNAL_returnAtomValue;
exports.INTERNAL_setAtomStateValueOrPromise = INTERNAL_setAtomStateValueOrPromise;
