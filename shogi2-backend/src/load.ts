async function loadMods(d:string[]){
  let mods=[];
  for (const dir of d){
    const mod=await import(`./mods/${dir}/index`);
    mods.push(mod.setup());
  }
  return mods;
}

let mods:string[]=[];

const setMods=(p:string[])=>{
  mods=p;
};

export {mods,setMods,loadMods};
