import { JsonController, Get, Post, HttpCode, BodyParam, Patch, Param, NotFoundError, ForbiddenError } from 'routing-controllers'
import Game from './entity'
import {Validator} from "class-validator";
import {colors, randomColor, defaultBoard, moves} from "./lib"

const validator = new Validator();

@JsonController()
export default class GameplayController {

	@Get("/games")
	async allGames() {
		const games = await Game.find()
		return { games }
	}

	@Post("/games")
	@HttpCode(201)
	createGame(
		@BodyParam("name") name: string
	) {
		const newGame = new Game()
		newGame.name = name
		newGame.color = randomColor()
		newGame.board = defaultBoard
		
		return newGame.save()
	}

	@Patch("/games/:id")
	@HttpCode(200)
	async updateGame(
		@Param("id") id: number,
		@BodyParam("name") name: string,
		@BodyParam("color") color: string,
		@BodyParam("board") board: string
	) {	
		const game = await Game.findOne(id)
		
		if (!game) throw new NotFoundError("There's no game with ID, man! #CYBYWY")
		if (!name && !color && !board) throw new NotFoundError("Nothing to update here, bro!")
		
		const oldGameBoard = game.board
		const newGameBoard = board

		if (name) {
			game.name = name
		}
		
		if (newGameBoard) {
			if ( moves(oldGameBoard, newGameBoard) === 1 ) {
				game.board = newGameBoard
			} else {
				throw new ForbiddenError("Can't make more than one move per turn, yo!")
			}
		}

		if (color) {
			if ( validator.isIn(color, colors) ) { 
				game.color = color 
			} else {
				throw new ForbiddenError("Wrong color, bruh! What's available is red, blue, green, yellow and magenta")
			}
		}

		return game.save()
	}
}
