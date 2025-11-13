import { Request } from "../Request";
export class FileRequest extends Request {
    to;
    type;
    importance;
    name;
    content;
    filetype;
    constructor(to, importance, name, content, filetype) {
        super();
        this.to = to;
        this.importance = importance;
        this.name = name;
        this.content = content;
        this.type = "file";
        this.filetype = filetype;
    }
}
;
//# sourceMappingURL=FileRequest.js.map