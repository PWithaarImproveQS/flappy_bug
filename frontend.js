/**
 * Module dependencies.
 */
var express = require('express'),
	routes 	= require('./routes'),
	http 	= require('http'),
	path 	= require('path'),
	game 	= require('./game_files/game');
	
module.exports = {
    SetupApplicationAndCreateServer: function(port)
    {
    	var app = express();
    
    	// all environments
    	app.set('port', port);
    	app.set('views', path.join(__dirname, 'views'));
    	app.set('view engine', 'jade');
    	
    	app.use(express.favicon());
    	app.use(express.logger('dev'));
    	app.use(express.json());
    	app.use(express.urlencoded());
    	app.use(express.methodOverride());
    	app.use(app.router);
    	app.use(express.static(path.join(__dirname, 'public')));
    	
    	// development only
    	if ('development' == app.get('env')) {
    	  app.use(express.errorHandler());
    	}
    	
    	app.get('/', routes.game);
    	//app.get('/game', routes.game);
    	
    	// Route to get shared const file
    	app.get('/sharedConstants.js', function(req, res) {
    	    res.sendfile('sharedConstants.js', {root: __dirname});
    	});
    	
    	return http.createServer(app).listen(app.get('port'), function(){
    	  console.log('Flappy bug server listening on port ' + app.get('port'));
    	});
    	
    },
    
   
};