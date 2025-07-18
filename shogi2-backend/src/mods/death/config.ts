import {Game, ModConfig} from "shogi2-types";
import Death from "./index";

interface Config{
  no_turn:boolean;
}

export default class DeathConfig extends ModConfig<Config>{
  type="death";
  config:Config;
  load=true;
  hierarchy:number;
  constructor(game:Game,mod:Death){
    super(game,mod);
    this.config={
      no_turn:false
    };
    this.hierarchy=1;
    mod.config=this;
  }
}
