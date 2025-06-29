import {ModBase,Game,ModConfig} from "shogi2-types";
// import GameProcess from "./game/board";

type ModBaseClass=new (game:Game)=>ModBase;
type ModConfigClass=new (game:Game,mod:ModBase)=>ModConfig;

// const p=new GameProcess([]);
//
// class Dog extends ModBase {
//   type="dog";
//   constructor(game:Game){
//     super(game);
//   }
// }
// type ModBaseConstructor = new (game:Game) => ModBase;
//
// const a:ModBaseConstructor=Dog;
// const b=new a(p.game);

async function loadMods(d:string[]){
  let mods:ModBaseClass[]=[];
  let configs:ModConfigClass[]=[];
  for (const dir of d){
    const mod=await import(`./mods/${dir}/index`);
    const config=await import(`./mods/${dir}/config`);
    mods.push(mod.default as ModBaseClass);
    configs.push(config.default as ModConfigClass);
  }
  return {mods,configs};
}

let mods:ModBaseClass[]=[];
let configs:ModConfigClass[]=[];

const setMods=(p:{mods:ModBaseClass[],configs:ModConfigClass[]})=>{
  mods=p.mods;
  configs=p.configs;
};

export {mods,configs,setMods,loadMods};
