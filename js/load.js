var loadState = {
	
	preload: function (){
		
		var files_to_load = new Array();

		for (var l = 0 ; l < levels.length ; l ++){
			
			if(levels[l].useTilesets()){
				
				levels[l].loadTilesets();
				
				
			}
		
		
		}
		
		for (var o = 0 ; o <game_objects.length ; o ++){
						
			game_objects[o].loadMedia();
			
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

