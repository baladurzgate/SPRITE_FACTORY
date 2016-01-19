var loadState = {
	
	preload: function (){
		
		var files_to_load = new Array();

		for (var l = 0 ; l < GAME_LEVELS.length ; l ++){
			
			if(GAME_LEVELS[l].useTilesets()){
				
				GAME_LEVELS[l].loadTilesets();
				
				
			}
		
		
		}
		
		for (var o = 0 ; o <GAME_OBJECTS.length ; o ++){
						
			GAME_OBJECTS[o].loadMedia();
			
		}
	
	
	},
	
	create: function(){
	
		if(editor){
			
			game.state.start('editor');
			
		}else{
			
			
			game.state.start('menu');
			
		}
		//game.state.start('menu');
		
	}

};

