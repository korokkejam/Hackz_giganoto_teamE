"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shogi2_types_1 = require("shogi2-types");
const set_pieces_1 = __importDefault(require("./set_pieces"));
class Base extends shogi2_types_1.ModBase {
    constructor() {
        super();
        this.questions = [];
    }
    onStart(data, _before, _event, _sender, _updater) {
        const board = (0, shogi2_types_1.createBoard)(9, 9);
        (0, set_pieces_1.default)(board);
        data.board = board;
        const request = new shogi2_types_1.BoardRequest("both", board, "obedience");
        return { r: [request], e: [] };
    }
    onMove(data, _before, event, _sender, _updater) {
        const events = [];
        const p1 = event.piece.position;
        const p2 = event.to;
        const piece = event.piece;
        const square = data.board.squares.find((square) => {
            return square.position.x === event.to.x && square.position.y === event.to.y;
        });
        if (square === null || square === void 0 ? void 0 : square.piece) {
            const piece2 = square.piece;
            const event = new shogi2_types_1.CaptureEvent(piece2);
            events.push(event);
        }
        data.board.squares = data.board.squares.map((square) => {
            const p = square.position;
            if (p.x === p1.x && p.y === p1.y) {
                square.piece = null;
            }
            else if (p.x === p2.x && p.y === p2.y) {
                square.piece = Object.assign(Object.assign({}, piece), { position: p2 });
            }
            return square;
        });
        const request1 = new shogi2_types_1.MoveRequest("both", "obedience", event.piece, event.to);
        data.turn = data.turn === "player1" ? "player2" : "player1";
        const request2 = new shogi2_types_1.TurnRequest("both", "obedience", data.turn);
        request1.then = [request2];
        const requests = [request1];
        if (((event.piece.player === "player1" && event.to.y < data.promotion_line) || (event.piece.player === "player2" && data.board.size.h - event.to.y - 1 < data.promotion_line)) && event.piece.type.after_promotion) {
            const request = new shogi2_types_1.QuestionRequest(event.piece.player, "obedience", "成る？", [
                { display: "はい", key: "yes" },
                { display: "いいえ", key: "no" }
            ]);
            requests.push(request);
            const piece = Object.assign(Object.assign({}, event.piece), { position: event.to });
            this.questions.push({ id: request.id, keys: request.choices.map((choice) => choice.key), piece });
        }
        return { r: requests, e: events };
    }
    onAnswer(data, _before, event, _sender, _updater) {
        const question = this.questions.find((question) => question.id === event.id);
        const requests = [];
        const events = [];
        if (question) {
            if (event.key === "yes") {
                const { x, y } = question.piece.position;
                data.board.squares = data.board.squares.map((square) => {
                    var _a;
                    if (square.position.x === x && square.position.y === y) {
                        if ((_a = square.piece) === null || _a === void 0 ? void 0 : _a.type.after_promotion) {
                            square.piece.type = square.piece.type.after_promotion;
                            const request = new shogi2_types_1.SquareRequest("both", "obedience", square);
                            requests.push(request);
                        }
                    }
                    return square;
                });
            }
        }
        return { r: requests, e: events };
    }
    onDrop(data, _before, event, sender, _updater) {
        data.board.squares = data.board.squares.map((square) => {
            var _a;
            if (square.position.x === event.square.position.x && square.position.y === event.square.position.y) {
                return Object.assign(Object.assign({}, event.square), { image: (_a = event.square.image) !== null && _a !== void 0 ? _a : square.image });
            }
            return square;
        });
        if (sender === "player1") {
            data.player1.captured_pieces = data.player1.captured_pieces.filter((p) => { var _a; return p.id !== ((_a = event.square.piece) === null || _a === void 0 ? void 0 : _a.id); });
        }
        else {
            data.player2.captured_pieces = data.player2.captured_pieces.filter((p) => { var _a; return p.id !== ((_a = event.square.piece) === null || _a === void 0 ? void 0 : _a.id); });
        }
        data.turn = data.turn === "player1" ? "player2" : "player1";
        const request1 = new shogi2_types_1.SquareRequest("both", "obedience", event.square);
        const request2 = new shogi2_types_1.TurnRequest("both", "obedience", sender === "player1" ? "player2" : "player1");
        const request3 = new shogi2_types_1.PlayerRequest("both", "obedience", sender === "player1" ? data.player1 : data.player2);
        request1.then = [request2, request3];
        return { r: [request1], e: [] };
    }
    onCapture(data, _before, event, sender, _updater) {
        if (sender === "player1") {
            data.player1.captured_pieces.push(event.piece);
        }
        else {
            data.player2.captured_pieces.push(event.piece);
        }
        if (event.piece.type.id === "king") {
            return { r: [], e: [new shogi2_types_1.EndEvent(sender)] };
        }
        const request1 = new shogi2_types_1.CaptureRequest("both", "obedience", data.player1.captured_pieces, data.player2.captured_pieces);
        const request2 = new shogi2_types_1.TurnRequest("both", "obedience", sender === "player1" ? "player2" : "player1");
        request1.then = [request2];
        return { r: [request1], e: [] };
    }
    onEnd(_data, _before, _event, sender, updater) {
        updater.filter((r) => r.type !== "question");
        return { r: [new shogi2_types_1.EndRequest("both", "obedience", sender)], e: [] };
    }
}
exports.default = Base;
