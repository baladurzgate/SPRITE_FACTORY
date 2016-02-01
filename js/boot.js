var LOADING_FILES = new Array();
var GAME_DATA = {};
var GAME_ASSETS = {Object_types:[],images:[],sounds:[],texts:[],tilemaps:[]};
var GAME_LEVELS = new Array();
var GAME_SOUNDS = {};
var CURRENT_LEVEL;

var AssetManager = new AssetManager();


var bootState = {

	preload: function (){

		//if(!isInArray(LOADING_FILES,'assets/GAME_DATA.json')){
			
			game.load.text('GAME_DATA','assets/GAME_DATA.json');

			LOADING_FILES.push('assets/GAME_DATA.json');

		//}
	
<<<<<<< HEAD
=======
		game.load.text('GAME_DATA','assets/GAME_DATA.json');
		
>>>>>>> e9c4a23c3f48c507e0eb3e4d763f0cdbd295e618
		
	
	},
	
	create: function (){
	
		
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
		GAME_DATA = JSON.parse(game.cache.getText("GAME_DATA"));
		
		AM.loadModel(GAME_DATA)
		
		game.state.start('init');
	
	}

};


