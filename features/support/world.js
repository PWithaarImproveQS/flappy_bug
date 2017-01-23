var {defineSupportCode} = require('cucumber');
var game = require('../../game_files/game');
var Const = require('../../sharedConstants').constant;

var FlappyWorld = function(parameters) {

  FlappyWorld.prototype.parameters = parameters;
  
  (function(){
  
  
  if (!Const.CUCUMBER_LOGGING)
  {
   console.log = function (message) {};
   console.info = function (message) {};
  }
  })(); // end log
};

FlappyWorld.prototype.startGameServer = function(frontend, newport, callback)
{
  this.port = newport == null ? this.port : newport; 
  game.startServerWithDependencyInjection(frontend, this.port, this.playersManager, callback);
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

defineSupportCode(function({setWorldConstructor}) {
  setWorldConstructor(FlappyWorld);
});