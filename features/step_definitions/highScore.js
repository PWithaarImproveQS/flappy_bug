 var {defineSupportCode} = require('cucumber');
 var Assert = require('assert');
 var PlayersManager = require('../../game_files/playersManager');
 var ClientHelper = require('../support/clienthelper');
 var clients = require('../support/clients');
 
defineSupportCode(function({Given, When, Then}) {
  
    var _scores; 
    
    Given(/^(.*) has a high score of (\d+)$/, function (playernick, score, done) {
        
         ClientHelper.ConnectClientToServer(this, playernick, function (world) 
        {
          var player = world.playersManager.getPlayerFromNick(playernick);
          SetPlayerScore(player, score, done);
        });
    });
          
    When('the high score overview is shown', function (done) {
     GetHighScores(this, done);
    });          
   
   When('{playernick} finishes a game with score {score:int}', function (playernick, score, done) {
  
     var player = this.playersManager.getPlayerFromNick(playernick);
     
     SetPlayerScore(player, score, done);
     
   });
   
   Then(/^(\d+) will be above (\d+)$/, function (scorehigh, scorelow, done) {
      if (_scores.highscores[0].score < scorehigh) throw new Error("first player is lower with score " + _scores.highscores[0].score);
      done();
    });
    
    Then(/^(.*) will be listed above (.*)$/, function (playernick1, playernick2, done) {
      if (_scores.highscores[0].player != playernick1) throw new Error(playernick1 + " not above " + playernick2);
      done();
     });    
     
    Then('the high score overview will show {playernick} only once with score {score:int}', function (playernick, score, done) {
        GetHighScores(this, function () {
            Assert.deepEqual(_scores.nbPlayers, 1);
            Assert.deepEqual(_scores.highscores.length, 1);
            Assert.deepEqual(_scores.highscores[0].score, score);
            done();
        });
        
    });

     function GetHighScores(world, done)
     {
       clients[0].once('ranking', function (score) {
        _scores = score; 
        done();
      });
      
      world.playersManager.sendPlayerScore();
     }
     
    function SetPlayerScore(player, score, done)
    {
       player.preparePlayer(0);
       while ( player.getScore() < score)
       {
         player.updateScore(player.getScore() + 1);
       };
       done();
    }
});