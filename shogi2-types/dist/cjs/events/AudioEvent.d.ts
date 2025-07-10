import { Event } from "../Event";
export interface AudioEventType {
    id: string;
}
export declare class AudioEvent extends Event<AudioEventType> {
    data: AudioEventType;
    constructor(fileid: string, id: string);
}
