

var editorState = {

	create : function(){
		
		game.stage.backgroundColor = '#FFFFFF';
		
		var style = {font : "15px Arial", fill:"#000000"};
		
		this.GUI.init()
		
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
		game.physics.arcade.gravity.y = 200;
		
		GAME_LEVELS[2].start();
		
	//	display_level_list(200,20,style)
	
		for (var i = 0 ; i<GAME_OBJECT_TYPES.length; i++){
		
			GAME_OBJECT_TYPES[i].fill_pool();
			
		}
		
	},

	
	GUI : {
		
		editor : '',
		outliner : '',
		display : '',
		displayed_game_object : '',		
		edited_object_type:'',
		
		init:function(){
			
			this.editor = jQuery("#editor")
			this.outliner = jQuery('#outliner')	
			this.properties_panel = jQuery('#properties')
			this.display_object_types_list();	
			this.displayed_game_object = game.add.sprite();
		},
		
		display_object_types_list:function(){
			
			jQuery(this.outliner).empty();

			var GAME_OBJECT_TYPES_list = jQuery('<ul></ul>')
			jQuery(this.outliner).append(GAME_OBJECT_TYPES_list)
			
			var GUI = this;
			
			for (var i = 0 ; i<GAME_OBJECT_TYPES.length; i++){
				
				var game_object =jQuery('<li><button class = "game_object" name = "'+GAME_OBJECT_TYPES[i].getName()+'"> '+GAME_OBJECT_TYPES[i].getName()+'</button> </li>')
				jQuery(this.outliner).append(game_object)
				
				jQuery(game_object).click(function(e){
					GUI.edit_object_type(e.target.name);
				})
				
				var delete_button = jQuery('<button class ="delete_button" index = "'+i+'">x</button>');
				jQuery(game_object).append(delete_button)
				var context = this;
				jQuery(delete_button).click(function(){

					GAME_OBJECT_TYPES.splice(jQuery(this).attr('index'),1);
					context.display_object_types_list();

				})	
				
				
			}		

			var add_game_object_button = jQuery('<li><button class ="add_button">+</button></li>');
			
			jQuery(this.outliner).append(add_game_object_button)
			
			jQuery(add_game_object_button).click(function(e){
				
				
			})	
			
			var save_game_data_button = jQuery('<li><button class ="game_object">SAVE</button></li>');
			
			jQuery(this.outliner).append(save_game_data_button)
			
			jQuery(save_game_data_button).click(function(e){
				
				editorState.save_GAME_DATA();
				console.log(GAME_DATA)
				
			})
					
			
		},
		
		preview_object_type:function(){
		
			console.log(this.displayed_game_object);
			
			//if(this.displayed_game_object != undefined && this.displayed_game_object != "" && this.displayed_game_object != "empty"){

				this.displayed_game_object.destroy();
				
				this.displayed_game_object.kill();
			
			//}
			
			//game.world.removeAll();
			
			this.edited_object_type.instanciate({x:Math.random()*600,y:100});			
			
		},
	
	
		edit_object_type:function(_objectName){
		
			for (var i = 0 ; i<GAME_OBJECT_TYPES.length; i++){
				
				if(GAME_OBJECT_TYPES[i].getName() == _objectName){
					
					this.edited_object_type= GAME_OBJECT_TYPES[i];
					
					this.preview_object_type();
					
					this.display_properties();
					
					return
					
				}
				
			}		
		
		},
		
		display_properties:function(){
			
			jQuery(this.properties_panel).empty();
	
			if(this.edited_object_type!= undefined){
				
				var object_type_data = this.edited_object_type.getModelData();

				for(var p in this.edited_object_type.properties){
					
					this.edited_object_type.properties[p].link_to_GUI(this);
					
					jQuery(this.properties_panel).append(this.edited_object_type.properties[p].create_jquery_object())
					
					
				}

				
			}

		},
		
		update_output_info : function(_text){
		
		
		}
		
		
	},
	
	update : function(){
	
		GAME_LEVELS[2].update_behaviours();
		GAME_LEVELS[2].update_collisions();
			
	},
	
	/*render:function() {
	
		
		for (var i = 0 ; i < GAME_LEVELS[2].getLevelObjects().length  ;i++){
		
			game.debug.body(GAME_LEVELS[2].getLevelObjects()[i]);
		
		}

	},*/
	
	save_GAME_DATA:function(){
	
		var data = {
			GD : JSON.stringify(GAME_DATA,null, "\t")
		}
		
		jQuery.post('php/write_game_data.php', data, function(response) {
			console.log(response)
		});


	
	},
	

	

}


