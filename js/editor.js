

var editorState = {

	create : function(){
		
		game.stage.backgroundColor = '#FFFFFF';
		
		var style = {font : "15px Arial", fill:"#000000"};
		
		this.GUI.init()
		
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
		game.physics.arcade.gravity.y = 200;
		
		levels[2].start();
		
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

			var game_objects_list = jQuery('<ul></ul>')
			jQuery(this.outliner).append(game_objects_list)
			
			var GUI = this;
			
			for (var i = 0 ; i<game_objects.length; i++){
				
				var game_object =jQuery('<li><button class = "game_object" name = "'+game_objects[i].getName()+'"> '+game_objects[i].getName()+'</button> </li>')
				jQuery(this.outliner).append(game_object)
				
				jQuery(game_object).click(function(e){
					GUI.diplay_object(e.target.name);
				})
				
				
			}				
			
		},
		
		display_parameters:function(element,parent){
			
			for (var param in element){
				
				if(param != 'name'){
					
					this.display_single_param(param,element[param],parent)
									
				}
			}			
			
		},
		
		display_single_param:function(name,value,parent){
			
			var param_span = jQuery('<div class = "param" name = '+name+'><span class = "param_label">'+name+'</span></div>');
			jQuery(param_span).append(this.parse_value_input(name,value))
			jQuery(parent).append(param_span)
											
			
		},	
		
		parse_value_input:function(param,value){
			
			var GUI = this
			
			var input = jQuery('<input name = "'+param+'"   class="param_value" value = "'+value+'">')
			
			jQuery(input).change(function(e) {
				
				console.log(e.target);
				GUI.edited_game_object.changeData(this.name,this.value)
				GUI.preview_game_object();
				
			})
			
			return input;
											
			
		},				
		
		display_array:function(array,parent){
			
			for (var i in array){
				
				var element_data =array[i];
				
				var  element_ul = jQuery('<li class = "array_element"></li>');
				
				var element_name = jQuery('<div class ="array_element_name">'+ element_data.name+'</div>')
				
				var element_params = jQuery('<ul class ="params"></ul>')
				
				jQuery(element_name).click(function(e){
					
					jQuery(e.target).next().toggle();
					
				})
						
				
				jQuery(parent).append(element_ul)
				jQuery(element_ul).append(element_name)
				jQuery(element_ul).append(element_params)

				this.display_parameters(element_data,element_params);
				
				
			}			
			
		},
		
		preview_game_object:function(){

			this.displayed_game_object.destroy();
			
			this.displayed_game_object.kill();
			
			//game.world.removeAll();
			
			this.displayed_game_object = this.edited_game_object.copy({x:100,y:100});			
			
		},
		
		diplay_object:function($objectName){
			
			jQuery(this.properties).empty();
			
			for (var i = 0 ; i<game_objects.length; i++){
				
				if(game_objects[i].getName() == $objectName){
					
					this.edited_game_object = game_objects[i];

					var object_data = game_objects[i].getModelData();
					
					this.preview_game_object();
					
					console.log(game_objects[i].properties)

					
					for(var p in game_objects[i].properties){
						
						var prop = game_objects[i].properties[p];
						
						prop.link_to_GUI(this);
						
						jQuery(this.properties).append(prop.create_jquery_object())
						
						
					}
					
					
					/*for (var prop  in object_data){
						
						var property = jQuery('<li class = "property"></li>');
						jQuery(this.properties).append(property)
						
						var prop_name = jQuery('<div class = "prop_name"> '+prop+' </div>');
						jQuery(property).append(prop_name)
						
						var prop_value = '<span class = "prop_value">';
						
						jQuery(prop_name).click(function(e){
							jQuery(e.target).next().toggle();
						})
						
						switch (prop){
							
							case 'images':
								
								prop_value = jQuery('<ul class = "prop_value"> </ul>');
								
								for (var i in object_data[prop]){
									
									var image = jQuery('<img src = "'+object_data[prop][i].path+'">');
									jQuery(prop_value).append(image)
									
								}
							
							break;
							
							case 'animations':
								
								prop_value = jQuery('<ul class = "prop_value"> </ul>');
								
								this.display_array(object_data[prop],prop_value)
							
							
							break;
							
							case 'shoot_point':
							
								prop_value = jQuery('<ul class = "prop_value"> </ul>');
								
								this.display_parameters(object_data[prop],prop_value);
							
							break;
							
							case 'actions':
								
								prop_value = jQuery('<ul class = "prop_value"> </ul>');
								
								this.display_array(object_data[prop],prop_value)
							
							break;
							
							case 'physical':
								
								prop_value = jQuery('<ul class = "prop_value"> </ul>');
								
								this.display_parameters(object_data[prop],prop_value);
							
							break;
							
							case 'patterns':
								
								prop_value = jQuery('<ul class = "prop_value"> </ul>');
								
								this.display_array(object_data[prop],prop_value)
							
							break;
							
							case 'sounds':
								
								prop_value = jQuery('<ul class = "prop_value"> </ul>');
								
								this.display_array(object_data[prop],prop_value)
							
							break;
							
							default :
							
								prop_value = jQuery(this.parse_value_input(prop,object_data[prop]));
							
						}
						
						jQuery(property).append(prop_value)
						
						
					}	*/


					return
					
				}
				
				
				
			}				
						
			save_content_to_file('hello','text.txt');
		}
		
		
		
	},
	
	update : function(){
		levels[2].update_behaviours();
			
	},
	
	start:function()
	{


	
	},
	

}

function save_content_to_file(content,filename){
	
	var dlg = false;
	with(document){
		ir=createElement('iframe');
		ir.id = 'ifr';
		ir.location = 'about.blank';
		ir.style.display = 'none';
		body.appendChild(ir);
		with(getElementById('ifr').contentWindow.document){
			open("text/plain","replace");
			charset = "utf8";
			write(content)
			close();
			document.charset ="utf8";
			dlg = execCommand('SaveAs',false,filename+'.txt');
		}
	
	body.removeChild(ir);
	
	}
	return dlg;

	
}
