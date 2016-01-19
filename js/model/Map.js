function Level (){

	if(GAME_DATA.Levels[i].tilesets){
		
		for (var j = 0 ; j < GAME_DATA.Levels[i].tilesets.length ; j++){
			
			if(!isInArray(GAME_DATA.Levels[i].tilesets[j].path,files_to_load)){
				
				game.load.image(GAME_DATA.Levels[i].tilesets[j].name,GAME_DATA.Levels[i].tilesets[j].path);
				
				files_to_load.push(GAME_DATA.Levels[i].tilesets[j].path);
				
			}
			
		}
		
	}


}