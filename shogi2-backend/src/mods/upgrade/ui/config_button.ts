import { Button, Equal, Function, If, Literal, Plus, Text, Value, Variable } from "shogi2-types";

export function config_button(mods:{name:string,load:boolean}[]){
  const d:Record<string,Value>={};
  mods.forEach((mod)=>{
    d[mod.name]={boolean:mod.load};
  });
  const func=new Function([
    new If(
      new Equal(
        new Variable([new Literal({string:"field"}),new Literal({string:"mods"})]),
        new Literal({null:null})
      ),
      [
        new Variable([new Literal({string:"field"}),new Literal({string:"mods"})],new Literal({object:d}))
      ]
    ),
    new Variable(
      [new Literal({string:"requests"}),new Literal({number:0})],
      new Literal({object:{
        head:{string:"event"},
        content:{object:{
          type:{string:"reservation"},
          id:{string:crypto.randomUUID()},
          data:{object:{
            millis:{number:1},
          }}
        }}
      }})
    ),
    new Variable(
      [
        new Literal({string:"requests"}),
        new Literal({number:0}),
        new Literal({string:"content"}),
        new Literal({string:"data"}),
        new Literal({string:"id"})
      ],
      new Plus(new Literal({string:"config_open_"}),new Variable([new Literal({string:"player"})]))
    ),
    new Variable(
      [new Literal({string:"requests"}),new Literal({number:0}),new Literal({string:"sender"})],
      new Variable([new Literal({string:"player"})])
    )
  ]);
  return new Button(
    "config_button",
    new Text("",new Literal({string:"mod設定"})),
    func
  );
}
