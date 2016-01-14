function Action ($name,$subject,$data){

	this.name = $name
	
	this.subject = $subject != undefined ? $subject : false
	
	this.data = $data != undefined ? $data : false;
	
	this.object = this.data.object != undefined ? this.data.object : false

	this.duration = this.data.duration != undefined ? this.data.duration + Math.random()*10 : 10 ;
	
	this.timer = 0 ; 
	
	this.over = true;
	
	this.playing = false;
	
	this.priority = this.data.priority != undefined ? this.data.priority : 0;
	
	this.type = this.data.type != undefined ? this.data.type : "none";
	
	var action_sound = this.data.sound != undefined ? this.data.sound : false;
	
	var action_animation = this.data.animation != undefined ? this.data.animation : 'idle';
	
	this.actionFrame =  this.data.actionFrame != undefined ? this.data.actionFrame : 0;
	
	this.key_input = this.data.key_input != undefined ? this.data.key_input  : 'A';
	
	var idle_brake = this.subject.movement != undefined && this.subject.movement.idle_brake != undefined? this.subject.movement.idle_brake : 0.9;
	var walk_speed = this.subject.movement != undefined && this.subject.movement.walk_speed != undefined? this.subject.movement.walk_speed : 100;
	var run_speed = this.subject.movement != undefined && this.subject.movement.run_speed != undefined? this.subject.movement.run_speed : 150;
	var fly_speed = this.subject.movement != undefined && this.subject.movement.fly_speed != undefined? this.subject.movement.fly_speed : 2;
	var jump_strength = this.subject.movement != undefined && this.subject.movement.jump_strength != undefined? this.subject.movement.jump_strength : 100;
	
	var shot_point =this.subject.attack != undefined && this.subject.attack.shot_point != undefined ? this.subject.attack.shot_point : {x:0,y:0}
	var projectile_name = this.subject.attack != undefined && this.subject.attack.projectile != undefined ? this.subject.attack.projectile : 'poison_projectile';
	var shot_speed_vector = this.subject.attack != undefined && this.subject.attack.shot_speed_vector != undefined ? this.subject.attack.shot_speed_vector : {x:5,y:5};
	
	
	this.init = function(){
		
		this.timer = 0 ; 
	
		this.over = false;		
		
	}
	
	this.play = function(){
		
		if(this.subject.alive){
		
			switch (this.name){
				
				case 'IDLE':
				
					if(this.timer <= this.duration){
						
						if(this.timer == 0){

						
						}
						
						if(this.subject.body.onFloor()){
						
							this.subject.body.velocity.x*=idle_brake;
							this.subject.body.velocity.y*=idle_brake;
						
						}
						
						this.subject.animations.play(action_animation);
						
						
					}


				break;
				
				case 'WALK_RIGHT':
				
				
					if(this.timer < this.duration){
		
						this.subject.scale.x = 1;
						
						if(this.subject.body.onFloor()){
						
							this.subject.body.velocity.x = walk_speed;
						
						}
						
						this.subject.animations.play(action_animation);
						
					}

				
				break;			

				case 'WALK_LEFT':
				
					if(this.timer < this.duration){
						
						this.subject.scale.x = -1;
						
						if(this.subject.body.onFloor()){
						
							this.subject.body.velocity.x = -walk_speed

						}
						
						this.subject.animations.play(action_animation);
						
					}

				
				break;	
				

				case 'JUMP':
				
					if(this.timer == this.actionFrame){
						
						if(this.subject.body.onFloor()){
						
							this.subject.body.velocity.y-=jump_strength;
							
							if(action_sound != false){
								
								game_sounds[action_sound].play();
								
							}
						
						}
						
						this.subject.animations.play(action_animation)
					}
					
					if(this.timer > this.actionFrame){
						
						if(this.subject.body.onFloor() == false){
							
							this.timer=1;
							
						}else{
							
								
							this.subject.body.velocity.x*=idle_brake;
							this.subject.body.velocity.y*=idle_brake;
							
							this.timer=this.duration;
							
						}					
						
					}
					
					

				
				break;				

				case 'DUPLICATE':
				
					if(this.timer == this.actionFrame){
						
						
						this.subject.animations.play(action_animation);
						
						var clone = this.subject.object_model.copy({x:this.subject.x,y:this.subject.y})
						
						clone.body.velocity.x += (Math.random()*200)-100
						clone.body.velocity.y -= 300
						
						this.subject.body.velocity.x*=0.5;
						this.subject.body.velocity.y*=0.5;
						
						if(action_sound != false){
							
							game_sounds[action_sound].play();
							
						}
						
					}				
				
				
				break;		

				case 'FIRE':
				
					
				
					if( this.timer == this.actionFrame){
						
						if(this.subject.projectile_type!=false){
							

						
							var absolute_shoot_point ={x:this.subject.x+shot_point.x*this.subject.scale.x,y:this.subject.y+shot_point.y*this.subject.scale.y}
		
							var projectile_type = find_game_object(projectile_name);
							var projectile = projectile_type.copy(absolute_shoot_point)

		
							projectile.body.velocity.x += shot_speed_vector.x* this.subject.scale.x
							projectile.body.velocity.y += shot_speed_vector.y* this.subject.scale.y
							//projectile.body.velocity.y -= 200
							
						
							this.subject.body.velocity.x*=idle_brake;
							this.subject.body.velocity.y*=idle_brake;
							
							if(action_sound != false){
								
								game_sounds[action_sound].play();
								
							}		

							this.subject.animations.play(action_animation);
							
						}
						
					}				
				
				break;
				
				case 'FLY_IDLE':
				
					if(this.timer <= this.duration){
						
						this.subject.body.velocity.x*=0.99;
						this.subject.body.velocity.y*=0.99;
						
						this.subject.animations.play(action_animation);
						
						
					}


				break;
				

				case 'FLY_RIGHT':
				
					if(this.timer < this.duration){
						
						this.subject.scale.x = 1;

						this.subject.body.velocity.x += fly_speed ;

						this.subject.animations.play(action_animation);
						
					}

				
				break;				
				
				case 'FLY_LEFT':
				
					if(this.timer < this.duration){
						
						this.subject.scale.x = -1;

						this.subject.body.velocity.x += -fly_speed

						this.subject.animations.play(action_animation);
						
					}

				
				break;
				
				case 'FLY_UP':
				
					if(this.timer < this.duration){

						this.subject.body.velocity.y += -fly_speed ;

						this.subject.animations.play(action_animation);
						
					}

				
				break;	

				case 'FLY_DOWN':
				
					if(this.timer < this.duration){

						this.subject.body.velocity.y += fly_speed;

						this.subject.animations.play(action_animation);
						
					}

				
				break;					
			}
			
			if(this.timer < this.duration){

				this.timer++;	
				
				this.over = false;
						
			}else{
				
				this.over = true;
				
			}

		}		
		
		
		
	}
	
	this.copy = function (){
		
		var copy = new Action(this.name,this.subject,this.data);
		
		return copy;
		
	}


}

