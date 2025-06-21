import rooms from "./rooms";

class Board{
  id:string
  boards:board[]
  constructor(id:string,boards:board[]){
    this.id=id;
    this.boards=boards;
  }
}
