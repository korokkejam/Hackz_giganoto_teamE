;
;
export function createSquare(x, y) {
    return {
        position: { x, y },
        piece: null,
        image: undefined
    };
}
;
export function createBoard(w, h) {
    const squares = [];
    for (let x = 0; x < w; x++) {
        for (let y = 0; y < h; y++) {
            const square = createSquare(x, y);
            squares.push(square);
        }
    }
    return { squares, size: { w, h } };
}
//# sourceMappingURL=Board.js.map