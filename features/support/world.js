var {defineSupportCode} = require('cucumber');
var Cucumber = require('cucumber');
var game = require('../../game_files/game');
var PlayersManager = require('../../game_files/playersManager');


var FlappyWorld = function() {
 
  
  (function(){
  // comment console.log/info unterneath to enable logging
   console.log = function (message) {};
   console.info = function (message) {};
   
  })(); // end log
};

FlappyWorld.prototype.startGameServer = function(newport, callback)
{
  this.port = newport == null ? this.port : newport; 
  game.startServerWithDependencyInjection(null, this.port, this.playersManager, callback);
};

FlappyWorld.prototype.startGameServerWithFrontend = function(frontend,  newport, callback)
{
  this.port = newport == null ? this.port : newport; 
  game.startServer(frontend, this.port);
};

FlappyWorld.prototype.stopServer = function(callback)
{
    game.stopServer(callback);
};
FlappyWorld.prototype.getServer = function()
{
  return "http://" + this.ip + ":" + this.port;
};

FlappyWorld.prototype.playersManager = null;
FlappyWorld.prototype.port = 8080;
FlappyWorld.prototype.ip = '127.0.0.1';
FlappyWorld.prototype.generalTimeout = 2000;

Cucumber.defineSupportCode(function({setWorldConstructor}) {
  setWorldConstructor(FlappyWorld);
});