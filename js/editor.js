

var editorState = {

	create : function(){
		
		game.stage.backgroundColor = '#FFFFFF';
		
		var style = {font : "15px Arial", fill:"#000000"};
		
		this.GUI.init()
		
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
		game.physics.arcade.gravity.y = 200;
		
		GAME_LEVELS[2].start();
		
	//	display_level_list(200,20,style)
		
	},

	
	GUI : {
		
		editor : '',
		outliner : '',
		display : '',
		displayed_game_object : '',		
		edited_game_object :'',
		
		init:function(){
			
			this.editor = jQuery("#editor")
			this.outliner = jQuery('#outliner')	
			this.properties = jQuery('#properties')
			this.display_game_object_list();	
			this.displayed_game_object = game.add.sprite();
		},
		
		display_game_object_list:function(){
			
			jQuery(this.outliner).empty();

			var GAME_OBJECTS_list = jQuery('<ul></ul>')
			jQuery(this.outliner).append(GAME_OBJECTS_list)
			
			var GUI = this;
			
			for (var i = 0 ; i<GAME_OBJECTS.length; i++){
				
				var game_object =jQuery('<li><button class = "game_object" name = "'+GAME_OBJECTS[i].getName()+'"> '+GAME_OBJECTS[i].getName()+'</button> </li>')
				jQuery(this.outliner).append(game_object)
				
				jQuery(game_object).click(function(e){
					GUI.diplay_object(e.target.name);
				})
				
				var delete_button = jQuery('<button class ="delete_button" index = "'+i+'">x</button>');
				jQuery(game_object).append(delete_button)
				var context = this;
				jQuery(delete_button).click(function(){

					GAME_OBJECTS.splice(jQuery(this).attr('index'),1);
					context.display_game_object_list();

				})	
				
				
			}		

			var add_game_object_button = jQuery('<li><button class ="add_button">+</button></li>');
			jQuery(this.outliner).append(add_game_object_button)
			jQuery(add_game_object_button).click(function(e){
				
				
			})	
			
			var save_game_data_button = jQuery('<li><button class ="game_object">SAVE</button></li>');
			jQuery(this.outliner).append(save_game_data_button)
			jQuery(add_game_object_button).click(function(e){
				
				editorState.save_GAME_DATA();
				
			})
					
			
		},

		
		parse_value_input:function(_param,_value){
			
			var GUI = this
			
			var input = jQuery('<input name = "'+_param+'"   class="param_value" value = "'+_value+'">')
			
			jQuery(input).change(function(e) {
				
				console.log(e.target);
				GUI.edited_game_object.changeData(this.name,this.value)
				GUI.preview_game_object();
				
			})
			
			return input;
											
			
		},				
		
		
		preview_game_object:function(){

			this.displayed_game_object.destroy();
			
			this.displayed_game_object.kill();
			
			//game.world.removeAll();
			
			this.displayed_game_object = this.edited_game_object.copy({x:100,y:100});			
			
		},
		
		diplay_object:function(_objectName){
			
			jQuery(this.properties).empty();
			
			for (var i = 0 ; i<GAME_OBJECTS.length; i++){
				
				if(GAME_OBJECTS[i].getName() == _objectName){
					
					this.edited_game_object = GAME_OBJECTS[i];

					var object_data = GAME_OBJECTS[i].getModelData();
					
					this.preview_game_object();
					
					console.log(GAME_OBJECTS[i].properties)

					
					for(var p in GAME_OBJECTS[i].properties){
						
						var prop = GAME_OBJECTS[i].properties[p];
						
						prop.link_to_GUI(this);
						
						jQuery(this.properties).append(prop.create_jquery_object())
						
						
					}

					return
					
				}
				
				
				
			}				
						
			save_content_to_file('hello','text.txt');
		},
		
		update_output_info : function(_text){
		
		
		}
		
		
	},
	
	update : function(){
		GAME_LEVELS[2].update_behaviours();
			
	},
	
	save_GAME_DATA:function(){
	
		var data = {
			GD : JSON.stringify(GAME_DATA)
		}
		
		jQuery.post('php/write_game_data.php', data, function(response) {
			//alert('Got this from the server: ' + response);
			this.GUI.update_output_info("areas up to date");
		});


	
	},
	

	

}


