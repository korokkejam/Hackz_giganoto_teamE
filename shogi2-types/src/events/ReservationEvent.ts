import { Event } from "../Event";

export interface ReservationEventType{
  millis:number;
  id:string
};

export class ReservationEvent extends Event<ReservationEventType>{
  data:ReservationEventType;
  constructor(id:string,data:ReservationEventType){
    super("reservation",id);
    this.data=data;
  }
}
