var {defineSupportCode} = require('cucumber');
var Assert = require('assert');
var ClientHelper = require('../support/clienthelper');
 
defineSupportCode(function({Before, Given, When, Then}) {
   var nicks = [];
   
   Before(function(done) {
    nicks = [];
   });
   
   Given('a game with a player called {playernick}', function (playernick, done) {
     
     AddPlayerWithName(playernick, this, done);
   });
   
   When('someone tries to join that game with player name {playernick}', function (playernick, done) {
      AddPlayerWithName(playernick, this, done);
   });  
       
   function AddPlayerWithName(playernick, world, done) {
    ClientHelper.ConnectClientToServer(world, playernick, function (world, client) 
    {
      if (client != null)
      {
        // Only set in the list when name is accepted
         nicks.push({'playernick':playernick, 'client':client});
      }
      done();
    });
   }
   
   Then('the player name is accepted', function (done) {
     for (var i = 0; i < nicks.length; i++)
     {
       var player =  this.playersManager.getPlayerFromNick(nicks[i].playernick);
       Assert(player != null);
     }(i);
     done();
   });
   
   Then('the player name is not accepted', function (done) {
     var playerList = this.playersManager.getPlayerList();
     var playerWithNickCounter = 0;
     for (var i = 0; i < playerList.length; i++)
     {
       if (playerList[i].nick != '') playerWithNickCounter++;
     }
     Assert.deepEqual(playerWithNickCounter, nicks.length);
     done();
   });
});