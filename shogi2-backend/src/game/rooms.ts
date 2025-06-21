import {room} from "../types/global";

let rooms:room[]=[];
const setRooms=(r:room[])=>{
  rooms=r;
};

export {rooms,setRooms};
