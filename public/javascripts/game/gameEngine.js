/*
*   Game Engine
*/
require(['canvasPainter', 'playersManager', '../../sharedConstants'], function (canvasPainter, PlayersManager, Const) {

  var enumState = {
    Login: 0,
    WaitingRoom: 1,
    OnGame: 2,
    Ranking: 3
  };

  var enumPanels = {
    Login: 'gs-login',
    Ranking: 'gs-ranking',
    HighScores: 'gs-highscores',
    Error: 'gs-error'
  };

  var _gameState = enumState.Login,
      _playerManager,
      _pipeList,
      _isCurrentPlayerReady = false,
      _userID = null,
      _lastTime = null,
      _rankingTimer,
      _ranking_time,
      _isTouchDevice = false,
      _socket,
      _infPanlTimer,
      _isNight = false;

   

  function draw (currentTime, ellapsedTime) {
  // If player score is > 15, night !!
    if ((_gameState == enumState.OnGame) && ((_playerManager.getCurrentPlayer().getScore() % 20) == 0))
      _isNight = true;
   if ((_gameState == enumState.OnGame) && ((_playerManager.getCurrentPlayer().getScore() % 40) == 0))
      _isNight = false;

    canvasPainter.draw(currentTime, ellapsedTime, _playerManager, _pipeList, _gameState, _isNight);
  }

  requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;


  function gameLoop() {
    var now = new Date().getTime(),
        ellapsedTime = 0;

    // Call for next anim frame
    if (_gameState == enumState.OnGame)
      requestAnimationFrame(gameLoop);
 
    // Get time difference between the last call and now
    if (_lastTime) {
      ellapsedTime = now - _lastTime;
    }
    _lastTime = now;

    // Call draw with the ellapsed time between the last frame and the current one
    draw(now, ellapsedTime);
  }

  function lobbyLoop() {
    var now = new Date().getTime();

    // Call for next anim frame
    if (_gameState == enumState.WaitingRoom)
      requestAnimationFrame(lobbyLoop);

    // Call draw with the ellapsed time between the last frame and the current one
    draw(now, 0);
  }


  function startClient () {
    if (typeof io == 'undefined') {
      document.getElementById('gs-error-message').innerHTML = 'Cannot retreive socket.io file at the address ' + Const.SOCKET_ADDR + '<br/><br/>Please provide a valid address.';
      showHideMenu(enumPanels.Error, true);
      console.log('Cannot reach socket.io file !');
      return;
    }

    _playerManager = new PlayersManager();

    document.getElementById('gs-loader-text').innerHTML = 'Connecting to the server...';
    
    _socket = io.connect();
    _socket.on('connect', function () {
      
      console.log('Connection established :)');
      document.getElementById('gs-loader-text').innerHTML = 'Connected';
      // Bind disconnect event
      _socket.on('disconnect', function() {
        document.getElementById('gs-error-message').innerHTML = 'Connection with the server lost';
        showHideMenu(enumPanels.Error, true);
        console.log('Connection with the server lost :( ');
      });

      // Try to retreive previous player name if exists
      if (typeof sessionStorage != 'undefined') {
        if ('playerName' in sessionStorage) {
          document.getElementById('player-name').value = sessionStorage.getItem('playerName');
        }
      }
      
      // Draw bg and bind button click
      draw(0, 0);
      showHideMenu(enumPanels.Login, true);
      document.getElementById('player-connection').onclick = setPlayer;
  
    });

    _socket.on('error', function() {
      document.getElementById('gs-error-message').innerHTML = 'Fail to connect the WebSocket to the server.<br/><br/>Please check the WS address.';
      showHideMenu(enumPanels.Error, true);
      console.log('Cannot connect the web_socket ');
    });
    
  }
  
  function setPlayer()
  {
    var nick = document.getElementById('player-name').value;

    // If nick is empty or if it has the default value, 
    if ((nick == '') || (nick == 'Player_1')) {
      infoPanel(true, 'Please choose your <strong>name</strong> !', 2000);
      document.getElementById('player-name').focus();
      return (false);
    }
    // Else store it in sessionstorage if available
    else {
      if (typeof sessionStorage != 'undefined') {
        sessionStorage.setItem('playerName', nick);
      }
    }
    
    
    // Send nickname to the server
    console.log('Send nickname ' + nick);
    _socket.emit('say_hi', nick, function (serverState, uuid) {
      
      if (uuid == null)
      {
        showHideMenu(enumPanels.Login, true);
        infoPanel(true, 'Nick already taken! Please a unique <strong>name</strong> !', 2000);
        document.getElementById('player-name').focus();
      
        return (true);
      }
      _userID = uuid;
      changeGameState(serverState);
      loadGameRoom(serverState);
    
    });

  }

  function loadGameRoom (serverState) {
    // Unbind button event to prevent "space click"
      document.getElementById('player-connection').onclick = function() { return false; };

      // Display a message according to the game state
      if (serverState == enumState.OnGame) {
        infoPanel(true, '<strong>Please wait</strong> for the previous game to finish...');
      }
      else {
        // Display a little help text
        if (_isTouchDevice == false)
          infoPanel(true, 'Press <strong>space</strong> to fly !', 3000);
        else
          infoPanel(true, '<strong>Tap</strong> to fly !', 3000);
      }
      
    // Bind new socket events
    _socket.on('player_list', function (playersList) {
      var nb = playersList.length,
          i;

      // Add this player in the list
      for (i = 0; i <nb; i++) {
        _playerManager.addPlayer(playersList[i], _userID);
        console.log("added player to common list: " + playersList);
      };

      // Redraw
      draw(0, 0);
    });
    _socket.on('player_disconnect', function (player) {
      _playerManager.removePlayer(player);
    });
    _socket.on('new_player', function (player) {
      _playerManager.addPlayer(player);
    });
    _socket.on('player_ready_state', function (playerInfos) {
      _playerManager.getPlayerFromId(playerInfos.id).updateFromServer(playerInfos);
    });
    _socket.on('update_game_state', function (gameState) {
      changeGameState(gameState);
    });
    _socket.on('game_loop_update', function (serverDatasUpdated) {
      _playerManager.updatePlayerListFromServer(serverDatasUpdated.players);
      _pipeList = serverDatasUpdated.pipes;
    });
    _socket.on('ranking', function (score) {
      displayRanking(score);
    });
 
    
  
    // Get input
    if (_isTouchDevice == false) {
      document.addEventListener('keydown', function (event) {
          if (event.keyCode == 32) {
              inputsManager();
          }
      });
      document.addEventListener('keydown', function (event) {
          if (event.keyCode == 37) {// Key left
            _socket.emit('player_left');
          }
          if (event.keyCode == 39) {// Key right
            _socket.emit('player_right');          }
      });
      document.addEventListener('keyup', function (event) {
          if (event.keyCode == 37) {// Key left
            _socket.emit('player_left');
          }
          if (event.keyCode == 39) {// Key right
            _socket.emit('player_right');          }
      });
    }
    else {
      var evt = window.navigator.msPointerEnabled ? 'MSPointerDown' : 'touchstart';
      document.addEventListener(evt, inputsManager);
    }

    // Hide login screen
    showHideMenu(enumPanels.Login, false);
    return (false);
  }

  function displayRanking (score) {
    var nodeMedal = document.querySelector('.gs-ranking-medal'),
        nodeHS = document.getElementById('gs-highscores-scores'),
        i, nbHs;

    console.log(score);

    // Remove previous medals just in case
    nodeMedal.classList.remove('third');
    nodeMedal.classList.remove('second');
    nodeMedal.classList.remove('winner');

    // Display scores
    document.getElementById('gs-ranking-score').innerHTML = score.score;
    document.getElementById('gs-ranking-best').innerHTML = score.bestScore;
    document.getElementById('gs-ranking-pos').innerHTML = score.rank + ' / ' + score.nbPlayers;

    // Set medal !
    if (score.rank == 1)
      nodeMedal.classList.add('winner');
    else if (score.rank == 2)
      nodeMedal.classList.add('second');
    else if (score.rank == 3)
      nodeMedal.classList.add('third');

    // Display hish scores
    nodeHS.innerHTML = '';
    
 
    nbHs = score.highscores.length <= 10 ? score.highscores.length : 10 ;
    
    for (i = 0; i < nbHs; i++) {
      nodeHS.innerHTML += '<li><span>#' + (i + 1) + '</span> ' + score.highscores[i].player + ' <strong>' + score.highscores[i].score + '</strong></li>';
    };

    // Show ranking
    showHideMenu(enumPanels.Ranking, true);

    // Display hish scores in a middle of the waiting time
    window.setTimeout(function () {
       showHideMenu(enumPanels.Ranking, false);
       showHideMenu(enumPanels.HighScores, true);
    },
    Const.TIME_BETWEEN_GAMES / 2);

   // reset graphics in case to prepare the next game
      canvasPainter.resetForNewGame();
  
  }

  function changeGameState (gameState) {
    var strLog = 'Server just change state to ';

    _gameState = gameState;

    switch (_gameState) {
      case enumState.WaitingRoom:
        strLog += 'waiting in lobby';
        _isCurrentPlayerReady = false;
        lobbyLoop();
        break;

      case enumState.OnGame:
        strLog += 'on game !';
        gameLoop();
        break;

      case enumState.Ranking:
       
        strLog += 'display ranking';
        // Start timer for next game
        _ranking_time = Const.TIME_BETWEEN_GAMES / 1000;
        
        // Display the remaining time on the top bar
        infoPanel(true, 'Next game in <strong>' + _ranking_time + 's</strong>...');
        _rankingTimer = window.setInterval(function() {
            // Set seconds left
            infoPanel(true, 'Next game in <strong>' + (--_ranking_time) + 's</strong>...');
            
            // Stop timer if time is running up
            if (_ranking_time <= 0) {
              // Reset timer and remove top bar
              window.clearInterval(_rankingTimer);
              infoPanel(false);
              
              // Reset pipe list and hide ranking panel
              _pipeList = null;
              showHideMenu(enumPanels.Ranking, false);
            }
          },
          1000
        );
        break;
      
      default:
        console.log('Unknew game state [' + _gameState + ']');
        strLog += 'undefined state';
        break;
    }

    console.log(strLog);
  }

  function inputsManager () {
    switch (_gameState) {
      case enumState.WaitingRoom:
        _isCurrentPlayerReady = !_isCurrentPlayerReady;
        _socket.emit('change_ready_state', _isCurrentPlayerReady);
        _playerManager.getCurrentPlayer().updateReadyState(_isCurrentPlayerReady);
        break;
      case enumState.OnGame:
        _socket.emit('player_jump');
        break;
      default:
        break;
    }
  }

  function showHideMenu (panelName, isShow) {
    var panel = document.getElementById(panelName),
        currentOverlayPanel = document.querySelector('.overlay');

    if (isShow) {
      if (currentOverlayPanel)
        currentOverlayPanel.classList.remove('overlay');
      panel.classList.add('overlay');
    }
    else {
      if (currentOverlayPanel)
        currentOverlayPanel.classList.remove('overlay');
    }
  }
  
  function infoPanel (isShow, htmlText, timeout) {
    var topBar   = document.getElementById('gs-info-panel');

    // Reset timer if there is one pending
    if (_infPanlTimer != null) {
      window.clearTimeout(_infPanlTimer);
      _infPanlTimer = null;
    }

    // Hide the bar
    if (isShow == false) {
      topBar.classList.remove('showTopBar');
    }
    else {
      // If a set is setted, print it
      if (htmlText)
        topBar.innerHTML = htmlText;
      // If a timeout is specified, close the bar after this time !
      if (timeout)
        _infPanlTimer = setTimeout(function() {
          infoPanel(false);
        }, timeout);

      // Don't forget to display the bar :)
      topBar.classList.add('showTopBar');
    }
  }

  // Detect touch event. If available, we will use touch events instead of space key
  if (window.navigator.msPointerEnabled)
    _isTouchDevice = true;
  else if ('ontouchstart' in window)
    _isTouchDevice = true;
  else
    _isTouchDevice = false;
  
  // Load ressources and Start the client !
  console.log('Client started, load ressources...');
  canvasPainter.loadRessources(function () {
    console.log('Ressources loaded, connect to server...');
    startClient();
  });

});