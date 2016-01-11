

var assetsState = {

	create : function(){
		
		game.stage.backgroundColor = '#FFFFFF';

		//jQuery('#gamDiv').hide();
		
		console.log(game_objects)
		console.log(levels)		
		
		var style = {font : "15px Arial", fill:"#000000"};
		
		this.GUI.init()
		
	//	display_level_list(200,20,style)
		
		
		
	},
	
	GUI : {
		
		editor : '',
		outliner : '',
		display : '',
		
		init:function(){
			
			this.editor = jQuery('<div id ="editor"></div>')
			console.log(this.editor)
			jQuery(this.editor).appendTo('body');
			this.outliner = jQuery('<div id ="outliner"></div>')
			jQuery(this.outliner).appendTo(this.editor);		
			this.display = jQuery('<div id ="display"></div>')
			jQuery(this.display).appendTo(this.editor);				
			this.display_game_object_list();
			//this.diplay_object_properties('dot');
		},
		
		display_game_object_list:function(){
			
			console.log(this.outliner);
			
			var game_objects_list = jQuery('<ul></ul>')
			jQuery(this.outliner).append(game_objects_list)
			
			var GUI = this;
			
			for (var i = 0 ; i<game_objects.length; i++){
				
				var game_object =jQuery('<li><button name = "'+game_objects[i].getName()+'"> '+game_objects[i].getName()+'</button> </li>')
				jQuery(this.outliner).append(game_object)
				
				jQuery(game_object).click(function(e){
					console.log(e.target.name)
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
			
				
			var param_span = jQuery('<span class = "param"><span class = "param_label">'+name+'</span>'+this.parse_value_input(value));
			
			console.log(param_span)
					
			jQuery(parent).append(param_span)
											
			
		},	
		parse_value_input:function(value){
			
			return '<input class = "param_value" value = "'+value+'">';
											
			
		},				
		display_array:function(array,parent){
			
			for (var i in array){
				
				console.log(array[i])
				
				var element_data =array[i];
				
				var  element_ul = jQuery('<li class = "array_element"><span class ="array_element_name">'+ element_data.name+'</span> </li>');
				
				jQuery(parent).append(element_ul)

				this.display_parameters(element_data,element_ul);
				
				
			}			
			
		},
		
		diplay_object:function($objectName){
			
			jQuery(this.display).empty();
			
			for (var i = 0 ; i<game_objects.length; i++){
				
				if(game_objects[i].getName() == $objectName){

					var object_data = game_objects[i].getData();
					
					game_objects[i].copy();
					
					var properties = jQuery('<ul id="properties"></ul>')
					jQuery(this.display).append(properties)	
					
					for (var prop  in object_data){
						
						var property = jQuery('<li class = "property"></li>');
						jQuery(properties).append(property)
						
						var prop_name = jQuery('<span class = "prop_name"> '+prop+' : </span>');
						jQuery(property).append(prop_name)
						
						var prop_value = '<span class = "prop_value">';
						
						switch (prop){
							
							case 'images':
								
								prop_value = jQuery('<ul class = "prop_value"> </ul>');
								
								for (var i in object_data[prop]){
									
									console.log(object_data[prop][i])
									
									var image = jQuery('<img src = "'+object_data[prop][i].path+'">');
									jQuery(prop_value).append(image)
									
								}
							
							break;
							
							case 'animations':
								
								prop_value = jQuery('<ul class = "prop_value"> </ul>');
								
								this.display_array(object_data[prop],prop_value)
							
							
							break;
							
							case 'shoot_point':
								
								this.display_parameters(object_data[prop],prop_value);
							
							break;
							
							case 'actions':
								
								prop_value = jQuery('<ul class = "prop_value"> </ul>');
								
								this.display_array(object_data[prop],prop_value)
							
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
							
								prop_value = jQuery(this.parse_value_input(object_data[prop]));
							
						}
						
						jQuery(property).append(prop_value)
						
						
					}	


					return
					
				}
				
				
				
			}				
						
			
		}
		
	},
	
	update : function(){
		
			
	},
	
	start:function()
	{


	
	},
	

}


