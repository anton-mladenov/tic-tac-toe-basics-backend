export const colors = ["red", "blue", "green", "yellow", "magenta"]

// randomizing function for the available colors
export const randomColor = () => {
	const random = Math.floor(Math.random() * colors.length)
	return colors[random]
}

// default board state
export const defaultBoard = [
	['o', 'o', 'o'],
	['o', 'o', 'o'],
	['o', 'o', 'o']
]

// func updating the board with new state
export const moves = (board1, board2) => board1
	.map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
	.reduce((a, b) => a.concat(b))
	.length

