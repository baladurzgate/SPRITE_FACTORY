var structure = {};

structure.game_Object_typeect = {
		
		name : {
			input_type:'string',
			isArray:false,
			default_value:'unamed_game_Object_typeect',
			display_type:'line'
		},
		type : {
			input_type:'select',
			options:['','sprite','button'],
			isArray:false,
			default_value:'sprite',
			update_all:true,
			display_type:'line'

		},		
		behaviour: {
			input_type:'select',
			options:['','dynamic','projectile'],
			isArray:false,
			default_value:'dynamic',
			conditions:[{prop:'type',value:'sprite'}],
			update_all:true,
			display_type:'line'
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
			default_value:[],
			conditions:[{prop:'type',value:'sprite'}]
		},	
		button_animation: {
			input_type:'button_animation',
			isArray:false,
			default_value:{},
			conditions:[{prop:'type',value:'button'}]
		},		
		physical: {
			input_type:'physical',
			isArray:false,
			default_value:{},
			conditions:[{prop:'type',value:'sprite'}]
		},	
		movement:{
			input_type:'movement',
			isArray:false,
			default_value:{},
			conditions:[{prop:'type',value:'sprite'},{prop:'behaviour',value:'dynamic'}]
		},
		attack:{
			input_type:'attack',
			isArray:false,
			default_value:{},
			conditions:[{prop:'type',value:'sprite'},{prop:'behaviour',value:'dynamic'}]
		},
		stats:{
			input_type:'stats',
			default_value:{},
			conditions:[{prop:'type',value:'sprite'}]
		},
		actions: {
			input_type:'action',
			isArray:true,
			default_value:[],
			conditions:[{prop:'type',value:'sprite'},{prop:'behaviour',value:'dynamic'}]
		},	
		projectile_type: {
			input_type:'link',
			match_type:'projectile',
			isArray:false,
			default_value:undefined,
			conditions:[{prop:'type',value:'sprite'},{prop:'behaviour',value:'dynamic'}]
		},		
		patterns: {
			input_type:'pattern',
			isArray:true,
			default_value:[],
			conditions:[{prop:'type',value:'sprite'},{prop:'behaviour',value:'dynamic'}]
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
			input_type:'sequence',
			sequence_type:'int'
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

structure.button_animation={

		overFrame: {
			input_type:'int',
			isArray:false,
			min:0,
			default_value:0
		},
		outFrame: {
			input_type:'int',
			isArray:false,
			min:0,
			default_value:0
		},
		downFrame: {
			input_type:'int',
			isArray:false,
			min:0,
			default_value:0
		},		
		upFrame: {
			input_type:'int',
			isArray:false,
			min:0,
			default_value:0
		},	

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

structure.pattern_unit = {
	
	
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
