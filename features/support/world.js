var {defineSupportCode} = require('cucumber');
var Cucumber = require('cucumber');
var game = require('../../game_files/game');
var PlayersManager = require('../../game_files/playersManager');


var FlappyWorld = function() {
 
  // comment out unterneath to get logging
  (function(){
   // comment this:     
  // console.log = function (message) {};
//  console.info = function (message) {};
   
  })(); // end log
};

FlappyWorld.prototype.startGameServer = function(newport, callback)
{
  this.port = newport == null ? this.port : newport; 
  game.startServerWithDependencyInjection(null, this.port, this.playersManager, callback);
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
FlappyWorld.prototype.port = 8081;
FlappyWorld.prototype.ip = '127.0.0.1';
FlappyWorld.prototype.generalTimeout = 2000;

Cucumber.defineSupportCode(function({setWorldConstructor}) {
  setWorldConstructor(FlappyWorld);
});