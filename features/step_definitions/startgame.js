var {defineSupportCode} = require('cucumber');
var clients = require('../support/clients');
var ClientHelper = require('../support/clienthelper');

defineSupportCode(function({Given, When, Then}) {
    var async = require('async');


       Given(/^a game with (\d+) players$/, {timeout: 60 * 1000}, function (amount, done) {
           var server = this.getServer();
            var world = this;
            for (var i = 0; i < amount; i++) {
                (function(cntr) {
                     ClientHelper.ConnectClientToServer(world, null, function() {
                        if (clients.length == amount) done();
                    });
                })(i);
            }
       });
       
       When(/^player (\d+) is ready$/, function (player, done) {
         console.log('cl length' + clients.length);
        clients[player -1].emit('change_ready_state', 1);
        done();
       });
       
       When('all players are ready', function (done) {
          console.log('cl length' + clients.length);
          for (var i = 0; i < clients.length; i++) 
           {
               clients[i].emit('change_ready_state', 1);
           }(i);
           done();
       });

        Then(/^the game starts within (\d+) milliseconds/, {timeout: 60 * 1000} , function (timeout, done) {
             
          
            var timeoutID = setTimeout(function(){
                done(new Error("Game not started in time"));
            }, timeout);
            
             for (var i = 0, len = clients.length; i < len; i++) 
             {
              clients[i].once('update_game_state', function (gameState) {
               if (gameState == 2) {
                   clearTimeout(timeoutID);
                   done();
               }
               }); 
             }
       });
       
       Then('the game starts', function (done) {
         // Write code here that turns the phrase above into concrete actions
          var timeoutID = setTimeout(function(){
                done(new Error("Game not started in time"));
            }, 2000);
            
             for (var i = 0, len = clients.length; i < len; i++) 
             {
              clients[i].once('update_game_state', function (gameState) {
               if (gameState == 2) {
                   clearTimeout(timeoutID);
                   done();
               }
               }); 
             }
       });

        Then(/^the game waits for player (\d+) to become ready$/, function (player, done) {
            var maystart = false;
            clients[0].on('update_game_state', function (gameState) {
               if (gameState == 2) {
                   maystart ? done() : done(new Error("Didn't expect the game to start, but it did!"));
               }
            });
            
            clients[player -1].emit('change_ready_state', 1);
            maystart = true;
            
        });

});