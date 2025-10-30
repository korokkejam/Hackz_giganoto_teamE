import {Game, ModConfig} from "shogi2-types";
import Cheat from "./index";

interface Config{
}

export default class CheatConfig extends ModConfig<Config>{
  type="cheat";
  load=true;
  config:Config;
  hierarchy:number;
  constructor(game:Game,mod:Cheat){
    super(game,mod);
    this.config={};
    this.hierarchy=0;
  }
}
