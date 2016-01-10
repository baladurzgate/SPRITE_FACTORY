var game = new Phaser.Game(960,640,Phaser.AUTO,'gamDiv');

game.state.add('boot', bootState);
game.state.add('init', initState);
game.state.add('load',loadState);
game.state.add('menu',menuState);
game.state.add('play',playState);
game.state.add('win',winState);
game.state.add('assets',assetsState);
game.state.start('boot');

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}