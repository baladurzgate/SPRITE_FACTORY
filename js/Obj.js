function Obj ($data){
		
	var data = $data;
		
	var id = data.ID
		
	var name = data.name;
	
	var type = data.type;
	
	var images = data.images;
	
	var sounds = data.sounds;
	
	var property = data.property;
	
	var animations = data.animations;
	
	console.log(type)

	this.loadMedia = function(){
		
		for (var i = 0 ; i < data.images.length ; i ++){
			
			if(!isInArray(data.images[i].name,loading_files)){
					
				switch (data.images[i].type){
						
					case 'image' : 
					
						game.load.image(data.images[i].name,data.images[i].path);
					
					break;
					
					case 'atlas' : 
					
						game.load.atlas(data.images[i].name,data.images[i].path,data.images[i].atlaspath);
						
					break;
					
					case 'spritesheet' : 
					
						game.load.spritesheet(data.images[i].name,images[i].path,data.images[i].width,data.images[i].height,data.images[i].numberOfFrames);
					
					break;
						
						
				}
				
					
			}
			
		}	
		
		if(data.sounds){

			for (var s = 0 ; s < data.sounds.length ; s ++){
				
				if(!isInArray(data.sounds[s].name,loading_files)){
					
					
					
				}
				
			}		
		
		}
					
	}
	
	this.getName = function (){
			
		return name;	
			
	}
	
	this.getType = function (){
			
		return type;	
			
	}
	
	this.copy = function(object_data,outputgroup){
			
		var obj = "";
			
		switch (data.type) {
				
			case 'sprite' : 
			
				obj = game.add.sprite(object_data.x,object_data.y,data.images[0].name)
				
				obj.properties = object_data.properties
				obj.properties.id = id
				obj.properties.type = object_data.type
				obj.properties.name = object_data.name;
				
				obj.health = data.health != undefined ? data.health : 100;
				obj.lifespan = data.lifespan != undefined ? data.lifespan : 0;
				obj.tint = data.tint != undefined ? data.tint : 16777215;
				
				
				if(obj.properties.anchorX && obj.properties.anchorY){
					
					obj.anchor.set(obj.properties.anchorX, obj.properties.anchorY);
					
				}else{
					
					obj.anchor.set(0, 1);
					
				}
				
				if(data.animations){
					
					for (var a = 0 ; a < data.animations.length ; a++){
						
						var aframes = Phaser.Animation.generateFrameNames(data.animations[a].name, data.animations[a].start, data.animations[a].end, '', 3);
						
						obj.animations.add(data.animations[a].name,data.animations[a].frames,data.animations[a].frameRate,data.animations[a].loop)
					}
					
				}
				
				if(data.physical){
					
					game.physics.arcade.enable(obj);
					
					obj.body.mass = data.physical.mass;
					obj.body.bounce = data.physical.bounce;
					obj.body.collideWorldBounds = data.physical.collideWorldBounds;
					obj.body.allowGravity = data.physical.allowGravity;
					obj.body.immovable = data.physical.immovable;	
					
				}
				
				obj.behaviour = {
					
					update:function(){
						obj.body.velocity.x+=(Math.random()*10)-5;
						obj.body.velocity.y+=(Math.random()*10)-5;
					},
					
					
				};
			
			break;
			
			case "button" : 
			
				var overFrame = data.overFrame != undefined  ? data.overFrame : 0;
				var downFrame = data.downFrame != undefined  ? data.downFrame : 0;
				var upFrame= data.upFrame != undefined  ? data.upFrame : 0;
		
				var obj = game.add.button(object_data.x,object_data.y, data.images[0].name, function(){alert('clic')}, this, overFrame, downFrame, upFrame);
				
				obj.properties = object_data.properties;
					
				if(obj.properties.anchorX && obj.properties.anchorY){
					
					obj.anchor.set(obj.properties.anchorX, obj.properties.anchorY);
					
				}else{
					
					obj.anchor.set(0, 1);
					
				}
				
		
			break;
				
				
		}
		
		console.log(obj);

		return obj;
		
		
			
	}


}