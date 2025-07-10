"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = exports.Image = exports.Button = exports.Text = exports.UI = void 0;
class UI {
    constructor(id, type, style) {
        this.id = id;
        this.type = type;
        this.style = style;
    }
}
exports.UI = UI;
class Text extends UI {
    constructor(id, content, style) {
        super(id, "text", style);
        this.content = content;
    }
}
exports.Text = Text;
class Button extends UI {
    constructor(id, content, onClick, style) {
        super(id, "button", style);
        this.content = content;
        this.onClick = onClick;
    }
}
exports.Button = Button;
class Image extends UI {
    constructor(id, src, style) {
        super(id, "image", style);
        this.src = src;
    }
}
exports.Image = Image;
class Container extends UI {
    constructor(id, children, style) {
        super(id, "container", style);
        this.children = children;
    }
}
exports.Container = Container;
//# sourceMappingURL=UI.js.map