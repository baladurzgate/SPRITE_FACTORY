function ActionManager ($obj){
	
	this.subject = $obj; // the obj linked to it 

	this.queue = new Array();
	
	this.current_loop = 0;
	
	this.current_pattern = 0;
	
	var a = 0; //current action array index. 
	
	var loop = true;
	
	this.init = function(){
		
		this.queue = new Array();
		
		this.timer = 0; // 
		
		this.current_loop = 0;
		
		this.current_pattern = 0;	

		a = 0;
		
	}
	
	var current_action= "";
	
	var current_pattern = false;
	
	this.update = function(){
		
		if(current_action != ''){
			
			current_action.play();
			
			if(current_action.over){
					
				if(this.queue.length > 0){
				
					this[this.queue[a].name].init();	
					
					if (this.queue.length > 0 && this.queue[a] != undefined ){
					
						if(a < this.queue.length-1){
						
							a++;
						
						}else{
							
							if(loop){
								
								a = 0;
								
								this.init_queue();
								
							}
							
						}	
						
						current_action = this[this.queue[a].name];	

					}
					
				}else{
					
					current_action = "";
					
				}

				
			}
		
		}
		

	}
	
	this.play = function($action_name){
		
		if(this[$action_name] != undefined){
		
			if(this[$action_name].name == $action_name){
				
				if(current_action.over == true || current_action == "" || this[$action_name].priority > current_action.priority || current_action.type == "move" ){
					
					this[$action_name].init();	
						
					current_action = this[$action_name];
				
				}
					

			}	
		}
		
	}
	
	this.init_queue = function (){
		
		for (var q = 0 ; q < this.queue.length ; q++){
			
			this.queue[q].init();
			
		}
		
	}
	
	this.start_pattern = function ($pattern){
		
		this.init();
		
		for (var p = 0 ; p < $pattern.actions.length;p++){
			
			this.add($pattern.actions[p]);
			
		}
		
		current_action = this[this.queue[0].name];	

	}
	
	this.add = function ($action){
		
		this.queue.push($action);
		
	}

}