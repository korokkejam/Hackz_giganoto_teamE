import { GameData, Player } from ".";
export type RequestType = "board" | "turn" | "chat" | "file" | "audio" | "square" | "end" | "player" | "ui" | "question" | "start" | "move" | "capture";
export declare abstract class Request {
    abstract type: RequestType;
    abstract to: Player | "both";
    abstract importance: Importance;
    id: string;
    then: Request[];
    constructor();
    json(): string;
}
export type Importance = "exclude" | "coexistence" | "obedience";
export declare class RequestUpdater {
    requests: RequestExpansion[];
    constructor(requests: RequestExpansion[]);
    set(requests: RequestExpansion[]): void;
    add(request: RequestExpansion): void;
    delete(id: string): void;
    filter(func: (request: RequestExpansion) => boolean): void;
    map(func: (request: RequestExpansion) => RequestExpansion): void;
}
export interface RequestExpansion {
    request: Request;
    data: GameData;
}
