var loadState = {
	
	preload: function (){

		for (var l = 0 ; l < GAME_LEVELS.length ; l ++){
			
			if(GAME_LEVELS[l].useTilesets()){
				
				GAME_LEVELS[l].loadTilesets();

			}
		
		}
	
	},
	
	create: function(){
	
		if(editor){
			
			game.state.start('editor');
			
		}else{
			
			
			game.state.start('menu');
			
		}
		
	}

};

