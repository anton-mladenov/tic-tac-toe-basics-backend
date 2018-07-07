"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const entity_1 = require("./entity");
const class_validator_1 = require("class-validator");
const lib_1 = require("./lib");
const validator = new class_validator_1.Validator();
let GameplayController = class GameplayController {
    async allGames() {
        const games = await entity_1.default.find();
        return { games };
    }
    createGame(name) {
        const newGame = new entity_1.default();
        newGame.name = name;
        newGame.color = lib_1.randomColor();
        newGame.board = lib_1.defaultBoard;
        return newGame.save();
    }
    async updateGame(id, name, color, board) {
        const game = await entity_1.default.findOne(id);
        if (!game)
            throw new routing_controllers_1.NotFoundError("There's no game with ID, man! #CYBYWY");
        if (!name && !color && !board)
            throw new routing_controllers_1.NotFoundError("Nothing to update here, bro!");
        const oldGameBoard = game.board;
        const newGameBoard = board;
        if (name) {
            game.name = name;
        }
        if (newGameBoard) {
            if (lib_1.moves(oldGameBoard, newGameBoard) === 1) {
                game.board = newGameBoard;
            }
            else {
                throw new routing_controllers_1.ForbiddenError("Can't make more than one move per turn, yo!");
            }
        }
        if (color) {
            if (validator.isIn(color, lib_1.colors)) {
                game.color = color;
            }
            else {
                throw new routing_controllers_1.ForbiddenError("Wrong color, bruh! What's available is red, blue, green, yellow and magenta");
            }
        }
        return game.save();
    }
};
__decorate([
    routing_controllers_1.Get("/games"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GameplayController.prototype, "allGames", null);
__decorate([
    routing_controllers_1.Post("/games"),
    routing_controllers_1.HttpCode(201),
    __param(0, routing_controllers_1.BodyParam("name")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GameplayController.prototype, "createGame", null);
__decorate([
    routing_controllers_1.Patch("/games/:id"),
    routing_controllers_1.HttpCode(200),
    __param(0, routing_controllers_1.Param("id")),
    __param(1, routing_controllers_1.BodyParam("name")),
    __param(2, routing_controllers_1.BodyParam("color")),
    __param(3, routing_controllers_1.BodyParam("board")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, String]),
    __metadata("design:returntype", Promise)
], GameplayController.prototype, "updateGame", null);
GameplayController = __decorate([
    routing_controllers_1.JsonController()
], GameplayController);
exports.default = GameplayController;
//# sourceMappingURL=controller.js.map