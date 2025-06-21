import type { Atom, WritableAtom } from './atom';
type AnyValue = unknown;
type AnyError = unknown;
type AnyAtom = Atom<AnyValue>;
type AnyWritableAtom = WritableAtom<AnyValue, unknown[], unknown>;
type OnUnmount = () => void;
type EpochNumber = number;
/**
 * Mutable atom state,
 * tracked for both mounted and unmounted atoms in a store.
 *
 * This should be garbage collectable.
 * We can mutate it during atom read. (except for fields with TODO)
 */
type AtomState<Value = AnyValue> = {
    /**
     * Map of atoms that the atom depends on.
     * The map value is the epoch number of the dependency.
     */
    readonly d: Map<AnyAtom, EpochNumber>;
    /**
     * Set of atoms with pending promise that depend on the atom.
     *
     * This may cause memory leaks, but it's for the capability to continue promises
     * TODO(daishi): revisit how to handle this
     */
    readonly p: Set<AnyAtom>;
    /** The epoch number of the atom. */
    n: EpochNumber;
    /** Atom value */
    v?: Value;
    /** Atom error */
    e?: AnyError;
};
/**
 * State tracked for mounted atoms. An atom is considered "mounted" if it has a
 * subscriber, or is a transitive dependency of another atom that has a
 * subscriber.
 * The mounted state of an atom is freed once it is no longer mounted.
 */
