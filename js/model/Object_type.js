function Object_type ($model_data){
		
	var model_data = $model_data;
		
	var id = model_data.ID
	
	var collide = true;
	
	this.loadMedia = function(){
		
		for (var i = 0 ; i < model_data.images.length ; i ++){
			
			if(!isInArray(model_data.images[i].name,LOADING_FILES)){
					
				switch (model_data.images[i].type){
						
					case 'image' : 
					
						game.load.image(model_data.images[i].name,model_data.images[i].path);
					
					break;
					
					case 'atlas' : 
					
						game.load.atlas(model_data.images[i].name,model_data.images[i].path,model_data.images[i].atlaspath);
						
					break;
					
					case 'spritesheet' : 
					
						game.load.spritesheet(model_data.images[i].name,model_data.images[i].path,model_data.images[i].width,model_data.images[i].height,model_data.images[i].numberOfFrames);
					
					break;
						
						
				}
				
					
			}
			
			
			
		}	
		
		if(model_data.sounds){

			for (var s = 0 ; s < model_data.sounds.length ; s ++){
				
				if(!isInArray(model_data.sounds[s].name,LOADING_FILES)){
					
					//game.load.audio(model_data.sounds[s].name,model_data.sounds[s].file_wave,model_data.sounds[s].file_mp3,model_data.sounds[s].file_ogg)
					game.load.audio(model_data.sounds[s].name,model_data.sounds[s].file_mp3)
					
				}
				
			}		
		
		}

		
		this.init_structure();
					
	}
	
	this.getModelData = function(){
		
		return model_data;
		
	}
	
	this.changeData = function($name,$value){
				
		if(model_data[$name] ){
			model_data[$name] = $value;
		}
		
	}
	
	
	this.getName = function (){
			
		return model_data.name;	
			
	}
	
	this.getType = function (){
			
		return model_data.type;	
			
	}
	
	this.model_to_string = function(){
		
		return JSON.stringify(model_data);
		
	}
	
	
	this.properties ={}
	
	this.init_structure = function(){
	
		for (var prop in structure.object_type){
			
			if(model_data[prop] == undefined){
				
				model_data[prop] = structure.object_type[prop].default_value;
			
			}
		
			this.properties[prop] = new Property(this,model_data,prop,structure.object_type[prop])
		
		}
		
	}
	
	
	this.instanciate = function($instance_data){
			
		var obj_instance = "";
		
		var instance_data = $instance_data != undefined ? $instance_data : {x:0,y:0}
		
		if(model_data.sounds != undefined && model_data.sounds.length > 0){
			
			for (var s = 0 ; s < model_data.sounds.length ; s++){
				
				GAME_SOUNDS[model_data.sounds[s].name]=game.add.audio(model_data.sounds[s].name);
				
			}

		}
			
		switch (model_data.type) {
				
			case 'sprite' : 
			
				obj_instance = game.add.sprite(instance_data.x,instance_data.y,model_data.images[0].name)
				
				obj_instance.Object_type = this;
				
				obj_instance.dying = false;
				
				obj_instance.controled_by = 'computer';

				obj_instance.id = instance_data.id
				
				obj_instance.name = instance_data.name
				
				var anchor = model_data.anchor != undefined ? model_data.anchor : {x:0.5,y:0.5};
					
				obj_instance.anchor.set(anchor.x, anchor.y);
				
				obj_instance.age = 0;
				
				obj_instance.behaviour = model_data.behaviour;
				
				obj_instance.enable_collision = true
					
				
				switch(obj_instance.behaviour){
					
					case 'dynamic' : 
					
						obj_instance.actions_availables ={};
						
						obj_instance.actions = new ActionManager(Object_type);
						
						obj_instance.patterns = new Array();
						
						obj_instance.health = model_data.health != undefined ? model_data.health : 100;
						
						obj_instance.lifespan = model_data.lifespan != undefined ? model_data.lifespan : 0;
						
						obj_instance.tint = model_data.tint != undefined ? model_data.tint : 16777215;
						
						obj_instance.projectile_type = model_data.attack.projectile_type;
						
						obj_instance.shoot_point = model_data.shoot_point;
						
						obj_instance.onCollide = function(obstacle){
							
							if(obstacle){
							
								if(obstacle.behaviour == 'projectile'){
									
									if(!obstacle.dying){
										
										obj_instance.destroy();
										
										obstacle.destroy()
										
									}
									
								}
								
							}
							
						}
						
						obj_instance.callBack = function(obstacle){
							
							if(obj_instance.enable_collision){

								return true;
								
							}
								
							return false;

						}
					
					break;
						
					case 'projectile':
					
						obj_instance.onCollide = function(obstacle){
							
							if(obstacle){
							
								if(obstacle.behaviour == 'projectile'){
									
									return false;
									
								}
									
								obj_instance.destroy();
								
								obstacle.destroy()

							}

						}
						
						obj_instance.callBack = function(obstacle){
							
							if(obstacle){
							
								if(obstacle.behaviour == 'projectile' || obj_instance.enable_collision == false){
									
									return false;
									
								}else{
									
									return true;
									
								}				

							}							
							
						}

					break;		

				}
				
				obj_instance.destroy = function(){
					
					obj_instance.dying = true;
					
				}
				
				
				if(model_data.animations){
					
					for (var a = 0 ; a < model_data.animations.length ; a++){
						
						var aframes = Phaser.Animation.generateFrameNames(model_data.animations[a].name, model_data.animations[a].start, model_data.animations[a].end, '', 3);
						
						obj_instance.animations.add(model_data.animations[a].name,model_data.animations[a].frames,model_data.animations[a].frameRate,model_data.animations[a].loop)
					}
					
				}
						
				if(model_data.physical){
					
					game.physics.arcade.enable(obj_instance);
					
					obj_instance.body.mass = model_data.physical.mass;
					obj_instance.body.bounce = model_data.physical.bounce;
					obj_instance.body.collideWorldBounds = model_data.physical.collideWorldBounds;
					obj_instance.body.allowGravity = model_data.physical.allowGravity;
					obj_instance.body.immovable = model_data.physical.immovable;	
					
					obj_instance.body.width = model_data.physical.width != undefined ? model_data.physical.width	: 5;
					obj_instance.body.height = model_data.physical.height != undefined ? model_data.physical.height	: 5;
					
				}
				
				if(model_data.movement){

					obj_instance.movement = {};
					
					for (var m in model_data.movement){
						
						obj_instance.movement[m] = model_data.movement[m]
						
					}
					
				}
				if(model_data.attack){

					obj_instance.attack = {};
					
					for (var a in model_data.attack){
						
						obj_instance.attack[a] = model_data.attack[a]
						
					}
					
				}				
				
				if(model_data.actions){
					
					if(obj_instance.actions != undefined){
						
						for (var a = 0 ; a < model_data.actions.length ; a++){
							
							obj_instance.actions[model_data.actions[a].name] = new Action(model_data.actions[a].name,obj_instance,model_data.actions[a]);
							
						}
					}
					

					
				}
				
				if(model_data.patterns){
					
					if(obj_instance.actions != undefined && obj_instance.patterns != undefined){
						
						for (var p = 0 ; p < model_data.patterns.length ; p++){
							
							var pattern = new Pattern(model_data.patterns[p].name,model_data.patterns[p].loops);
							
							for (var a = 0 ; a < model_data.patterns[p].actions.length ; a++){
								
								if(obj_instance.actions[model_data.patterns[p].actions[a]] != undefined){
									
									pattern.add_action(obj_instance.actions[model_data.patterns[p].actions[a]].instanciate());
									
								}
								
								
							}
							
							obj_instance.patterns.push(pattern);
							
						}	
						
					}

					
				}
				
				
				obj_instance.update_behaviour = function(){
					
					switch(model_data.behaviour){
						
						case 'dynamic' : 
						
							if(!obj_instance.dying){
						
								if(model_data.actions){
									
									if(obj_instance.controled_by == 'computer' && obj_instance.age == 0){
										
										if(obj_instance.patterns.length > 0){

											obj_instance.actions.start_pattern(obj_instance.patterns[0])

										}
										
									}

									obj_instance.actions.update();	
								
								}else{
									
									obj_instance.animations.play('idle');
									
								}	
								
								obj_instance.age++;
								
							}else{
								
								obj_instance.animations.play('death');
								
								obj_instance.enable_collision = false;
								
								obj_instance.body.moves = false;
								
								if(obj_instance.animations.currentAnim.loopCount>0){
									
									obj_instance.kill();
									
								}
								
							}
							
							
						
						break;
						
						case 'projectile':
						
							if(!obj_instance.dying){
						
								obj_instance.animations.play('idle');
							
							}else{
								
								obj_instance.animations.play('death');
								
								obj_instance.body.moves = false;
								
								obj_instance.enable_collision = false;
								
								obj_instance.body.velocity.x=0;
								obj_instance.body.velocity.y=0;
								
								if(obj_instance.animations.currentAnim.loopCount>0){
									
									obj_instance.kill();
									
								}

							}
						
						break;
						
					}
					
				};
				
				if(collide){
					
					if(CURRENT_LEVEL != undefined){
					
						CURRENT_LEVEL.add_object_to_group(obj_instance,'sprites')	
					
					}
					
				}
			
			break;
			
			case "button" : 
			
				var overFrame = model_data.button_animation != undefined && model_data.button_animation.overFrame != undefined  ? model_data.button_animation.overFrame : 0;
				var outFrame = model_data.button_animation != undefined && model_data.button_animation.outFrame != undefined  ? model_data.button_animation.outFrame : 0;
				var downFrame = model_data.button_animation != undefined && model_data.button_animation.downFrame != undefined  ? model_data.button_animation.downFrame : 0;
				var upFrame= model_data.button_animation != undefined && model_data.button_animation.upFrame != undefined  ? model_data.button_animation.upFrame : 0;
		
				var obj_instance = game.add.button(instance_data.x,instance_data.y, model_data.images[0].name, function(){alert('clic')}, this, overFrame, outFrame,downFrame, upFrame);
				
				obj_instance.properties = instance_data.properties != undefined ? instance_data.properties : false;
					
				if(obj_instance.properties.anchorX && obj_instance.properties.anchorY){
					
					obj_instance.anchor.set(obj_instance.properties.anchorX, obj_instance.properties.anchorY);
					
				}else{
					
					obj_instance.anchor.set(0, 1);
					
				}
				
		
			break;
				
				
		}
		
		if(CURRENT_LEVEL != undefined){
		
			CURRENT_LEVEL.add_object(obj_instance)
		
		}

		return obj_instance;
		
		
			
	}


}

