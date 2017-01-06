 
   
  module.exports = function () {
    var async = require('async');
      
    var ioclient = require('socket.io-client');
    var generalTimeout = 2000;
   
    
    
    var clients = [];
  
   
  this.Before(function(done) {
      this.startServer(done);
  });
  
  this.After(function(done) {
      for (var i = 0, len = clients.length; i < len; i++) {
        clients[i].emit('disconnect');
        clients[i].close();
      }
      clients.length = 0
      this.stopServer(done);
  });     
        
   function ConnectClientToServer(server, done)
  {
      var client = new ioclient.connect(server, {
            'reconnection delay' : 0
            , 'reopen delay' : 0
            , 'force new connection' : true
        }); 
      
      var timeoutID = setTimeout(function(){
            done(new Error("Not connected"));
      }, generalTimeout);
  
      client.once('connect', function() {
        client.emit('say_hi', 'test-' + Math.random().toString(36).substr(2, 5), function (serverState, uuid) { });
      });  
      client.once('player_list', function() {
        clients.push(client);
        clearTimeout(timeoutID);
        done();  
      });
  }
  

       this.Given(/^a game with (\d+) players$/, function (amount, done) {
           var server = this.getServer();
           // create amount clients async and call done when done
           async.doWhilst(
                 function (clientready) {
                     
                    ConnectClientToServer(server, clientready);
                 }, 
                 function() { return clients.length < amount;},
                 done);
           
       });
       
       this.When(/^player (\d+) is ready$/, function (player, done) {
        clients[player -1].emit('change_ready_state', 1);
        done();
       });
       
        this.Then(/^the game starts within (\d+) milliseconds/, function (timeout, done) {
            var timeoutID = setTimeout(function(){
                done(new Error("Game not started in time"));
            }, timeout);
            
            
             clients[0].on('update_game_state', function (gameState) {
               if (gameState == 2) {
                   clearTimeout(timeoutID);
                   done();
               }
            });
       });


};