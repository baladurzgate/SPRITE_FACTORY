function Game_data_manager(){

	this.local = {};

	var generated_serials  = [];
	
	this.assets = [];
	
	this.levels = [];

	this.generate_serial  = function(){
	
		var serial = new Date().getUTCMilliseconds();
		
		if(!isInArray(serial,generated_serial)){
		
			generated_serials.push(serial); 
			
			return serial 
		
		}else{
		
			serial = new Date().getUTCMilliseconds();
		
		}
		
		return serial;

	}
	

}