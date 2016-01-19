function Level (){

	if(GAME_DATA.GAME_LEVELS[i].tilesets){
		
		for (var j = 0 ; j < GAME_DATA.GAME_LEVELS[i].tilesets.length ; j++){
			
			if(!isInArray(GAME_DATA.GAME_LEVELS[i].tilesets[j].path,files_to_load)){
				
				game.load.image(GAME_DATA.GAME_LEVELS[i].tilesets[j].name,GAME_DATA.GAME_LEVELS[i].tilesets[j].path);
				
				files_to_load.push(GAME_DATA.GAME_LEVELS[i].tilesets[j].path);
				
			}
			
		}
		
	}


}