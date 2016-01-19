

var initState = {

	preload : function(){
	
		for (var i = 0 ; i < GAME_DATA.GAME_LEVELS.length ; i ++){
			
			if(GAME_DATA.GAME_LEVELS[i].map != undefined && !isInArray(GAME_DATA.GAME_LEVELS[i].map,LOADING_FILES) ){
				
				game.load.tilemap(GAME_DATA.GAME_LEVELS[i].name, GAME_DATA.GAME_LEVELS[i].map, null, Phaser.Tilemap.TILED_JSON);
				
				game.load.text(GAME_DATA.GAME_LEVELS[i].name+'json',GAME_DATA.GAME_LEVELS[i].map);
				
				LOADING_FILES.push(GAME_DATA.GAME_LEVELS[i].map);
				
			}
			
		}
	
	},
	
	
	
	create : function(){
			
		for (var l = 0 ; l < GAME_DATA.GAME_LEVELS.length ; l ++){
			
			var tilemap = undefined;
			
			var json = undefined;
			
			if(GAME_DATA.GAME_LEVELS[l].map != undefined){		
				
				tilemap = game.add.tilemap(GAME_DATA.GAME_LEVELS[l].name);
				
				if(GAME_DATA.GAME_LEVELS[l].collision_from != undefined && GAME_DATA.GAME_LEVELS[l].collision_to != undefined){
				
					tilemap.setCollisionBetween(GAME_DATA.GAME_LEVELS[l].collision_from, GAME_DATA.GAME_LEVELS[l].collision_to);
				
				}		
				
				json = JSON.parse(game.cache.getText(GAME_DATA.GAME_LEVELS[l].name+'json'))
				
			}

			var L = new Level(GAME_DATA.GAME_LEVELS[l].name,tilemap,json);
				
			GAME_LEVELS.push(L);
				
		}
		
		for (var o = 0 ; o < GAME_DATA.objects.length ; o ++){
			
			var O = new Obj(GAME_DATA.objects[o]);
			
			GAME_OBJECTS.push(O);
			
		}
	
		game.state.start('load');
	
	}






}