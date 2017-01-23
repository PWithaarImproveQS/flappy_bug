/**
 * Module dependencies.
 */
var	Const   = require('./sharedConstants').constant,
	frontend     = require('./frontend.js'),
	game 	= require('./game_files/game');


// game.startServer(frontend.SetupApplicationAndCreateServer(9001));
// game.startServer(frontend.SetupApplicationAndCreateServer(9002));
// game.startServer(frontend.SetupApplicationAndCreateServer(9003));
// game.startServer(frontend.SetupApplicationAndCreateServer(9004));
// game.startServer(frontend.SetupApplicationAndCreateServer(9005));
game.startServer(frontend.SetupApplicationAndCreateServer(Const.SERVER_PORT));