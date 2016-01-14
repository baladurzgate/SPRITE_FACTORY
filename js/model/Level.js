function Level ($name,$tilemap,$json){
		
	var name = $name;
	var json = $json != undefined ? $json : false;
	var tilemap = $tilemap != undefined ? $tilemap : false;
	var tilesets =  $tilemap != undefined && $tilemap.tilesets != undefined ? $tilemap.tilesets : false;
	var layers = new Array();
	var level_objects = new Array();
	var tile_collide = game.add.group();
	var level_groups = {};
	
	
	this.getName = function(){
		
		return name;
		
	}
	
	
	this.getTilesets = function(){
			
		return tilesets;	
	}
	
	this.useTilesets = function(){
		
		return tilesets != false;
		
	}
	
	this.useLayers = function(){
		
		return json != false;
		
	}	
	
	this.loadTilesets = function(){
		
		if(tilesets.length>0){
		
			for (var i = 0 ; i < tilesets.length ; i ++){
				
				if(!isInArray('assets/'+tilesets[i].name+'.png',loading_files)){
						
					game.load.image(tilesets[i].name,'assets/'+tilesets[i].name+'.png');
						
				}
				
			}			
		
		}
					
	}
	
	this.add_object = function(obj){

		if(!isInArray(obj,level_objects)){
			
			level_objects.push(obj);
			
		}
		
	}
	
	
	this.select_player = function (){
		
		 var player = levels[0].getObjectsByProp('name','player');
		player.controled_by = 'player'
		
		return player;
	}
	
	
	this.start = function(){
		
		
		current_level = this;
		
		if(this.useTilesets()){
			
			if(tilesets != false){
			
				for (var t = 0 ; t < tilesets.length ; t ++){
						
					tilemap.addTilesetImage(tilesets[t].name, tilesets[t].name);

				}	
			
			}
			
			for (var l = 0 ; l < tilemap.layers.length ; l ++){
					
				var layer = tilemap.createLayer(tilemap.layers[l].name);
				
				layer.resizeWorld();
				
				layers.push(layer);
			}
			
			if(json != false){
			
				for (var lo in json.layers){
					
					for (var o in json.layers[lo].objects){
						
						for (var go = 0 ; go < game_objects.length;go++){
							
							if(json.layers[lo].objects[o].type == game_objects[go].getName()){
									
								var obj = game_objects[go].copy(json.layers[lo].objects[o]);
								
								break;
								
							}
							
						}
					}	
				}
			
			}
		
		}
		

			
	}
	
	this.add_object_to_group = function ($obj,$group_name){
		
		if(level_groups[$group_name] == undefined){
			
			level_groups[$group_name] = game.add.group()
			
		}
		
		level_groups[$group_name].add($obj)
		
	}
	
	this.update_collisions = function(){
		
		if(this.useLayers()){
			
			for (var l = 0 ; l < layers.length ; l ++){

				for (var lo = 0 ; lo < level_objects.length;lo++){
						
					game.physics.arcade.collide(level_objects[lo],layers[l],function(obj,ground){

						if(obj.onCollide){
							
							obj.onCollide(ground);
							
						}
						
					});
					
				}
				
			}	
					
			
		}
			

		game.physics.arcade.collide(level_groups['sprites'],level_groups['sprites'],function(objA,objB){
			
			if(objA.onCollide){
				objA.onCollide(objB);
			}

		},function(objA,objB){

			if(objA.callBack){
				
				return objA.callBack(objB);
				
			}			
			
		})		
			
	}
	
	this.update_behaviours = function(){
			
		for (var lo = 0 ; lo < level_objects.length;lo++){
			
			if(level_objects[lo].update_behaviour != undefined){
				
				level_objects[lo].update_behaviour();	
			}
		}			
			
			
	}
	
	this.getLevelObjects = function(){
			
		return level_objects;	
			
	}
	
	this.getObjectsByProp = function(prop,value){
			
		var net = new Array();
			
		for (var lo = 0 ; lo < level_objects.length ; lo++){
			
			if(level_objects[lo][prop] != undefined && level_objects[lo][prop] == value){
				
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