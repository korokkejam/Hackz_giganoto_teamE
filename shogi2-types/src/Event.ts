export abstract class Event<T>{
  type:string;
  abstract data:T;
  constructor(type:string){
    this.type=type;
  }
}
