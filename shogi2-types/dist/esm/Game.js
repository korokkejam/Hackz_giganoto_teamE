import { PlayerData, createBoard } from "./index";
;
export function createGameData(w, h) {
    return {
        board: createBoard(w, h),
        piece_types: [],
        turn: "player1",
        promotion_line: 3,
        player1: new PlayerData("player1"),
        player2: new PlayerData("player2")
    };
}
//# sourceMappingURL=Game.js.map