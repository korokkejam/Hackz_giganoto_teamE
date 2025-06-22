import type { Atom } from './atom.mjs';
import type { INTERNAL_AtomState, INTERNAL_Store } from 'jotai/vanilla/internals';
export type INTERNAL_PrdStore = INTERNAL_Store;
export type INTERNAL_DevStoreRev4 = {
    dev4_get_internal_weak_map: () => {
        get: (atom: Atom<unknown>) => INTERNAL_AtomState | undefined;
    };
    dev4_get_mounted_atoms: () => Set<Atom<unknown>>;
    dev4_restore_atoms: (values: Iterable<readonly [Atom<unknown>, unknown]>) => void;
};
type PrdOrDevStore = INTERNAL_PrdStore | (INTERNAL_PrdStore & INTERNAL_DevStoreRev4);
export declare function INTERNAL_overrideCreateStore(fn: (prev: typeof createStore | undefined) => typeof createStore): void;
export declare function createStore(): PrdOrDevStore;
export declare function getDefaultStore(): PrdOrDevStore;
export {};
