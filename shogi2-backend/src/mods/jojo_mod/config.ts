import {Game, ModConfig} from "shogi2-types";
import JoJo from "./index";

interface Config{
}

export default class JoJoConfig extends ModConfig<Config>{
  type="jojo";
  config:Config;
  hierarchy:number;
  constructor(game:Game,mod:JoJo){
    super(game,mod);
    this.config={};
    this.hierarchy=0;
  }
}
