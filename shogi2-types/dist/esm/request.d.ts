import { Player } from ".";
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
    requests: Request[];
    constructor(requests: Request[]);
    set(requests: Request[]): void;
    add(request: Request): void;
    delete(id: string): void;
    filter(func: (request: Request) => boolean): void;
    map(func: (request: Request) => Request): void;
}
