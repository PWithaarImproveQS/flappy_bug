var {defineSupportCode} = require('cucumber');
var Const = require('../../sharedConstants').constant;
var Frontend     = require('../../frontend.js');
var clients = require('../support/clients');

defineSupportCode(function({Before, After, setDefaultTimeout}) {
   setDefaultTimeout(60 * 1000);
   
   var PlayersManager = require('../../game_files/playersManager');
    Before({tags: "@normalserver"}, function(done) {
        this.startGameServer(null, 8090, done);
    });
  
    After({tags: "@normalserver"}, function(done) {
        for (var i = 0, len = clients.length; i < len; i++) {
          clients[i].emit('disconnect');
          clients[i].close();
         
        }
        clients.splice(0,  clients.length);
        this.stopServer(done);
    });   
    
    Before({tags: "@webdriver"}, function(done) {
      this.startGameServer(Frontend.SetupApplicationAndCreateServer(Const.SERVER_TEST_PORT), Const.SERVER_TEST_PORT, done);
    });
    
    After({tags: "@webdriver"}, function(done) {
        for (var i = 0, len = clients.length; i < len; i++) {
          clients[i].emit('disconnect');
          clients[i].close();
         
        }
        clients.splice(0,  clients.length);
        this.stopServer(done);
    });
    
    Before({tags: "@injectionserver"}, function(done) {
      this.playersManager = new PlayersManager();
      this.startGameServer(Frontend.SetupApplicationAndCreateServer(Const.SERVER_TEST_PORT), Const.SERVER_TEST_PORT, done);
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
  
  Before({tags: "@injectionserver_d"}, function(done) {
      //this.playersManager = new PlayersManager();
      this.port = Const.SERVER_PORT;
    });
   
    After({tags: "@injectionserver_d"}, function(done) {
      console.log("Break me on Debug!");
      for (var i = 0; i < clients.length; i++) {
        //clients[i].emit('disconnect');
        //clients[i].close();
      }
      clients.splice(0,  clients.length);
      clients.length = 0;
     
    });   
});