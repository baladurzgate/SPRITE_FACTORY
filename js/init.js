

var initState = {

	preload : function(){
	
		for (var i = 0 ; i < game_data.levels.length ; i ++){
			
			if(game_data.levels[i].map != undefined && !isInArray(game_data.levels[i].map,loading_files) ){
				
				game.load.tilemap(game_data.levels[i].name, game_data.levels[i].map, null, Phaser.Tilemap.TILED_JSON);
				
				game.load.text(game_data.levels[i].name+'json',game_data.levels[i].map);
				
				loading_files.push(game_data.levels[i].map);
				
			}
			
		}
	
	},
	
	
	
	create : function(){
			
		for (var l = 0 ; l < game_data.levels.length ; l ++){
			
			var tilemap = undefined;
			
			var json = undefined;
			
			if(game_data.levels[l].map != undefined){		
				
				tilemap = game.add.tilemap(game_data.levels[l].name);
				
				if(game_data.levels[l].collision_from != undefined && game_data.levels[l].collision_to != undefined){
				
					tilemap.setCollisionBetween(game_data.levels[l].collision_from, game_data.levels[l].collision_to);
				
				}		
				
				json = JSON.parse(game.cache.getText(game_data.levels[l].name+'json'))
				
			}

			var L = new Level(game_data.levels[l].name,tilemap,json);
			
			console.log(L)
				
			levels.push(L);
				
		}
		
		for (var o = 0 ; o < game_data.objects.length ; o ++){
			
			var O = new Obj(game_data.objects[o]);
			
			game_objects.push(O);
			
		}
	
		game.state.start('load');
	
	}






}