type Mounted = {
    /** Set of listeners to notify when the atom value changes. */
    readonly l: Set<() => void>;
    /** Set of mounted atoms that the atom depends on. */
    readonly d: Set<AnyAtom>;
    /** Set of mounted atoms that depends on the atom. */
    readonly t: Set<AnyAtom>;
    /** Function to run when the atom is unmounted. */
    u?: () => void;
};
type AtomStateMap = {
    get(atom: AnyAtom): AtomState | undefined;
    set(atom: AnyAtom, atomState: AtomState): void;
};
type MountedMap = {
    get(atom: AnyAtom): Mounted | undefined;
    has(atom: AnyAtom): boolean;
    set(atom: AnyAtom, mounted: Mounted): void;
    delete(atom: AnyAtom): void;
};
type InvalidatedAtoms = {
    get(atom: AnyAtom): EpochNumber | undefined;
    has(atom: AnyAtom): boolean;
    set(atom: AnyAtom, n: EpochNumber): void;
    delete(atom: AnyAtom): void;
};
type ChangedAtoms = {
    readonly size: number;
    add(atom: AnyAtom): void;
    has(atom: AnyAtom): boolean;
    clear(): void;
    forEach(callback: (atom: AnyAtom) => void): void;
    [Symbol.iterator](): IterableIterator<AnyAtom>;
};
type Callbacks = {
    readonly size: number;
    add(fn: () => void): void;
    clear(): void;
    forEach(callback: (fn: () => void) => void): void;
};
type AtomRead = <Value>(atom: Atom<Value>, ...params: Parameters<Atom<Value>['read']>) => Value;
type AtomWrite = <Value, Args extends unknown[], Result>(atom: WritableAtom<Value, Args, Result>, ...params: Parameters<WritableAtom<Value, Args, Result>['write']>) => Result;
type AtomOnInit = <Value>(atom: Atom<Value>, store: Store) => void;
type AtomOnMount = <Value, Args extends unknown[], Result>(atom: WritableAtom<Value, Args, Result>, setAtom: (...args: Args) => Result) => OnUnmount | void;
type EnsureAtomState = <Value>(atom: Atom<Value>) => AtomState<Value>;
type FlushCallbacks = () => void;
type RecomputeInvalidatedAtoms = () => void;
type ReadAtomState = <Value>(atom: Atom<Value>) => AtomState<Value>;
type InvalidateDependents = (atom: AnyAtom) => void;
type WriteAtomState = <Value, Args extends unknown[], Result>(atom: WritableAtom<Value, Args, Result>, ...args: Args) => Result;
type MountDependencies = (atom: AnyAtom) => void;
type MountAtom = <Value>(atom: Atom<Value>) => Mounted;
type UnmountAtom = <Value>(atom: Atom<Value>) => Mounted | undefined;
type Store = {
    get: <Value>(atom: Atom<Value>) => Value;
    set: <Value, Args extends unknown[], Result>(atom: WritableAtom<Value, Args, Result>, ...args: Args) => Result;
    sub: (atom: AnyAtom, listener: () => void) => () => void;
};
export type INTERNAL_AtomState<Value = AnyValue> = AtomState<Value>;
export type INTERNAL_Mounted = Mounted;
export type INTERNAL_AtomStateMap = AtomStateMap;
export type INTERNAL_MountedMap = MountedMap;
export type INTERNAL_InvalidatedAtoms = InvalidatedAtoms;
export type INTERNAL_ChangedAtoms = ChangedAtoms;
export type INTERNAL_Callbacks = Callbacks;
export type INTERNAL_AtomRead = AtomRead;
export type INTERNAL_AtomWrite = AtomWrite;
export type INTERNAL_AtomOnInit = AtomOnInit;
export type INTERNAL_AtomOnMount = AtomOnMount;
export type INTERNAL_EnsureAtomState = EnsureAtomState;
export type INTERNAL_FlushCallbacks = FlushCallbacks;
export type INTERNAL_RecomputeInvalidatedAtoms = RecomputeInvalidatedAtoms;
export type INTERNAL_ReadAtomState = ReadAtomState;
export type INTERNAL_InvalidateDependents = InvalidateDependents;
export type INTERNAL_WriteAtomState = WriteAtomState;
export type INTERNAL_MountDependencies = MountDependencies;
export type INTERNAL_MountAtom = MountAtom;
export type INTERNAL_UnmountAtom = UnmountAtom;
export type INTERNAL_Store = Store;
declare const isSelfAtom: (atom: AnyAtom, a: AnyAtom) => boolean;
declare const hasInitialValue: <T extends Atom<AnyValue>>(atom: T) => atom is T & (T extends Atom<infer Value> ? {
    init: Value;
} : never);
declare const isActuallyWritableAtom: (atom: AnyAtom) => atom is AnyWritableAtom;
declare const isAtomStateInitialized: <Value>(atomState: AtomState<Value>) => boolean;
declare const returnAtomValue: <Value>(atomState: AtomState<Value>) => Value;
declare const promiseStateMap: WeakMap<PromiseLike<unknown>, [
    pending: boolean,
    abortHandlers: Set<() => void>
]>;
declare const isPendingPromise: (value: unknown) => value is PromiseLike<unknown>;
declare const abortPromise: <T>(promise: PromiseLike<T>) => void;
declare const registerAbortHandler: <T>(promise: PromiseLike<T>, abortHandler: () => void) => void;
declare const isPromiseLike: (p: unknown) => p is PromiseLike<unknown>;
declare const addPendingPromiseToDependency: (atom: AnyAtom, promise: PromiseLike<AnyValue>, dependencyAtomState: AtomState) => void;
declare const setAtomStateValueOrPromise: (atom: AnyAtom, valueOrPromise: unknown, ensureAtomState: EnsureAtomState) => void;
declare const getMountedOrPendingDependents: (atom: AnyAtom, atomState: AtomState, mountedMap: MountedMap) => Set<AnyAtom>;
type StoreHook = {
    (): void;
    add(callback: () => void): () => void;
};
type StoreHookForAtoms = {
    (atom: AnyAtom): void;
    add(atom: AnyAtom, callback: () => void): () => void;
    add(atom: undefined, callback: (atom: AnyAtom) => void): () => void;
};
type StoreHooks = {
    /**
     * Listener to notify when the atom value is changed.
     * This is an experimental API.
     */
    readonly c?: StoreHookForAtoms;
    /**
     * Listener to notify when the atom is mounted.
     * This is an experimental API.
     */
    readonly m?: StoreHookForAtoms;
    /**
     * Listener to notify when the atom is unmounted.
     * This is an experimental API.
     */
    readonly u?: StoreHookForAtoms;
    /**
     * Listener to notify when callbacks are being flushed.
     * This is an experimental API.
     */
    readonly f?: StoreHook;
};
declare const initializeStoreHooks: (storeHooks: StoreHooks) => Required<StoreHooks>;
type BuildingBlocks = readonly [
    atomStateMap: AtomStateMap,
    mountedMap: MountedMap,
    invalidatedAtoms: InvalidatedAtoms,
    changedAtoms: ChangedAtoms,
    mountCallbacks: Callbacks,
    unmountCallbacks: Callbacks,
    storeHooks: StoreHooks,
    atomRead: AtomRead,
    atomWrite: AtomWrite,
    atomOnInit: AtomOnInit,
    atomOnMount: AtomOnMount,
    ensureAtomState: EnsureAtomState,
    flushCallbacks: FlushCallbacks,
    recomputeInvalidatedAtoms: RecomputeInvalidatedAtoms,
    readAtomState: ReadAtomState,
    invalidateDependents: InvalidateDependents,
    writeAtomState: WriteAtomState,
    mountDependencies: MountDependencies,
    mountAtom: MountAtom,
    unmountAtom: UnmountAtom
];
declare const getBuildingBlocks: (store: unknown) => BuildingBlocks;
declare const buildStore: (atomStateMap?: AtomStateMap, mountedMap?: MountedMap, invalidatedAtoms?: InvalidatedAtoms, changedAtoms?: ChangedAtoms, mountCallbacks?: Callbacks, unmountCallbacks?: Callbacks, storeHooks?: StoreHooks, atomRead?: AtomRead, atomWrite?: AtomWrite, atomOnInit?: AtomOnInit, atomOnMount?: AtomOnMount, ...buildingBlockFunctions: Partial<[ensureAtomState: EnsureAtomState, flushCallbacks: FlushCallbacks, recomputeInvalidatedAtoms: RecomputeInvalidatedAtoms, readAtomState: ReadAtomState, invalidateDependents: InvalidateDependents, writeAtomState: WriteAtomState, mountDependencies: MountDependencies, mountAtom: MountAtom, unmountAtom: UnmountAtom]>) => Store;
export declare const INTERNAL_buildStoreRev1: typeof buildStore;
export declare const INTERNAL_getBuildingBlocksRev1: typeof getBuildingBlocks;
export declare const INTERNAL_initializeStoreHooks: typeof initializeStoreHooks;
export declare const INTERNAL_isSelfAtom: typeof isSelfAtom;
export declare const INTERNAL_hasInitialValue: typeof hasInitialValue;
export declare const INTERNAL_isActuallyWritableAtom: typeof isActuallyWritableAtom;
export declare const INTERNAL_isAtomStateInitialized: typeof isAtomStateInitialized;
export declare const INTERNAL_returnAtomValue: typeof returnAtomValue;
export declare const INTERNAL_promiseStateMap: typeof promiseStateMap;
export declare const INTERNAL_isPendingPromise: typeof isPendingPromise;
export declare const INTERNAL_abortPromise: typeof abortPromise;
export declare const INTERNAL_registerAbortHandler: typeof registerAbortHandler;
export declare const INTERNAL_isPromiseLike: typeof isPromiseLike;
export declare const INTERNAL_addPendingPromiseToDependency: typeof addPendingPromiseToDependency;
export declare const INTERNAL_setAtomStateValueOrPromise: typeof setAtomStateValueOrPromise;
export declare const INTERNAL_getMountedOrPendingDependents: typeof getMountedOrPendingDependents;
export {};
