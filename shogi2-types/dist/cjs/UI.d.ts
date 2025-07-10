import { CSSProperties } from "@mui/material";
import { Function, Syntax } from "./Syntax";
export declare class UI {
    type: string;
    style?: CSSProperties;
    id: string;
    constructor(id: string, type: string, style?: CSSProperties);
}
export declare class Text extends UI {
    content: Syntax;
    constructor(id: string, content: Syntax, style?: CSSProperties);
}
export declare class Button extends UI {
    content: UI;
    onClick: Function;
    constructor(id: string, content: UI, onClick: Function, style?: CSSProperties);
}
export declare class Image extends UI {
    src: string;
    constructor(id: string, src: string, style?: CSSProperties);
}
export declare class Container extends UI {
    children: UI[];
    constructor(id: string, children: UI[], style: CSSProperties);
}
