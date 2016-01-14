function Obj ($model_data){
		
	var model_data = $model_data;
		
	var id = model_data.ID
	
	var collide = true;
	
	this.loadMedia = function(){
		
		for (var i = 0 ; i < model_data.images.length ; i ++){
			
			if(!isInArray(model_data.images[i].name,loading_files)){
					
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
				
				if(!isInArray(model_data.sounds[s].name,loading_files)){
					
					//game.load.audio(model_data.sounds[s].name,model_data.sounds[s].file_wave,model_data.sounds[s].file_mp3,model_data.sounds[s].file_ogg)
					game.load.audio(model_data.sounds[s].name,model_data.sounds[s].file_mp3)
					
				}
				
			}		
		
		}
		
		//console.log(this.model_to_string())
		
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
		
		for (var prop in model_data){
			
			if(structure.game_object[prop] != undefined){
				
				this.properties[prop] = new Property(this,model_data,prop,structure.game_object[prop])
				
			}
			
		}
		
		
	}
	
	
	this.copy = function($instance_data){
			
		var obj = "";
		
		var instance_data = $instance_data != undefined ? $instance_data : {x:0,y:0}
		
		if(model_data.sounds != undefined && model_data.sounds.length > 0){
			
			for (var s = 0 ; s < model_data.sounds.length ; s++){
				
				game_sounds[model_data.sounds[s].name]=game.add.audio(model_data.sounds[s].name);
				
			}

		}
			
		switch (model_data.type) {
				
			case 'sprite' : 
			
				obj = game.add.sprite(instance_data.x,instance_data.y,model_data.images[0].name)
				
				//obj.model_data = this;
				obj.object_model = this;
				
				obj.dying = false;
				
				obj.controled_by = 'computer';

				obj.id = instance_data.id
				
				obj.name = instance_data.name
					
				obj.anchor.set(0.5, 1);
				
				obj.age = 0;
				
				obj.behaviour = model_data.behaviour;
				
				obj.enable_collision = true
					
				
				switch(obj.behaviour){
					
					case 'dynamic' : 
					
						obj.actions_availables ={};
						
						obj.actions = new ActionManager(obj);
						
						obj.patterns = new Array();
						
						obj.health = model_data.health != undefined ? model_data.health : 100;
						
						obj.lifespan = model_data.lifespan != undefined ? model_data.lifespan : 0;
						
						obj.tint = model_data.tint != undefined ? model_data.tint : 16777215;
						
						obj.projectile_type = model_data.projectile_type;
						
						obj.shoot_point = model_data.shoot_point;
						
						obj.onCollide = function(obstacle){
							
							if(obstacle){
							
								if(obstacle.behaviour == 'projectile'){
									
									if(!obstacle.dying){
										
										obj.destroy();
										
										obstacle.destroy()
										
									}
									
								}
								
							}
							
						}
						
						obj.callBack = function(obstacle){
							
							if(obj.enable_collision){

								return true;
								
							}
								
							return false;

						}
					
					break;
						
					case 'projectile':
					
						obj.onCollide = function(obstacle){
							
							if(obstacle){
							
								if(obstacle.behaviour == 'projectile'){
									
									return false;
									
								}
									
								obj.destroy();
								
								obstacle.destroy()

							}

						}
						
						obj.callBack = function(obstacle){
							
							if(obstacle){
							
								if(obstacle.behaviour == 'projectile' || obj.enable_collision == false){
									
									return false;
									
								}else{
									
									return true;
									
								}				

							}							
							
						}

					break;		

				}
				
				obj.destroy = function(){
					
					obj.dying = true;
					
				}
				
				
				if(model_data.animations){
					
					for (var a = 0 ; a < model_data.animations.length ; a++){
						
						var aframes = Phaser.Animation.generateFrameNames(model_data.animations[a].name, model_data.animations[a].start, model_data.animations[a].end, '', 3);
						
						obj.animations.add(model_data.animations[a].name,model_data.animations[a].frames,model_data.animations[a].frameRate,model_data.animations[a].loop)
					}
					
				}
						
				if(model_data.physical){
					
					game.physics.arcade.enable(obj);
					
					obj.body.mass = model_data.physical.mass;
					obj.body.bounce = model_data.physical.bounce;
					obj.body.collideWorldBounds = model_data.physical.collideWorldBounds;
					obj.body.allowGravity = model_data.physical.allowGravity;
					obj.body.immovable = model_data.physical.immovable;	
					
					obj.body.width = model_data.physical.width != undefined ? model_data.physical.width	: 5;
					obj.body.height = model_data.physical.height != undefined ? model_data.physical.height	: 5;
					
				}
				
				if(model_data.movement){

					obj.movement = {};
					
					for (var m in model_data.movement){
						
						obj.movement[m] = model_data.movement[m]
						
					}
					
				}
				if(model_data.attack){

					obj.attack = {};
					
					for (var a in model_data.attack){
						
						obj.attack[a] = model_data.attack[a]
						
					}
					
				}				
				
				if(model_data.actions){
					
					if(obj.actions != undefined){
						
						for (var a = 0 ; a < model_data.actions.length ; a++){
							
							obj.actions[model_data.actions[a].name] = new Action(model_data.actions[a].name,obj,model_data.actions[a]);
							
						}
					}
					

					
				}
				
				if(model_data.patterns){
					
					if(obj.actions != undefined && obj.patterns != undefined){
						
						for (var p = 0 ; p < model_data.patterns.length ; p++){
							
							var pattern = new Pattern(model_data.patterns[p].name,model_data.patterns[p].loops);
							
							for (var a = 0 ; a < model_data.patterns[p].actions.length ; a++){
								
								if(obj.actions[model_data.patterns[p].actions[a]] != undefined){
									
									pattern.add_action(obj.actions[model_data.patterns[p].actions[a]].copy());
									
								}
								
								
							}
							
							obj.patterns.push(pattern);
							
						}	
						
					}

					
				}
				
				
				obj.update_behaviour = function(){
					
					switch(model_data.behaviour){
						
						case 'dynamic' : 
						
							if(!obj.dying){
						
								if(model_data.actions){
									
									if(obj.controled_by == 'computer' && obj.age == 0){
										
										if(obj.patterns.length > 0){

											obj.actions.start_pattern(obj.patterns[0])

										}
										
									}

									obj.actions.update();	
								
								}else{
									
									obj.animations.play('idle');
									
								}	
								
								obj.age++;
								
							}else{
								
								obj.animations.play('death');
								
								obj.enable_collision = false;
								
								obj.body.moves = false;
								
								if(obj.animations.currentAnim.loopCount>0){
									
									obj.kill();
									
								}
								
							}
							
							
						
						break;
						
						case 'projectile':
						
							if(!obj.dying){
						
								obj.animations.play('idle');
							
							}else{
								
								obj.animations.play('death');
								
								obj.body.moves = false;
								
								obj.enable_collision = false;
								
								obj.body.velocity.x=0;
								obj.body.velocity.y=0;
								
								if(obj.animations.currentAnim.loopCount>0){
									
									obj.kill();
									
								}

							}
						
						break;
						
					}
					
				};
				
				if(collide){
					
					if(current_level != undefined){
					
						current_level.add_object_to_group(obj,'sprites')	
					
					}
					
				}
			
			break;
			
			case "button" : 
			
				var overFrame = model_data.overFrame != undefined  ? model_data.overFrame : 0;
				var downFrame = model_data.downFrame != undefined  ? model_data.downFrame : 0;
				var upFrame= model_data.upFrame != undefined  ? model_data.upFrame : 0;
		
				var obj = game.add.button(instance_data.x,instance_data.y, model_data.images[0].name, function(){alert('clic')}, this, overFrame, downFrame, upFrame);
				
				obj.properties = instance_data.properties != undefined ? instance_data.properties : false;
					
				if(obj.properties.anchorX && obj.properties.anchorY){
					
					obj.anchor.set(obj.properties.anchorX, obj.properties.anchorY);
					
				}else{
					
					obj.anchor.set(0, 1);
					
				}
				
		
			break;
				
				
		}
		
		if(current_level != undefined){
		
			current_level.add_object(obj)
		
		}

		return obj;
		
		
			
	}


}

