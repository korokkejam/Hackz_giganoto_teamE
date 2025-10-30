export abstract class Event{
  abstract type:string;
  json(){
    return JSON.stringify(this);
  };
};
