var game_data = {}
var levels = new Array();
var game_objects = new Array();
var loading_files = new Array();


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

