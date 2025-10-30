import { createBoard } from "./index";
;
export function createGameData(w, h) {
    return {
        board: createBoard(w, h),
        piece_types: [],
        turn: "player1"
    };
}
//# sourceMappingURL=Game.js.map