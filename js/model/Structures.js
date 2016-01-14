var structure = {};

structure.game_object = {
		
		name : {
			input_type:'string',
			isArray:false,
			default_value:'unamed_game_object'
		},
		type : {
			input_type:'select',
			options:['sprite','button'],
			isArray:false,
			default_value:'sprite'
		},		
		behaviour: {
			input_type:'select',
			options:['dynamic','projectile'],
			isArray:false,
			default_value:'dynamic',
		},			
		images: {
			input_type:'image',
			isArray:true,
			default_value:[]
		},	
		frames: {
			input_type:'frames',
			isArray:true,
			default_value:[]
		},		
		animations: {
			input_type:'animation',
			isArray:true,
			default_value:[]
		},		
		physical: {
			input_type:'physical',
			isArray:false,
			default_value:{}
		},	
		movement:{
			input_type:'movement',
			isArray:false,
			default_value:{}
		},
		attack:{
			input_type:'attack',
			isArray:false,
			default_value:{}
		},
		stats:{
			input_type:'stats',
			isArray:true,
			default_value:{}
		},
		actions: {
			input_type:'action',
			isArray:true,
			default_value:[]
		},	
		projectile_type: {
			input_type:'link',
			match_type:'projectile',
			isArray:false,
			default_value:undefined
		},		
		patterns: {
			input_type:'pattern',
			isArray:true,
			default_value:[]
		},
		sounds: {
			input_type:'sound',
			isArray:true,
			default_value:[]
		}			
		
	}
	
	
structure.image ={
	
		name : {
			input_type:'string',
			isArray:false,
		},
		path : {
			input_type:'file',
			isArray:false,
		},
		type : {
			input_type:'select',
			options:['spritesheet','image'],
			isArray:false
		},		
		numberOfFrames: {
			input_type:'int',
			isArray:false
		},			
		width: {
			input_type:'int',
			isArray:false,
			min:0,
		},		
		height: {
			input_type:'int',
			isArray:false,
			min:0,
		}
	
}

structure.sound={
	
		name : {
			input_type:'string',
			isArray:false,
		},
		file_wave : {
			input_type:'file',
			isArray:false,
		},
		file_ogg : {
			input_type:'file',
			isArray:false,
		},		
		file_mp3: {
			input_type:'file',
			isArray:false,
		}
	
}

structure.animation = {
	
		name : {
			input_type:'string',
			isArray:false
		},
		frames : {
			input_type:'frame',
			isArray:true
		},
		frameRate : {
			input_type:'int',
			isArray:false
		},	
		loop : {
			input_type:'bool',
			isArray:false
		}

}


structure.physical = {
	
		mass : {
			input_type:'number',
			isArray:false,
			step:0.01,
			min:0.00,
			max:20.00,
		},
		bounce : {
			input_type:'point',
			isArray:true,
			step:0.01,
			min:0.00,
			max:10,
		},
		allowGravity : {
			input_type:'bool',
			isArray:false
		},	
		collideWorldBounds : {
			input_type:'bool',
			isArray:false
		},	
		immovable : {
			input_type:'bool',
			isArray:false
		},	
		width: {
			input_type:'int',
			isArray:false,
			min:0,
		},		
		height: {
			input_type:'int',
			isArray:false,
			min:0,
		}	
}



structure.action = {
	
		name : {
			input_type:'string',
			isArray:false,
			default_value:'new_action'
		},
		type : {
			input_type:'select',
			options:['move','normal'],
			isArray:false,
			default_value:'normal'
		},
		duration : {
			input_type:'int',
			isArray:false,
			min:0,
			default_value:0
		},
		animation : {
			input_type:'link',
			isArray:false,
			match_type:'animation',
			default_value:'idle'
		},
		sound : {
			input_type:'link',
			match_type:'sound',
			isArray:false,
			default_value:'none'
		},	
		priority : {
			input_type:'int',
			isArray:false,
			min:0,
			default_value:0
		},
		actionFrame : {
			input_type:'int',
			isArray:false,
			min:0,
			default_value:0
		}
		
		
	
}

structure.pattern = {
	
	
	name : {
		input_type:'string',
		isArray:false,
		default_value:'unamed_pattern'
	},
	actions : {
		input_type:'sequence',
		isArray:false,
		default_value:''
	}
	
}

structure.attack = {
	
	attack_type : {
		input_type:'select',
		options:['range','melee'],
		isArray:false,
		default_value:'range'
	},
	shot_point: {
		input_type:'point',
		isArray:false,
		default_value:{x:0,y:0}
	},	
	projectile: {
		input_type:'link',
		match_type:'projectile',
		default_value:undefined
	},	
	shot_speed_vector:{
		input_type:'point',
		isArray:false,
		default_value:{x:0,y:0}
	},
	damage:{
		input_type:'int',
		isArray:false,
		min:0,
		default_value:10
	},
	fire_rate:{
		input_type:'int',
		isArray:false,
		min:0,
		default_value:10
	}
	
}

structure.movement = {
	
	idle_brake :{
		input_type:'number',
		isArray:false,
		step:0.01,
		min:0,
		max:1	
	},
	walk_speed : {
		input_type:'int',
		isArray:false,
		step:1,
		min:0,
		max:2000
	},
	run_speed : {
		input_type:'int',
		isArray:false,
		step:1,
		min:0,
		max:2000
	},
	jump_strength : {
		input_type:'int',
		isArray:false,
		step:1,
		min:0,
		max:2000
	},
	fly_speed : {
		input_type:'number',
		isArray:false,
		step:0.1,
		min:0.0,
		max:2000.0
	}
	
}

structure.stats = {
	
	start_health : {
		input_type:'int',
		isArray:false,
		min:0
	},
	max_health : {
		input_type:'int',
		isArray:false,
		min:0
	},
	
}
