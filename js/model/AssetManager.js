function AssetManager(){

	this.local = {};

	var generated_serials  = [];
	
	this.Assets = [];
	
	this.Levels = [];
	
	var Model = {};

	function generate_serial(){
	
		var serial = new Date().getUTCMilliseconds();
		
		if(!isInArray(serial,this.generated_serials)){
		
			this.generated_serials.push(serial); 
			
			return serial 
		
		}else{
		
			serial = generate_serial();
		
		}

	}
	
	this.loadModel= function(_Model){
	
		this.Model = _Model;
	
	}
	
	this.modify_asset_Model= function(_assetSerial,_propSerial){
	
		
	
	
	}
	
	this.get_asset_Model_by_serial = function(_serial){
	
		for(var asset_type in Model.Assets){
		
			for(var a = 0 ; a < Model.Assets[asset_type].length ; a++){
			
				if(Model.Assets[asset_type][a].serial == _serial){
				
					return Model.Assets[asset_type][a];
				
				}
			
			}		
		
		}
		
	}
	
	this.add_asset= function(_assetModel){
	
		var new_serial = 0;
	
		if(_assetModel.serial != undefined && !isInArray(_assetModel.serial,this.generated_serials){
		
			new_serial  = _assetModel.serial;
		
		}else{
		
			new_serial = this.generate_serial();
		
		}
	
	}
	
	this.preload =function(){
	
		if(Model.Levels){
		
			for (var i = 0 ; i < Model.Levels.length ; i ++){
				
				if(Model.Levels[i].map != undefined && !isInArray(Model.Levels[i].map,LOADING_FILES) ){
					
					game.load.tilemap(Model.Levels[i].name, Model.Levels[i].map, null, Phaser.Tilemap.TILED_JSON);
					
					game.load.text(Model.Levels[i].name+'json',Model.Levels[i].map);
					
					LOADING_FILES.push(Model.Levels[i].map);
					
				}
				
			}
		
		}
		
		if(Model.Assets.images){

			for (var i = 0 ; i < Model.Assets.images.length ; i ++){
			
				var image = "";
				
				if(!isInArray(Model.Assets.images[i].name,LOADING_FILES)){
						
					switch (Model.Assets.images[i].type){
							
						case 'image' : 
						
							image = game.load.image(Model.Assets.images[i].name,Model.Assets.images[i].path);
						
						break;
						
						case 'atlas' : 
						
							image = game.load.atlas(Model.Assets.images[i].name,Model.Assets.images[i].path,Model.Assets.images[i].path);
							
						break;
						
						case 'spritesheet' : 
						
							image = game.load.spritesheet(Model.Assets.images[i].name,Model.Assets.images[i].path,Model.Assets.images[i].width,Model.Assets.images[i].height,Model.Assets.images[i].numberOfFrames);
						
						break;
							
							
					}
					
					LOADING_FILES.push(Model.Assets.images[i].path);
					
					this.Assets.images.push(Model.Assets.images[i].name);
					
				}
				
				
				
			}	
		
		}
		
		if(Model.Assets.sounds){

			for (var s = 0 ; s < Model.Assets.sounds.length ; s ++){
			
				var sound = "";
				
				if(!isInArray(Model.Assets.sounds[s].name,LOADING_FILES)){
					
					//game.load.audio(Model.Assets.sounds[s].name,Model.Assets.sounds[s].file_wave,Model.Assets.sounds[s].file_mp3,Model.Assets.sounds[s].file_ogg)
					game.load.audio(Model.Assets.sounds[s].name,Model.Assets.sounds[s].file_mp3)
					
					LOADING_FILES.push(Model.Assets.sounds[s].name);
					
					//this.Assets.sounds.push(sound);
					
				}
				
				
			}		
		
		}
	
	},
	
	
	this.build = function(){
	
		for (var l = 0 ; l < Model.Levels.length ; l ++){
			
			var tilemap = undefined;
			
			var json = undefined;
			
			if(Model.Levels[l].map != undefined){		
				
				tilemap = game.add.tilemap(Model.Levels[l].name);
				
				if(Model.Levels[l].collision_from != undefined && Model.Levels[l].collision_to != undefined){
				
					tilemap.setCollisionBetween(Model.Levels[l].collision_from, Model.Levels[l].collision_to);
				
				}		
				
				json = JSON.parse(game.cache.getText(Model.Levels[l].name+'json'))
				
			}

			var L = new Level(Model.Levels[l].name,tilemap,json);
				
			this.Levels.push(L);
				
		}
		
		for (var o = 0 ; o < Model.Assets.Object_types.length ; o ++){
		
			if(Model.Assets.Object_types[o].serial != undefined){
			
				Model.Assets.Object_types[o].serial = generate_serial();
			
			}
			
			var Ot = new Object_type(Model.Assets.Object_types[o]);
			
			Ot.init_structure();
			
			this.Assets.Object_types.push(Ot);
			
			
		}
	
	
	
	}
	
	this.change_asset_model = function(_serial,_modified_model){
	
		this.get_asset_model
	
	}
	
	this.save_Model =  function(){
	
	
		
	
	
	
	}
	

}