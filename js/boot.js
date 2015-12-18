var game_data = {}
var levels = new Array();
var game_objects = new Array();
var loading_files = new Array();
var game_sounds = {};
var current_level;


var bootState = {

	preload: function (){
	
		game.load.text('game_data','assets/game_data.json');
	
	},
	
	create: function (){
		
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
		game_data = JSON.parse(game.cache.getText("game_data"));
		
		game.state.start('init');
	
	}

};



function find_game_object($name){
	
	console.log(game_objects.length)
	
	for (var o = 0 ; o < game_objects.length ; o++){
	
			
		if(game_objects[o].getName() == $name){

			return game_objects[o];
			
		}
		
		
	}
	
	return false;
	
	
}

