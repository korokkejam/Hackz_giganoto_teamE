import { ModBase } from "./ModBase";
import {Game} from "./types";

export abstract class ModConfig<T=any>{
  abstract type:string;
  abstract config:T;
  abstract hierarchy:number; //数字が大きいほど優先順位が上になる

  protected game:Game;
  protected mod:ModBase;

  constructor(game:Game,mod:ModBase){
    this.game=game;
    this.mod=mod;
  }
}
