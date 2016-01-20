var GAME_DATA = {}
var GAME_LEVELS = new Array();
var GAME_OBJECT_TYPES = new Array();
var LOADING_FILES = new Array();
var GAME_SOUNDS = {};
var CURRENT_LEVEL;


var bootState = {

	preload: function (){
	
		game.load.text('GAME_DATA','assets/GAME_DATA.json');
	
	},
	
	create: function (){
		
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
		GAME_DATA = JSON.parse(game.cache.getText("GAME_DATA"));
		
		game.state.start('init');
	
	}

};


