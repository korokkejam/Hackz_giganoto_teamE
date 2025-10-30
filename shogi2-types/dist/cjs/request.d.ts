import { Player } from ".";
export type RequestType = "board" | "turn" | "chat" | "file" | "audio" | "square" | "end" | "player" | "ui" | "question" | "start";
export declare abstract class Request {
    abstract type: RequestType;
    abstract to: Player | "both";
    abstract importance: Importance;
    json(): string;
}
export type Importance = "exclude" | "coexistence" | "obedience";
