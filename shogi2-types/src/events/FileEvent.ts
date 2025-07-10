import {Event} from "../Event";
import {File} from "../types";

export class FileEvent extends Event<File>{
  data:File;
  constructor(id:string,file:File){
    super("file",id);
    this.data=file;
  }
}
