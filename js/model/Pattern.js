function Pattern($name,$loops){

	this.name = $name
	
	this.actions = new Array();
	
	this.loops = $loops;
	
	this.add_action = function ($action){
		
		this.actions.push($action);
		
	}





}