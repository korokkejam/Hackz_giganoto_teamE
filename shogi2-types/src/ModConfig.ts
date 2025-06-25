import {Game} from "./types";

export abstract class ModConfig<T=undefined>{
  abstract config:T;

  protected game:Game;

  constructor(game:Game){
    this.game=game;
  }
}
