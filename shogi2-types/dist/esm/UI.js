export class UI {
    type;
    style;
    id;
    constructor(id, type, style) {
        this.id = id;
        this.type = type;
        this.style = style;
    }
}
export class Text extends UI {
    content;
    constructor(id, content, style) {
        super(id, "text", style);
        this.content = content;
    }
}
export class Button extends UI {
    content;
    onClick;
    constructor(id, content, onClick, style) {
        super(id, "button", style);
        this.content = content;
        this.onClick = onClick;
    }
}
export class Image extends UI {
    src;
    constructor(id, src, style) {
        super(id, "image", style);
        this.src = src;
    }
}
export class Container extends UI {
    children;
    constructor(id, children, style) {
        super(id, "container", style);
        this.children = children;
    }
}
//# sourceMappingURL=UI.js.map