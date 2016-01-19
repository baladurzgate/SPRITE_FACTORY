

var initState = {

	preload : function(){
	
		for (var i = 0 ; i < GAME_DATA.Levels.length ; i ++){
			
			if(GAME_DATA.Levels[i].map != undefined && !isInArray(GAME_DATA.Levels[i].map,LOADING_FILES) ){
				
				game.load.tilemap(GAME_DATA.Levels[i].name, GAME_DATA.Levels[i].map, null, Phaser.Tilemap.TILED_JSON);
				
				game.load.text(GAME_DATA.Levels[i].name+'json',GAME_DATA.Levels[i].map);
				
				LOADING_FILES.push(GAME_DATA.Levels[i].map);
				
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
		
		for (var o = 0 ; o < GAME_DATA.Objects.length ; o ++){
			
			var O = new Obj(GAME_DATA.Objects[o]);
			
			GAME_OBJECTS.push(O);
			
		}
	
		game.state.start('load');
	
	}






}