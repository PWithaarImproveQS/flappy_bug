var Const  = require('../sharedConstants').constant;

function checkBugCollision (pipe, bugInstance) {
  var bug = bugInstance.getPlayerObject();

  // If the bug is inside a pipe on the X axis, check if he touch it
  if (((bug.posX + Const.BIRD_WIDTH) > pipe.posX) && 
    (bug.posX  < (pipe.posX + Const.PIPE_WIDTH))) {

    // Notify the bug he is inside the pipe
    bugInstance.updateScore(pipe.id);

    // Check if the bug touch the upper pipe
    if (bug.posY < pipe.posY)
      return (true);

    // Check if the bug touch the ground pipe
    if ((bug.posY + Const.BIRD_HEIGHT) > (pipe.posY + Const.HEIGHT_BETWEEN_PIPES)) {
      return (true);
    }
  }
  
 // if (bug.posY < 0)
 //   bug.posY = Const.FLOOR_POS_Y - bug.posY;
    if (bug.posY + Const.BIRD_HEIGHT > Const.FLOOR_POS_Y) 
     bug.posY = 0;
 
 // console.log(bug.posY);
   
    //return (true);
  //}

  return (false);
};

exports.checkCollision = function (pipe, gameList) {
  var thereIsCollision = false,
      pipeLength = pipe.length,
      bugLength = gameList.length,
      i,
      j;

  for (i = 0; i < pipeLength; i++) {
    
    for (j = 0; j < gameList.length; j++) {
      
      if (checkBugCollision(pipe[i], gameList[j]) == true) {
        // Change player state to died
        gameList[j].sorryYouAreDie(gameList.length);

        thereIsCollision = true;
      }
    };
  };

  return (thereIsCollision);
};