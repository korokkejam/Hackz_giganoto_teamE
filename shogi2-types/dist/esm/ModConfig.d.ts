import { ModBase } from "./ModBase";
import { Game } from "./types";
export declare abstract class ModConfig<T = any> {
    abstract type: string;
    abstract config: T;
    abstract hierarchy: number;
    protected game: Game;
    protected mod: ModBase;
    constructor(game: Game, mod: ModBase);
}
