import { CSSProperties } from "@mui/material";
import { Button, Function, Literal, Minus, Plus, Text, Value, Variable } from "shogi2-types";

const warpdata:Value={object:{
  "z":{number:0}
}};

const warp:Value={object:{
  "type":{string:"warp"},
  "id":{string:crypto.randomUUID()},
  "data":warpdata
}};

const request:Literal=new Literal({object:{
  "head":{string:"event"},
  "content":warp,
  "sender":{string:""}
}});

const rise:Function=new Function([
  new Variable([
    new Literal({string:"requests"}),
    new Literal({number:0})
  ],request),
  new Variable([
    new Literal({string:"requests"}),
    new Literal({number:0}),
    new Literal({string:"content"}),
    new Literal({string:"data"}),
    new Literal({string:"z"})
  ],new Plus(new Variable([new Literal({string:"z"})]),new Literal({number:1}))),
  new Variable([
    new Literal({string:"requests"}),
    new Literal({number:0}),
    new Literal({string:"sender"}),
  ],new Variable([new Literal({string:"player"})]))
]);

const down:Function=new Function([
  new Variable([
    new Literal({string:"requests"}),
    new Literal({number:0})
  ],request),
  new Variable([
    new Literal({string:"requests"}),
    new Literal({number:0}),
    new Literal({string:"content"}),
    new Literal({string:"data"}),
    new Literal({string:"z"})
  ],new Minus(new Variable([new Literal({string:"z"})]),new Literal({number:1}))),
  new Variable([
    new Literal({string:"requests"}),
    new Literal({number:0}),
    new Literal({string:"sender"}),
  ],new Variable([new Literal({string:"player"})]))
]);

const style:CSSProperties={
  background:"#0000",
  color:"#1976d2",
  outline:"none",
  border:"none"
};

export const rise_button:Button=new Button(
  "d4c_rise_button",
  new Text("",new Literal({string:"↑"})),
  rise,
  style
);

export const down_button:Button=new Button(
  "d4c_down_button",
  new Text("",new Literal({string:"↓"})),
  down,
  style
);

export const show_z:Text=new Text(
  "d4c_z_text",
  new Variable([
    new Literal({string:"z"})
  ])
);
