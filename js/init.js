

var initState = {

	preload : function(){
	
		if(GAME_DATA.Levels){
		
			for (var i = 0 ; i < GAME_DATA.Levels.length ; i ++){
				
				if(GAME_DATA.Levels[i].map != undefined && !isInArray(GAME_DATA.Levels[i].map,LOADING_FILES) ){
					
					game.load.tilemap(GAME_DATA.Levels[i].name, GAME_DATA.Levels[i].map, null, Phaser.Tilemap.TILED_JSON);
					
					game.load.text(GAME_DATA.Levels[i].name+'json',GAME_DATA.Levels[i].map);
					
					LOADING_FILES.push(GAME_DATA.Levels[i].map);
					
				}
				
			}
		
		}
		
		if(GAME_DATA.Assets.images){

			for (var i = 0 ; i < GAME_DATA.Assets.images.length ; i ++){
				
				if(!isInArray(GAME_DATA.Assets.images[i].name,LOADING_FILES)){
						
					switch (GAME_DATA.Assets.images[i].type){
							
						case 'image' : 
						
							game.load.image(GAME_DATA.Assets.images[i].name,GAME_DATA.Assets.images[i].path);
						
						break;
						
						case 'atlas' : 
						
							game.load.atlas(GAME_DATA.Assets.images[i].name,GAME_DATA.Assets.images[i].path,GAME_DATA.Assets.images[i].path);
							
						break;
						
						case 'spritesheet' : 
						
							game.load.spritesheet(GAME_DATA.Assets.images[i].name,GAME_DATA.Assets.images[i].path,GAME_DATA.Assets.images[i].width,GAME_DATA.Assets.images[i].height,GAME_DATA.Assets.images[i].numberOfFrames);
						
						break;
							
							
					}
					
					LOADING_FILES.push(GAME_DATA.Assets.images[i].path);
					GAME_ASSETS.images.push(GAME_DATA.Assets.images[i]);
					
				}
				
				
				
			}	
		
		}
		
		if(GAME_DATA.Assets.sounds){

			for (var s = 0 ; s < GAME_DATA.Assets.sounds.length ; s ++){
				
				if(!isInArray(GAME_DATA.Assets.sounds[s].name,LOADING_FILES)){
					
					//game.load.audio(GAME_DATA.Assets.sounds[s].name,GAME_DATA.Assets.sounds[s].file_wave,GAME_DATA.Assets.sounds[s].file_mp3,GAME_DATA.Assets.sounds[s].file_ogg)
					game.load.audio(GAME_DATA.Assets.sounds[s].name,GAME_DATA.Assets.sounds[s].file_mp3)
					LOADING_FILES.push(GAME_DATA.Assets.sounds[s].name);
					
				}
				
				GAME_ASSETS.sounds.push(GAME_DATA.Assets.sounds[s]);
				
			}		
		
		}
	
	},
	
	
	
	create : function(){
			
		for (var l = 0 ; l < GAME_DATA.Levels.length ; l ++){
			
			var tilemap = undefined;
			
			var json = undefined;
			
			if(GAME_DATA.Levels[l].map != undefined){		
				
				tilemap = game.add.tilemap(GAME_DATA.Levels[l].name);
				
				if(GAME_DATA.Levels[l].collision_from != undefined && GAME_DATA.Levels[l].collision_to != undefined){
				
					tilemap.setCollisionBetween(GAME_DATA.Levels[l].collision_from, GAME_DATA.Levels[l].collision_to);
				
				}		
				
				json = JSON.parse(game.cache.getText(GAME_DATA.Levels[l].name+'json'))
				
			}

			var L = new Level(GAME_DATA.Levels[l].name,tilemap,json);
				
			GAME_LEVELS.push(L);
				
		}
		
		for (var o = 0 ; o < GAME_DATA.Assets.Object_types.length ; o ++){
			
			var Ot = new Object_type(GAME_DATA.Assets.Object_types[o]);
			
			GAME_ASSETS.Object_types.push(Ot);
			
		}

		game.state.start('load');
	
	}






}



function find_object_type($name){
	
	for (var o = 0 ; o < GAME_ASSETS.Object_types.length ; o++){
	
			
		if(GAME_ASSETS.Object_types[o].getName() == $name){

			return GAME_ASSETS.Object_types[o];
			
		}
		
		
	}
	
	return false;
	
	
}
