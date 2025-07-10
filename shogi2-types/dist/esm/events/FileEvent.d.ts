import { Event } from "../Event";
import { File } from "../types";
export declare class FileEvent extends Event<File> {
    data: File;
    constructor(id: string, file: File);
}
