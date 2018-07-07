"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.colors = ["red", "blue", "green", "yellow", "magenta"];
exports.randomColor = () => {
    const random = Math.floor(Math.random() * exports.colors.length);
    console.log(random);
    return exports.colors[random];
};
exports.defaultBoard = [
    ['o', 'o', 'o'],
    ['o', 'o', 'o'],
    ['o', 'o', 'o']
];
exports.moves = (board1, board2) => board1
    .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
    .reduce((a, b) => a.concat(b))
    .length;
//# sourceMappingURL=lib.js.map