function Level ($tilemap,$json){
		
	var json = $json;
	var tilemap = $tilemap;
	var tilesets = $tilemap.tilesets;
	var layers = new Array();
	var level_objects = new Array();
	var tile_collide = game.add.group();
	
	this.getTilsets = function(){
			
		return tilesets;	
	}
		
	this.loadTilesets = function(){
		
		for (var i = 0 ; i < tilesets.length ; i ++){
			
			if(!isInArray('assets/'+tilesets[i].name+'.png',loading_files)){
					
				game.load.image(tilesets[i].name,'assets/'+tilesets[i].name+'.png');
					
			}
			
		}			
					
	}
	
	
	this.start = function(){
			
		for (var t = 0 ; t < tilesets.length ; t ++){
				
			tilemap.addTilesetImage(tilesets[t].name, tilesets[t].name);

		}	
		
		for (var l = 0 ; l < tilemap.layers.length ; l ++){
				
			var layer = tilemap.createLayer(tilemap.layers[l].name);
			
			layer.resizeWorld();
			
			layers.push(layer);
		}
		
		for (var lo in json.layers){
			
			for (var o in json.layers[lo].objects){
				
				for (var go = 0 ; go < game_objects.length;go++){
					
					if(json.layers[lo].objects[o].type == game_objects[go].getName()){
							
						var obj = game_objects[go].copy(json.layers[lo].objects[o]);
						
						level_objects.push(obj); 
						
						break;
						
					}
					
				}
			}	
		}
		
		console.log(tile_collide)
			
	}
	
	this.update_collisions = function(){
			
		for (var l = 0 ; l < layers.length ; l ++){

			for (var lo = 0 ; lo < level_objects.length;lo++){
					
				game.physics.arcade.collide(level_objects[lo],layers[l]);
				
			}
			
		}	
			
	}
	
	this.update_behaviours = function(){
			
		for (var lo = 0 ; lo < level_objects.length;lo++){
			
			if(level_objects[lo].behaviour){
				level_objects[lo].behaviour.update();	
					
			}
			
		}			
			
			
	}
	
	this.getLevelObjects = function(){
			
		return level_objects;	
			
	}
	
	this.getObjectsByProp = function(prop,value){
			
		var net = new Array();
			
		for (var lo = 0 ; lo < level_objects.length;lo++){
			
			if(level_objects[lo].properties.prop != undefined && level_objects[lo].properties.prop == value){

				return level_objects[lo];
				
				net.push(level_objects[lo]);
				
			}
			
		}		
		
		if(net.length>1){
			
			return net;
				
		}else{
			
			if(net.length>0){
					
				return net[0];	
			}
				
		}
		
		return false;
			
	}
	


	this.getObjectById = function(id){
		
		for (var lo = 0 ; lo < level_objects.length;lo++){
			
			if(level_objects[lo].id == id){
				
				return level_objects[lo];
				
			}
			
		}	

		return false;	
		
		
	}
}