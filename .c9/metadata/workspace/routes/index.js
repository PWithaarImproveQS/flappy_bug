{"changed":false,"filter":false,"title":"index.js","tooltip":"/routes/index.js","value":"var Const = require('../sharedConstants').constant;\n\n/*\n * GET home page.\n */\n\nexports.index = function(req, res){\n  res.render('index', { title: 'Express' });\n};\n\nexports.game = function(req, res){\n  res.render('game', { title: 'game.js', wsAddress: Const.SOCKET_ADDR + ':' + Const.SOCKET_PORT });\n};","undoManager":{"mark":-1,"position":-1,"stack":[]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":0,"column":0},"end":{"row":0,"column":0},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1485194611739}