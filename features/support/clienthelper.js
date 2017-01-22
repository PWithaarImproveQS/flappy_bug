var ioclient = require('socket.io-client');
var clients = require('./clients');
module.exports = {
    ConnectClientToServer: function(world, playernick, done)
    {
      if (playernick == null) playernick = this.GetRandomNick();
      var client = new ioclient.connect(world.getServer(), {
            'reconnection delay' : 0
            , 'reopen delay' : 0
            , 'force new connection' : true
        }); 
      
      var timeoutID = setTimeout(function(){
            done(new Error("Not connected"));
      }, 2000);
    
      client.once('connect', function() {
        client.emit('say_hi', playernick, function (serverState, uuid) { });
      });  
      client.once('player_list', function() {
        clients.push(client);
        clearTimeout(timeoutID);
        done(world);  
      });
    },
    GetRandomNick: function()
    {
      return 't-' + Math.random().toString(36).substr(2, 6);
    }
};
     