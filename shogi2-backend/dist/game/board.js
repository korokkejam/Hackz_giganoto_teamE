"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./rooms");
var Data = /** @class */ (function () {
    function Data(boards) {
        this.data = {
            boards: boards,
            turn: "player1",
            player1_current_board: 0,
            player2_current_board: 0,
            player1_point: 0,
            player2_point: 0,
            player1_redbull: 0,
            player2_redbull: 0,
            history: [],
            player1_storage: [],
            player2_storage: []
        };
    }
    Data.prototype.change = function () {
        if (this.data.turn === "player1") {
            this.data.turn = "player2";
        }
        else {
            this.data.turn = "player1";
        }
    };
    Data.prototype.setStorage1 = function (pieces) {
        this.data.player1_storage = pieces;
    };
    Data.prototype.setStorage2 = function (pieces) {
        this.data.player2_storage = pieces;
    };
    Data.prototype.update = function (e, ws) {
        var d = JSON.parse(e.data);
        console.log(d);
        switch (d.head) {
            case "move":
                {
                    var board = d.content;
                    var sender = d.sender;
                    if (sender === "player1") {
                        this.data.boards[this.data.player1_current_board] = board;
                        if (this.data.player1_current_board === this.data.player2_current_board) {
                            var d2 = { head: "move", content: { board: board, next: "player2" } };
                            ws[1].send(JSON.stringify(d2));
                        }
                        var d3 = { head: "change", content: { next: "player2" } };
                        ws[0].send(JSON.stringify(d3));
                    }
                    else {
                        this.data.boards[this.data.player2_current_board] = board;
                        if (this.data.player1_current_board === this.data.player2_current_board) {
                            var d2 = { head: "move", content: { board: board, next: "player1" } };
                            ws[0].send(JSON.stringify(d2));
                        }
                        var d3 = { head: "change", content: { next: "player1" } };
                        ws[1].send(JSON.stringify(d3));
                    }
                }
                break;
            case "promotion":
                {
                    var board = d.content;
                    var sender = d.sender;
                    if (sender === "player1") {
                        this.data.boards[this.data.player1_current_board] = board;
                        if (this.data.player1_current_board === this.data.player2_current_board) {
                            var d2 = { head: "move", content: { board: board, next: "player2" } };
                            ws[1].send(JSON.stringify(d2));
                        }
                        var d3 = { head: "change", content: { next: "player2" } };
                        ws[0].send(JSON.stringify(d3));
                    }
                    else {
                        this.data.boards[this.data.player2_current_board] = board;
                        if (this.data.player1_current_board === this.data.player2_current_board) {
                            var d2 = { head: "move", content: { board: board, next: "player1" } };
                            ws[0].send(JSON.stringify(d2));
                        }
                        var d3 = { head: "change", content: { next: "player1" } };
                        ws[1].send(JSON.stringify(d3));
                    }
                }
                break;
            case "kill":
                {
                    var sender = d.sender;
                    var d1 = { head: "lose", content: "" };
                    var d2 = { head: "win", content: "" };
                    if (sender === "player1") {
                        ws[1].send(JSON.stringify(d1));
                        ws[0].send(JSON.stringify(d2));
                    }
                    else {
                        ws[0].send(JSON.stringify(d1));
                        ws[1].send(JSON.stringify(d2));
                    }
                }
                break;
            case "random":
                {
                    var board = d.content;
                    var sender = d.sender;
                    if (sender === "player1") {
                        this.data.boards[this.data.player1_current_board] = board;
                        if (this.data.player1_current_board === this.data.player2_current_board) {
                            var d2 = { head: "move", content: { board: board, next: "player1" } };
                            ws[1].send(JSON.stringify(d2));
                        }
                        var d3 = { head: "change", content: { next: "player1" } };
                        ws[0].send(JSON.stringify(d3));
                    }
                    else {
                        this.data.boards[this.data.player2_current_board] = board;
                        if (this.data.player1_current_board === this.data.player2_current_board) {
                            var d2 = { head: "move", content: { board: board, next: "player2" } };
                            ws[0].send(JSON.stringify(d2));
                        }
                        var d3 = { head: "change", content: { next: "player2" } };
                        ws[1].send(JSON.stringify(d3));
                    }
                }
                break;
        }
    };
    return Data;
}());
exports.default = Data;
