import {Mod, ModBaseClass} from "shogi2-types";

export async function loadMods(d:string[]):Promise<Mod[]>{
  let mods:Mod[]=[];
  for (const dir of d){
    const mod_class=await import(`./mods/${dir}/src/index`);
    const info=await import(`./mods/${dir}/info`);
    const mod:Mod={
      class:mod_class.default as ModBaseClass,
      identifier:{name:dir,id:info.id as string,dir}
    };
    mods.push(mod);
  }
  return mods;
}
