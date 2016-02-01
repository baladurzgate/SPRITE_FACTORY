var LOADING_FILES = new Array();
var GAME_DATA = {};
var GAME_ASSETS = {Object_types:[],images:[],sounds:[],texts:[],tilemaps:[]};
var GAME_LEVELS = new Array();
var GAME_SOUNDS = {};
var CURRENT_LEVEL;

var GDM = new Game_data_manager();


var bootState = {

	preload: function (){

		//if(!isInArray(LOADING_FILES,'assets/GAME_DATA.json')){
			
			game.load.text('GAME_DATA','assets/GAME_DATA.json');

			LOADING_FILES.push('assets/GAME_DATA.json');

		//}
	
		
	
	},
	
	create: function (){
		
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
		GAME_DATA = JSON.parse(game.cache.getText("GAME_DATA"));
		
		game.state.start('init');
	
	}

};


