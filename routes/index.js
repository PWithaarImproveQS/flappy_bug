var Const = require('../sharedConstants').constant;

/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.game = function(req, res){
  res.render('game', { title: 'game.js', wsAddress: Const.SOCKET_ADDR + ':' + Const.SOCKET_PORT });
};