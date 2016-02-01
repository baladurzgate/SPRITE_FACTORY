function Object_type ($model){
		
	var model_buffer = $model;
	
	var serial = model_buffer.serial;
		
	var id = model_buffer.ID
	
	var collide = true;
	
	var group = false;
	
	var pool = [];
	
	var pool_size = 20;
	
	this.getModelData = function(){
		
		return model_buffer;
		
	}
	
	this.update_model_buffer = function(){
	
		model_buffer = AssetManager.get_asset_model(serial);
	
	
	}
	
	this.actualise_asset_model = function(){
	
		AssetManager.change_asset_model(serial,model_buffer)
	
	}
	
	this.changeData = function($name,$value){
				
		if(model_buffer[$name] ){
			model_buffer[$name] = $value;
		}
		
	}
	
	this.getName = function (){
			
		return model_buffer.name;	
			
	}
	
	this.getType = function (){
			
		return model_buffer.type;	
			
	}
	
	this.model_to_string = function(){
		
		return JSON.stringify(model_buffer,null,'\n');
		
	}
	
	
	this.properties ={}
	
	this.init_structure = function(){
	
		for (var prop in structure.object_type){
			
			if(model_buffer[prop] == undefined){
				
				model_buffer[prop] = structure.object_type[prop].default_value != undefined ? structure.object_type[prop].default_value : null;
			
			}
		
			this.properties[prop] = new Property(this,model_buffer,prop,structure.object_type[prop])
		
		}
		
	}
	
	this.fill_pool = function(){
	
		if(model_buffer.type == 'sprite'){
	
			for (var i = 0; i < pool_size; i++) {
			
				this.instanciate({x:-1000,y:-1000},false);
			
			}
		
		}
	
	}
	
	
	this.instanciate = function($instance_data,$create_alive,$use_pool){
			
		var obj_instance = "empty";
	
		var use_pool = $use_pool != undefined ? $use_pool : true;
		
		var create_alive = $create_alive != undefined ? $create_alive: true;
				
		var instance_data = $instance_data != undefined ? $instance_data : {x:0,y:0}
		
		if(model_buffer.sounds != undefined && model_buffer.sounds.length > 0){
			
			for (var s = 0 ; s < model_buffer.sounds.length ; s++){
				
				GAME_SOUNDS[model_buffer.sounds[s].name]=game.add.audio(model_buffer.sounds[s].name);
				
			}

		}
		
		
			
		switch (model_buffer.type) {
				
			case 'sprite' : 
				
				var recycling = false;
			
				if(use_pool){
				
					if(group == false){
						
						group = game.add.group();
						
						if(model_buffer.physical){
						
							group.enableBody = true;
							
							group.physicsBodyType = Phaser.Physics.ARCADE;
						
						}
					
					}
					
					if(pool.length < pool_size){
				
						obj_instance = group.create(instance_data.x,instance_data.y,model_buffer.image);
						
						if(!create_alive) obj_instance.kill();
						
						obj_instance.checkWorldBounds = true;
						
						obj_instance.outOfBoundsKill = true;
						
						if(model_buffer.physical){
			
							game.physics.arcade.enable(obj_instance);
						
						}
						
						this.reset_sprite(obj_instance,instance_data)
						
						pool.push(obj_instance);

					}else{
					
						no_dead_sprite = true;
					
						for (var i = 0; i < pool.length; i++) {
								
							if (!pool[i].alive) {
							
								obj_instance = pool[i];

								obj_instance.reset(instance_data.x,instance_data.y);

								this.reset_sprite(obj_instance,instance_data)
								
								//recycling = true;
								no_dead_sprite = false;
								
								break;

							}
						  
						}
						
						// it's a kind of elastic pool !
						
						if(no_dead_sprite){
						
							pool_size++;
						
							obj_instance = group.create(instance_data.x,instance_data.y,model_buffer.image);
							
							obj_instance.checkWorldBounds = true;
							
							obj_instance.outOfBoundsKill = true;

							this.reset_sprite(obj_instance,instance_data)
							
							pool.push(obj_instance);


						}
						
						
					
					}
					
				
				
				}else{
				
				
					obj_instance = game.add.sprite(instance_data.x,instance_data.y,model_buffer.image)
					
					if(model_buffer.physical){
				
						game.physics.arcade.enable(obj_instance);
						
					}
					
					this.reset_sprite(obj_instance,instance_data)
				
				}
				
				
			
			break;
			
			case "button" : 
			
				var anchor = model_buffer.anchor != undefined ? model_buffer.anchor : {x:0.5,y:0.5};
			
				var overFrame = model_buffer.button_animation != undefined && model_buffer.button_animation.overFrame != undefined  ? model_buffer.button_animation.overFrame : 0;
				
				var outFrame = model_buffer.button_animation != undefined && model_buffer.button_animation.outFrame != undefined  ? model_buffer.button_animation.outFrame : 0;
				
				var downFrame = model_buffer.button_animation != undefined && model_buffer.button_animation.downFrame != undefined  ? model_buffer.button_animation.downFrame : 0;
				
				var upFrame= model_buffer.button_animation != undefined && model_buffer.button_animation.upFrame != undefined  ? model_buffer.button_animation.upFrame : 0;
		
				var obj_instance = game.add.button(instance_data.x,instance_data.y, model_buffer.image, function(){alert('clic')}, this, overFrame, outFrame,downFrame, upFrame);
				
				obj_instance.Object_type = this;

				obj_instance.obect_type_name = model_buffer.name;		
				
				//obj_instance.anchor.set(anchor.x, anchor.y);
				
				obj_instance.properties = instance_data.properties != undefined ? instance_data.properties : false;
					
				console.log(obj_instance);
		
			break;
				
				
		}
		
		if(CURRENT_LEVEL != undefined){
		
			CURRENT_LEVEL.add_object(obj_instance)
		
		}

		return obj_instance;
		
		
			
	}
	
	this.reset_sprite = function(_instance,$instance_data){
	

	
		var obj_instance=_instance;

		obj_instance.Object_type = this;

		obj_instance.obect_type_name = model_buffer.name;		
		
		if(obj_instance.key != model_buffer.image){
		
			obj_instance.loadTexture(model_buffer.image)
		
		}

		var anchor = model_buffer.anchor != undefined ? model_buffer.anchor : {x:0.5,y:0.5};		
	
		obj_instance.anchor.set(anchor.x, anchor.y);

		obj_instance.dying = false;

		obj_instance.id = $instance_data.id
		
		obj_instance.name = $instance_data.name
		
		obj_instance.age = 0;
		
		obj_instance.behaviour = model_buffer.behaviour;
		
		obj_instance.enable_collision = true;
		
		if(model_buffer.animations){
			
			for (var a = 0 ; a < model_buffer.animations.length ; a++){
				
				var aframes = Phaser.Animation.generateFrameNames(model_buffer.animations[a].name, model_buffer.animations[a].start, model_buffer.animations[a].end, '', 3);
				
				obj_instance.animations.add(model_buffer.animations[a].name,model_buffer.animations[a].frames,model_buffer.animations[a].frameRate,model_buffer.animations[a].loop)
			}
			
		}
				
		if(model_buffer.physical){
			
			obj_instance.body.mass = model_buffer.physical.mass;
			
			obj_instance.body.bounce = model_buffer.physical.bounce;
			
			obj_instance.body.collideWorldBounds = model_buffer.physical.collideWorldBounds;
			
			obj_instance.body.allowGravity = model_buffer.physical.allowGravity;
			
			obj_instance.body.immovable = model_buffer.physical.immovable;	
			
			obj_instance.body.width = model_buffer.physical.width != undefined ? model_buffer.physical.width	: 5;
			
			obj_instance.body.height = model_buffer.physical.height != undefined ? model_buffer.physical.height	: 5;
			
		}

			
		
		switch(obj_instance.behaviour){
			
			case 'dynamic' :
			
				obj_instance.controled_by = 'computer';
			
				obj_instance.actions_availables ={};
				
				obj_instance.actions = new ActionManager(Object_type);
				
				obj_instance.patterns = new Array();
				
				obj_instance.health = model_buffer.health != undefined ? model_buffer.health : 100;
				
				obj_instance.lifespan = model_buffer.lifespan != undefined ? model_buffer.lifespan : 0;
				
				obj_instance.tint = model_buffer.tint != undefined ? model_buffer.tint : 16777215;
				
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
				
		
				if(model_buffer.movement){

					obj_instance.movement = {};
					
					for (var m in model_buffer.movement){
						
						obj_instance.movement[m] = model_buffer.movement[m]
						
					}
					
				}
				
				if(model_buffer.attack){

					obj_instance.attack = {};
					
					for (var a in model_buffer.attack){
						
						obj_instance.attack[a] = model_buffer.attack[a]
						
					}
					
					if(model_buffer.attack.type == 'range'){
					
						
					
					}
					
				}				
				
				if(model_buffer.actions){
					
					if(obj_instance.actions != undefined){
						
						for (var a = 0 ; a < model_buffer.actions.length ; a++){
							
							obj_instance.actions[model_buffer.actions[a].name] = new Action(model_buffer.actions[a].name,obj_instance,model_buffer.actions[a]);
							
						}
					}
					
				}
				
				if(model_buffer.patterns){
					
					if(obj_instance.actions != undefined && obj_instance.patterns != undefined){
						
						for (var p = 0 ; p < model_buffer.patterns.length ; p++){
							
							var pattern = new Pattern(model_buffer.patterns[p].name,model_buffer.patterns[p].loops);
							
							for (var a = 0 ; a < model_buffer.patterns[p].actions.length ; a++){
								
								if(obj_instance.actions[model_buffer.patterns[p].actions[a]] != undefined){
									
									pattern.add_action(obj_instance.actions[model_buffer.patterns[p].actions[a]].instanciate());
									
								}

							}
							
							obj_instance.patterns.push(pattern);
							
						}	
						
					}

				}
			
			break;
			
			case 'body_part' :
			
				
			
			
			break;
			
			case 'composite' :
			
			
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
		
		
		obj_instance.update_behaviour = function(){
		
			if(obj_instance.alive){
			
				switch(model_buffer.behaviour){
					
					case 'dynamic' : 
					
						if(!obj_instance.dying){
					
							if(model_buffer.actions){
								
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
							
							//obj_instance.body.moves = false;
							
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
							
							//obj_instance.body.moves = false;
							
							obj_instance.enable_collision = false;
							
							obj_instance.body.velocity.x=0;
							
							obj_instance.body.velocity.y=0;
							
							if(obj_instance.animations.currentAnim.loopCount>0){
								
								obj_instance.kill();
								
							}

						}
					
					break;
					
				}
				
			}
			
		}
		
		if(collide){
		
			//if(obj_instance.alive){
			//if(1+1===2){
			
			if(CURRENT_LEVEL != undefined){
			
				CURRENT_LEVEL.add_object_to_group(obj_instance,'sprites')	
			
			}
			
		
			
		}
	
	
	}


}

