

var initState = {

	preload : function(){
	
		for (var i = 0 ; i < game_data.levels.length ; i ++){
			
			if(!isInArray(game_data.levels[i].map,loading_files)){
				
				game.load.tilemap(game_data.levels[i].name, game_data.levels[i].map, null, Phaser.Tilemap.TILED_JSON);
				
				game.load.text(game_data.levels[i].name+'json',game_data.levels[i].map);
				
				loading_files.push(game_data.levels[i].map);
				
			}
			
		}
	
	},
	
	
	
	create : function(){
			
		for (var l = 0 ; l < game_data.levels.length ; l ++){
				
			var tilemap = game.add.tilemap(game_data.levels[l].name);
			
			tilemap.setCollisionBetween(game_data.levels[l].collision_from, game_data.levels[l].collision_to);

			var L = new Level(tilemap,JSON.parse(game.cache.getText(game_data.levels[l].name+'json')));
				
			levels.push(L);
				
		}
		
		for (var o = 0 ; o < game_data.objects.length ; o ++){
			
			var O = new Obj(game_data.objects[o]);
			
			game_objects.push(O);
			
		}
	
		game.state.start('load');
	
	}






}