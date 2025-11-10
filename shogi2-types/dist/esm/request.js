export class Request {
    id;
    then;
    constructor() {
        this.id = crypto.randomUUID();
        this.then = [];
    }
    json() {
        return JSON.stringify(this);
    }
    ;
}
;
export class RequestUpdater {
    requests;
    constructor(requests) {
        this.requests = requests;
    }
    set(requests) {
        this.requests = requests;
    }
    add(request) {
        this.requests.push(request);
    }
    delete(id) {
        this.filter((request) => request.id !== id);
    }
    filter(func) {
        this.requests = this.requests.filter(func);
    }
    map(func) {
        this.requests = this.requests.map(func);
    }
}
;
//# sourceMappingURL=Request.js.map