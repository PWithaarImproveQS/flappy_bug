/**
 * Module dependencies.
 */
var	Const   = require('./sharedConstants').constant,
	frontend     = require('./frontend.js'),
	game 	= require('./game_files/game');

game.startServer(frontend.SetupApplicationAndCreateServer(Const.SERVER_PORT));