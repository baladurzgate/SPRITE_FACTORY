var loadState = {
	
	preload: function (){
		
		var files_to_load = new Array();

		for (var l = 0 ; l < levels.length ; l ++){
		
			levels[l].loadTilesets();
		
		}
		
		for (var o = 0 ; o <game_objects.length ; o ++){
						
			game_objects[o].loadMedia();
			
		}
	
	
	},
	
	create: function(){
	
		game.state.start('assets');
		//game.state.start('menu');
		
	}

};

