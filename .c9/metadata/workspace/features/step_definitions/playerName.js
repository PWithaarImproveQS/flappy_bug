{"filter":false,"title":"playerName.js","tooltip":"/features/step_definitions/playerName.js","undoManager":{"mark":0,"position":0,"stack":[[{"start":{"row":0,"column":0},"end":{"row":4,"column":7},"action":"remove","lines":["","  // module.exports = function () {","  //   var async = require('async');","      ","  //   "],"id":2,"ignore":true},{"start":{"row":0,"column":0},"end":{"row":2,"column":0},"action":"insert","lines":["var {defineSupportCode} = require('cucumber');","var Assert = require('assert');",""]},{"start":{"row":2,"column":4},"end":{"row":2,"column":7},"action":"remove","lines":["ioc"]},{"start":{"row":2,"column":4},"end":{"row":2,"column":5},"action":"insert","lines":["C"]},{"start":{"row":2,"column":10},"end":{"row":2,"column":16},"action":"insert","lines":["Helper"]},{"start":{"row":2,"column":28},"end":{"row":7,"column":24},"action":"remove","lines":["socket.io-client');","  //   var generalTimeout = 2000;","   ","    ","    ","  //   var clients = [];"]},{"start":{"row":2,"column":28},"end":{"row":11,"column":82},"action":"insert","lines":["../support/clienthelper');"," ","defineSupportCode(function({Before, Given, When, Then}) {","   var nicks = [];","   ","   Before(function(done) {","    nicks = [];","   });","   ","   Given('a game with a player called {playernick}', function (playernick, done) {"]},{"start":{"row":12,"column":2},"end":{"row":13,"column":0},"action":"remove","lines":["",""]},{"start":{"row":12,"column":4},"end":{"row":12,"column":6},"action":"remove","lines":["//"]},{"start":{"row":12,"column":5},"end":{"row":13,"column":0},"action":"insert","lines":["",""]},{"start":{"row":13,"column":5},"end":{"row":14,"column":81},"action":"remove","lines":[" this.Given(/^a game with a player called Pieter$/, function (callback) {","  //         // Write code here that turns the phrase above into concrete actions"]},{"start":{"row":13,"column":5},"end":{"row":32,"column":56},"action":"insert","lines":["AddPlayerWithName(playernick, this, done);","   });","   ","   When('someone tries to join that game with player name {playernick}', function (playernick, done) {","      AddPlayerWithName(playernick, this, done);","   });  ","       ","   function AddPlayerWithName(playernick, world, done) {","    ClientHelper.ConnectClientToServer(world, playernick, function (world, client) ","    {","      if (client != null)","      {","        // Only set in the list when name is accepted","         nicks.push({'playernick':playernick, 'client':client});","      }","      done();","    });","   }","   ","   Then('the player name is accepted', function (done) {"]},{"start":{"row":33,"column":2},"end":{"row":33,"column":4},"action":"remove","lines":["//"]},{"start":{"row":33,"column":5},"end":{"row":34,"column":13},"action":"remove","lines":["      callback(null, 'pending');","  //       })"]},{"start":{"row":33,"column":5},"end":{"row":46,"column":60},"action":"insert","lines":["for (var i = 0; i < nicks.length; i++)","     {","       var player =  this.playersManager.getPlayerFromNick(nicks[i].playernick);","       Assert(player != null);","     }(i);","     done();","   });","   ","   Then('the player name is not accepted', function (done) {","     var playerList = this.playersManager.getPlayerList();","     var playerWithNickCounter = 0;","     for (var i = 0; i < playerList.length; i++)","     {","       if (playerList[i].nick != '') playerWithNickCounter++"]},{"start":{"row":47,"column":3},"end":{"row":48,"column":0},"action":"insert","lines":["  }",""]},{"start":{"row":48,"column":5},"end":{"row":49,"column":6},"action":"remove","lines":["","  // }"]},{"start":{"row":48,"column":5},"end":{"row":51,"column":2},"action":"insert","lines":["Assert.deepEqual(playerWithNickCounter, nicks.length);","     done();","   });","})"]}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":0,"column":0},"end":{"row":0,"column":0},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":2,"state":"start","mode":"ace/mode/javascript"}},"timestamp":1485076813387,"hash":"994429715dc5ca737ed00c0f5c665e43e3ea5258"}