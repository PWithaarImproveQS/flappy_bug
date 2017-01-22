var {defineSupportCode} = require('cucumber');
var Const = require('../../sharedConstants').constant;
var clients = require('../support/clients');

defineSupportCode(function({Before, After}) {
   var PlayersManager = require('../../game_files/playersManager');
    Before({tags: "@normalserver"}, function(done) {
        this.startGameServer(8090, done);
    });
  
    After({tags: "@normalserver and @webdriver"}, function(done) {
        for (var i = 0, len = clients.length; i < len; i++) {
          clients[i].emit('disconnect');
          clients[i].close();
         
        }
        clients.splice(0,  clients.length);
        this.stopServer(done);
    });   
    
    Before({tags: "@webdriver"}, function(done) {
     // this.startGameServer(Const.SERVER_TEST_PORT, done);
    });
    
    Before({tags: "@injectionserver"}, function(done) {
      this.playersManager = new PlayersManager();
      this.startGameServer(8090, done);
    });
   
    After({tags: "@injectionserver"}, function(done) {
     
      for (var i = 0; i < clients.length; i++) {
        //clients[i].emit('disconnect');
        //clients[i].close();
      }
      clients.splice(0,  clients.length);
      clients.length = 0;
      this.playersManager.removeAllPlayers();
      this.playersManager = null;
      this.stopServer(done);
    });    
  
    Before({tags: "@d_injectionserver"}, function(done) {
        this.playersManager = new PlayersManager();
        this.port = 8080;
     });
  
    After({tags: "@d_injectionserver"}, function(done) {
         console.log("Break me on Debug!");
    });
});