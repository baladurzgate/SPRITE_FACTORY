function Level (){

	if(game_data.levels[i].tilesets){
		
		for (var j = 0 ; j < game_data.levels[i].tilesets.length ; j++){
			
			if(!isInArray(game_data.levels[i].tilesets[j].path,files_to_load)){
				
				game.load.image(game_data.levels[i].tilesets[j].name,game_data.levels[i].tilesets[j].path);
				
				files_to_load.push(game_data.levels[i].tilesets[j].path);
				
			}
			
		}
		
	}


}