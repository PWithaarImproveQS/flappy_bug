define(['../../sharedConstants'], function (Const) {

  return (
    [
      { 
        daySrc: 'images/bt_text.png',
        nightSrc: 'images/bt_text_night.png',
        width: 6600,
        height: 768,
        posY: 0,
        speed: Const.LEVEL_SPEED / 2
      },
      {
       // daySrc: 'images/clouds.png',
       // nightSrc: 'images/clouds.png',
        width: 300,
        height: 256,
        posY: 416,
        speed: Const.LEVEL_SPEED / 3
      },
      {
        daySrc: 'images/city.png',
        nightSrc: 'images/city.png',
        width: 1280,
        height: 720,
        posY: 0,
        speed: Const.LEVEL_SPEED / 4
      },
      {
        daySrc: 'images/trees.png',
        nightSrc: 'images/trees.png',
        width: 1193,
        height: 672,
        posY: 0,
        speed: Const.LEVEL_SPEED
      }
    ]);
});