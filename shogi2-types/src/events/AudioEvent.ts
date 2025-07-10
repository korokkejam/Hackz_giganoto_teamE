import {Event} from "../Event";

export interface AudioEventType{
  id:string;
};

export class AudioEvent extends Event<AudioEventType>{
  data:AudioEventType;
  constructor(fileid:string,id:string){
    super("audio",id);
    this.data={id:fileid};
  }
}
