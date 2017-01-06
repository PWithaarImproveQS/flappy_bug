var game = require('../../game_files/game');
function CustomWorld() {
  var port = 8090;
  var ip = '127.0.0.1';
  
   // comment unterneath out to get logging
  (function(){
       
   // console.log = function (message) {};
      
  //  console.info = function (message) {};
  })(); // end log
    
  this.startServer = function(callback)
  {
    //game = require('../../game_files/game');
    game.startServer(null, port, callback);
    
  };
  
  this.stopServer = function(callback)
  {
    game.stopServer(callback);
    //game = null;
  };
    
  this.getServer = function()
  {
    return "http://" + ip + ":" + port;
  };
}

module.exports = function() {
  this.World = CustomWorld;

};