import { Button, Container, Function, If, Literal, Not, Plus, Text, Variable } from "shogi2-types";
import {CSSProperties} from "@mui/material";

const style:CSSProperties={
  width:"calc(50% - 10px)",
  outline:"none",
  border:"1px solid black",
  background:"gray",
  fontSize:"25px",
  borderRadius:"5px",
};


export function config_window(mods:{name:string,load:boolean}[]){
  return new Container(
    "config_window",
    [
      new Container(
        "",
        [
          new Container(
            "",
            mods.map((mod)=>mod_button(mod)),
            {
              height:"200px",
              overflow:"scroll",
              display:"flex",
              flexDirection:"column",
              margin:"20px"
            }
          ),
          new Container(
            "",
            [
              new Button( "", new Text("",new Literal({string:"OK"})), new Function([
                new Variable(
                  [new Literal({string:"requests"}),new Literal({number:0})],
                  new Literal({object:{
                    head:{string:"event"},
                    content:{object:{
                      type:{string:"reservation"},
                      id:{string:crypto.randomUUID()},
                      data:{object:{
                        millis:{number:1}
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
                  new Plus(new Literal({string:"config_close_"}),new Variable([new Literal({string:"player"})]))
                ),
                new Variable(
                  [new Literal({string:"requests"}),new Literal({number:0}),new Literal({string:"sender"})],
                  new Variable([new Literal({string:"player"})])
                ),

                new Variable(
                  [new Literal({string:"requests"}),new Literal({number:1})],
                  new Literal({object:{
                    head:{string:"reset"},
                  }})
                ),
                new Variable(
                  [new Literal({string:"requests"}),new Literal({number:1}),new Literal({string:"content"})],
                  new Variable([new Literal({string:"field"}),new Literal({string:"mods"})])
                )
              ]), {...style,marginRight:"20px"}),
              new Button( "", new Text("",new Literal({string:"cancel"})), new Function([
                new Variable(
                  [new Literal({string:"requests"}),new Literal({number:0})],
                  new Literal({object:{
                    head:{string:"event"},
                    content:{object:{
                      type:{string:"reservation"},
                      id:{string:crypto.randomUUID()},
                      data:{object:{
                        millis:{number:1}
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
                  new Plus(new Literal({string:"config_close_"}),new Variable([new Literal({string:"player"})]))
                ),
                new Variable(
                  [new Literal({string:"requests"}),new Literal({number:0}),new Literal({string:"sender"})],
                  new Variable([new Literal({string:"player"})])
                )
              ]), {...style})
            ],
            {
              display:"flex",
              margin:"20px",
            }
          )
        ],
        {
          background:"white",
          borderRadius:"10px",
          width:"500px",
          position:"absolute",
          left:"50%",
          top:"100px",
          transform:"translateX(-50%)",
        }
      )
    ],
    {
      width:"100vw",
      height:"100vh",
      pointerEvents:"auto",
      background:"#00000077"
    }
  );
}

function mod_button(mod:{name:string,load:boolean}){
  return new Button(
    "mod_button",
    new Text(
      "",
      new Plus(
        new Literal({string:mod.name}),
        new Plus(
          new Literal({string:" mod is "}),
          new If(
            new Variable([new Literal({string:"field"}),new Literal({string:"mods"}),new Literal({string:mod.name})]),
            [new Literal({string:"enable"})],
            [new Literal({string:"disable"})]
          )
        )
      )
    ),
    new Function([
      new Variable(
        [
          new Literal({string:"field"}),
          new Literal({string:"mods"}),
          new Literal({string:mod.name})
        ],
        new Not(
          new Variable(
            [
              new Literal({string:"field"}),
              new Literal({string:"mods"}),
              new Literal({string:mod.name})
            ]
          )
        )
      )
    ]),
    {
      outline:"none",
      border:"1px solid black",
      background:"#fa0",
      fontSize:"25px",
      borderRadius:"5px",
      marginTop:"5px",
      marginBottom:"5px"
    }
  );
}
