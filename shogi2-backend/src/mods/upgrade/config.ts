import {Game, ModConfig} from "shogi2-types";
import Upgrade from "./index";

interface Config{
}

export default class UpgradeConfig extends ModConfig<Config>{
  type="upgrade";
  config:Config;
  load=true;
  hierarchy:number;
  constructor(game:Game,mod:Upgrade){
    super(game,mod);
    this.config={};
    this.hierarchy=3;
  }
}
