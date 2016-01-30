function Property ($output,$object_data,$name,$prop_data,$depth){
	
	var output = $output;
	
	var object_data = $object_data;

	var input_name = $name;
	
	var prop_data = $prop_data
	
	var depth = $depth != undefined ? $depth : 0;
	
	var context = this;
	
	this.off = false;
	
	this.parent = undefined;
	
	this.parent_index = undefined;
	
	var linked_GUI;
	
	var value = object_data[input_name] != undefined ? object_data[input_name] : prop_data.default_value != undefined ? prop_data.default_value : undefined;
	
	var prop_value_tag = jQuery('<ul class = "prop_value"></ul>');
	
	var display_type = prop_data.display_type != undefined ? prop_data.display_type : 'drawer';
	
	if(prop_data.display_type != undefined){
	
	
	}
	
	this.link_to_GUI = function($GUI){
		
		linked_GUI = $GUI;
		
	}
	
	this.getDefaultValue = function(){
	
		if(prop_data.default_value){ 
		
			return prop_data.default_value;
		
		}else{
		
			return '';
		}
		
	
	}
	
	this.create_input = function(){
		
		var input = jQuery('<input name = "'+input_name +'"type = "text" value = "'+value+'">');
		
		switch(prop_data.input_type){
		
			case 'string' : 
					
					input =  jQuery('<input name = "'+input_name+'"type = "text" value = "'+value+'">')
					
					var context = this;
					
					jQuery(input).change(function(e) {

						if(context.parent == undefined){
							
							output.getModelData()[input_name] = e.target.value;
							
						}else{
							
							if(context.parent_index == undefined){
								
								output.getModelData()[context.parent][input_name] = e.target.value;
								
							}else{
								
								output.getModelData()[context.parent][context.parent_index][input_name] = e.target.value;
								
							}
							
							
						}

						if(linked_GUI != undefined){
							
							linked_GUI.preview_object_type();	
							
						}
	
					})
					

				
			
			break;

			
			case 'bool' : 
			
					if(value){
						
						input =  jQuery('<input name = "'+input_name+'"type = "checkbox" value = "'+value+'"checked>')
						
					}else{
						
						input =  jQuery('<input name = "'+input_name+'"type = "checkbox" value = "'+value+'">')
						
					}
			
					var context = this;
					

					jQuery(input).change(function(e) {
							
						if(context.parent == undefined){
							
							output.getModelData()[input_name] = e.target.checked;
							
						}else{
							
							if(context.parent_index == undefined){
								
								output.getModelData()[context.parent][input_name] = e.target.checked;
								
							}else{
								
								output.getModelData()[context.parent][context.parent_index][input_name] = e.target.checked;
								
							}
							
							
						}
						if(linked_GUI != undefined){
							
							linked_GUI.preview_object_type();	
							
						}
	
					})

			
			break;
			
			
			case 'int' : 
			
					input =  jQuery('<input name = "'+input_name+'"type = "number" step = "'+prop_data.step+'" min = "'+prop_data.min+'" max = "'+prop_data.max+'" value = "'+value+'">')
					
					var context = this;
					
					jQuery(input).change(function(e) {

						if(context.parent == undefined){
							
							output.getModelData()[input_name] = parseInt(e.target.value);
							
						}else{
							
							if(context.parent_index == undefined){
								
								output.getModelData()[context.parent][input_name] = parseInt(e.target.value);
								
							}else{
								
								output.getModelData()[context.parent][context.parent_index][input_name] = parseInt(e.target.value);
								
							}
							
							
						}

						if(linked_GUI != undefined){
							
							linked_GUI.preview_object_type();	
							
						}
	
					})

			
			break;
			
			
			case 'number' : 
			

					
					input =  jQuery('<input name = "'+input_name+'"type = "number" step = "'+prop_data.step+'" min = "'+prop_data.min+'" max = "'+prop_data.max+'" value = "'+value+'">')
					
					var context = this;
					
					jQuery(input).change(function(e) {
						
						if(context.parent == undefined){
							
							output.getModelData()[input_name] = parseFloat(e.target.value);
							
						}else{
							
							if(context.parent_index == undefined){
								
								output.getModelData()[context.parent][input_name] = parseFloat(e.target.value);
								
							}else{
								
								output.getModelData()[context.parent][context.parent_index][input_name] = parseFloat(e.target.value);
								
							}
							
							
						}

						if(linked_GUI != undefined){
							
							linked_GUI.preview_object_type();	
							
						}
	
					})

			
			break;
			
			case 'point' : 
			
					var input = jQuery('<table></table>');
			
					var coords =  jQuery('<tr></tr>')
					
					value.x = value.x != undefined ? value.x : 0;
					value.y = value.y != undefined ? value.y : 0;

					var inputx = jQuery('<td>X</td><td><input  class = "w-30p" size ="3" id = "'+input_name+'_x" name = "'+input_name+'"type = "number" step = "'+prop_data.step+'" min = "'+prop_data.min+'" max = "'+prop_data.max+'" value = "'+value.x+'"></td>')
					var inputy = jQuery('<td>Y</td><td><input class = "w-30p" size ="3" id = "'+input_name+'_y" name = "'+input_name+'"type = "number" step = "'+prop_data.step+'" min = "'+prop_data.min+'" max = "'+prop_data.max+'" value = "'+value.y+'"></td>')
					
					jQuery(input).append(coords);
					jQuery(coords).append(inputx);
					jQuery(coords).append(inputy);
					
					var context = this;

					jQuery(inputx).change(function(e) {

						if(context.parent == undefined){
							
							output.getModelData()[input_name].x = e.target.value;
							
						}else{
							
							if(context.parent_index == undefined){
								
								output.getModelData()[context.parent][input_name].x = e.target.value;
								
							}else{
								
								output.getModelData()[context.parent][context.parent_index][input_name].x = e.target.value;
								
							}
							
							
						}

						if(linked_GUI != undefined){
							
							linked_GUI.preview_object_type();	
							
						}
				
							
					})
					
					jQuery(inputy).change(function(e) {
							
						if(context.parent == undefined){
							
							output.getModelData()[input_name].y = e.target.value;
							
						}else{
							
							if(context.parent_index == undefined){
								
								output.getModelData()[context.parent][input_name].y = e.target.value;
								
							}else{
								
								output.getModelData()[context.parent][context.parent_index][input_name].y = e.target.value;
								
							}
							
							
						}
						if(linked_GUI != undefined){
							
							linked_GUI.preview_object_type();	
							
						}
				
							
					})
			
			break;
			
			case 'sequence' : 
			
					
				input =  jQuery('<input name = "'+input_name+'"type = "text" value = "'+value+'">')
				
				var context = this;
				
				
				jQuery(input).change(function(e) {
						
					var array = e.target.value.split(',')
					
					for (var a = 0 ; a < array.length ; a++){
					
						if(array[a]==""||array[a]==undefined){
							array.splice(a,1);
						}
					
					}
					
					var sequence_type = prop_data.sequence_type != undefined ? prop_data.sequence_type : 'string';
					
					for (var a = 0 ; a < array.length ; a++){
					
						switch (sequence_type){
						
							case 'int':
								
								array[a] = parseInt(array[a]);
								
							
							break;
							case 'string' : 
							
							
							
							break;
						}
				
					}
					

					if(context.parent == undefined){
						
					
						if(context.parent_index == undefined){
							
							output.getModelData()[input_name] = array;
							
						}else{
							
							output.getModelData()[input_name][context.parent_index] = array;
							
						}
						
					}else{
						
						if(context.parent_index == undefined){
							
							output.getModelData()[context.parent][input_name] = array;
							
						}else{
							
							output.getModelData()[context.parent][context.parent_index][input_name] = array;
							
						}
						
						
					}

					if(linked_GUI != undefined){
						
						linked_GUI.preview_object_type();	
						
					}

				})
				

			
			break;

			case 'select' : 
			
				input =  jQuery('<select id = "'+output.getName()+'-'+input_name+'"name = "'+input_name+'"  value = "'+value+'">')
				
				if(prop_data.options != undefined){
					
					for(var o = 0 ; o < prop_data.options.length;o++){
					
						if(prop_data.options[o] == value){
						
							
							var option = jQuery('<option value = "'+prop_data.options[o]+'" selected="selected">'+prop_data.options[o]+'</option>');
						
						}else{
						
							var option = jQuery('<option value = "'+prop_data.options[o]+'">'+prop_data.options[o]+'</option>');
						
						}
						
						
						jQuery(input).append(option);
						
					}	

					var empty_option = jQuery('<option value = "empty" ></option>');					
					
					jQuery(input).append(empty_option);
				}
				
				var context = this;
				
				jQuery(input).change(function(e) {
				
					value =  e.target.value != 'empty' ? e.target.value : prop_data.default_value;
						
					if(context.parent == undefined){
					
						
						output.getModelData()[input_name] = value;

						
					}else{
							
							if(context.parent_index == undefined){
								
								output.getModelData()[context.parent][input_name] = value;
								
								
								
							}else{
								
								output.getModelData()[context.parent][context.parent_index][input_name] = value;
								
							}
							
							
						}

					if(linked_GUI != undefined){
						
						if(prop_data.update_all){
						
							linked_GUI.display_properties();
						
						}
						
						linked_GUI.preview_object_type();
						
					}
			
						
				})

			
			break;
			
			case 'file' : 
			

					
					input =  jQuery('<input name = "'+input_name+'"type = "file" value = "'+value+'">')
					
					jQuery(input).change(function(e) {

						output.changeData(e.target.name,e.target.value)

						if(linked_GUI != undefined){
							
							linked_GUI.preview_object_type_type();	
							
						}
				
							
					})

			
			break;
			
			case 'image' : 

				if(prop_data.isArray){
					
					input =  jQuery('<ul></ul>');
					
					for (var i in value){
						
						var li =  jQuery('<li class = "array_element" ></li>')
						jQuery(input).append(li)
						var snapshot = jQuery('<img name = "image_'+i+'"src = "'+value[i].path+'">');
						jQuery(li).append(snapshot)
						
						jQuery(snapshot).click(function(e){
							
							jQuery(e.target).next().toggle();
							
						})					
						
						var table = jQuery('<table ></table>');
						jQuery(li).append(table)
						
					
						var sub_properties = {};
						
						for(var p in structure.image){
							
							if(value[0][p] != undefined ){
								
								sub_properties[p] = new Property(output,value[i],p,structure.image[p],depth+1)
								sub_properties[p].link_to_GUI(linked_GUI)
								sub_properties[p].parent = input_name;
								sub_properties[p].parent_index = i;
								
								
							}
							
						}
						
						for(var sp in value[i]){
							
							jQuery(table).append(sub_properties[sp].create_jquery_object())

						}
						
					}	
					
				}
				
			break;	
			
			case 'sound' : 

				if(prop_data.isArray){
					
					input = this.create_array(prop_data.input_type)	
					
				}
			
			break;
			
			case 'animation' : 

				if(prop_data.isArray){
					
					input = this.create_array(prop_data.input_type)	
					
				}
			
			break;	
			
			case 'physical' : 
					
				input = this.create_table(prop_data.input_type)
			
			break;
			
			case 'button_animation' : 
					
				input = this.create_table(prop_data.input_type)
					
			
			break;
			
			case 'action' : 

				if(prop_data.isArray){
					
					input = this.create_array(prop_data.input_type)	
					
				}
			
			break;	
			
			case 'pattern' : 

				if(prop_data.isArray){
					
					input = this.create_array(prop_data.input_type)	
					
				}
				
			break;
			

				
			
			case 'movement' : 
			
				input = this.create_table(prop_data.input_type)
					
									
			
			break;
			
			case 'attack' : 
			
				input = this.create_table(prop_data.input_type)
					
			break;
			
			case 'stats' : 
			
				input = this.create_table(prop_data.input_type)
					
			break;

			case 'link' : 
			
				var select = jQuery('<select name = "'+input_name +'  value = "'+value+'">')
			
				input =  jQuery('<select name = "'+input_name +'"></select>')
				
				var context = this;
				
				var selected_attr ="";
					
				if(prop_data.match_type != undefined){
						
					switch (prop_data.match_type){
						
						case 'object_type':
						
							for(var o = 0 ; o <GAME_ASSETS.Object_types.length ;o++){
							
								selected_attr = "";
							
								if(GAME_ASSETS.Object_types[o].getName() == value){
									
									selected_attr = 'selected="selected"';
								
								}
								
								var option = jQuery('<option value = "'+GAME_ASSETS.Object_types[o].getName()+'" '+selected_attr+'>'+GAME_ASSETS.Object_types[o].getName()+'</option>');
								
								jQuery(input).append(option);
								
							}									
						
						break;
						
						case 'projectile':
						
							for(var o = 0 ; o <GAME_ASSETS.Object_types.length ;o++){

								if(GAME_ASSETS.Object_types[o].getModelData().type == 'sprite' && GAME_ASSETS.Object_types[o].getModelData().behaviour == 'projectile'){
								
									selected_attr = "";
								
									if(GAME_ASSETS.Object_types[o].getName() == value){
										
										selected_attr = 'selected="selected"';
									
									}
									
									var option = jQuery('<option value = "'+GAME_ASSETS.Object_types[o].getName()+'" '+selected_attr+'>'+GAME_ASSETS.Object_types[o].getName()+'</option>');
									
								}
								
								jQuery(input).append(option);
								
							}									
						
						break;
						
						case 'animation':
						
							if(output.getModelData().animations != undefined){
							
								for(var a = 0 ; a <output.getModelData().animations.length ;a++){
									
									selected_attr = "";
									
							
									if(output.getModelData().animations[a].name == value){
										
										selected_attr = 'selected="selected"';
									
									}

									var option = jQuery('<option value = "'+output.getModelData().animations[a].name+'"  '+selected_attr+'>'+output.getModelData().animations[a].name+'</option>');
			
									jQuery(input).append(option);
									
								}				

							}
						
						break;
						
						case 'image':
						
							for(var o = 0 ; o <GAME_ASSETS.images.length ;o++){
							
								selected_attr = "";
							
								if(GAME_ASSETS.images[o].name == value){
									
									selected_attr = 'selected="selected"';
								
								}
								
								var option = jQuery('<option value = "'+GAME_ASSETS.images[o].name+'" '+selected_attr+'>'+GAME_ASSETS.images[o].name+'</option>');
								
								jQuery(input).append(option);
								
							}

						break;	
						
						case 'sound':
						
								for(var s in GAME_SOUNDS){
								
									selected_attr = "";
									
							
									if(GAME_SOUNDS[s].name == value){
										
										selected_attr = 'selected="selected"';
									
									}
									
									var option = jQuery('<option value = "'+GAME_SOUNDS[s].name+'" '+selected_attr+'>'+GAME_SOUNDS[s].name+'</option>');
									
									jQuery(input).append(option);
									
								}

						break;						
						
					}
					
					var empty_option = jQuery('<option value = "empty"></option>');
					
					jQuery(input).append(empty_option);
					
				}
				
				jQuery(input).change(function(e) {
				
					value =  e.target.value != 'empty' ? e.target.value : prop_data.default_value;
					
					console.log(value)
						
					if(context.parent == undefined){
						
						output.getModelData()[input_name] = value;
						
					}else{
							
							if(context.parent_index == undefined){
								
								output.getModelData()[context.parent][input_name] = value ;
								
							}else{
								
								output.getModelData()[context.parent][context.parent_index][input_name] = value ;
								
							}
							
						}

					if(linked_GUI != undefined){
						
						linked_GUI.preview_object_type();	
						
					}
					
					//console.log(output.getModelData()[context.parent][input_name])
					console.log(output.getModelData()[input_name])
					console.log(value)
				
				})
			
			break;			
		
		}

		return input;
		
	}
	
	this.update_input = function(){
		
		prop_value_tag.empty();
		
		jQuery(prop_value_tag).append(this.create_input());	
		
	}
	
	this.update_all = function(){
	
		
	
	}
	
	this.check_conditions = function(){
	
		if(prop_data.conditions != undefined && prop_data.conditions.length > 0){
		
			var check = 0;
		
			for (var c = 0 ; c < prop_data.conditions.length ; c++){
						
				if(prop_data.conditions[c].prop && prop_data.conditions[c].value){
				
					if(output.getModelData()[prop_data.conditions[c].prop]==prop_data.conditions[c].value){
						
						check++;
						
					
					}
				
				}else{
				
					return true;
				
				}
			
			}
			
			if(check == prop_data.conditions.length){
			
				return true;
				
			}else{
			
				return false;
			
			}			
		
		
		}else{
			
			return true;
		
		}
	
	}
	
	this.create_jquery_object = function(){
	
		if(this.check_conditions()){
		
			if(depth > 0){
				
				var property_tag = jQuery('<tr class = "sub_prop"></tr>');
				
				var prop_name_tag = jQuery('<td class = "w-50p"> '+input_name+' </td>');
				
				jQuery(property_tag).append(prop_name_tag)
				
				prop_value_tag = jQuery('<td  class = "w-50p"></td>');
				
				jQuery(property_tag).append(prop_value_tag)		

		
				
			}else{
				
				switch (display_type){
					
						case 'drawer':
						
							var property_tag = jQuery('<li class = "property row"></li>');
							
							var prop_name_tag = jQuery('<div class = "prop_name row"> '+input_name+' </div>');
							
							jQuery(property_tag).append(prop_name_tag)
							
							jQuery(prop_name_tag).click(function(e){
								
								jQuery(e.target).next().toggle();
								
							})
							
							prop_value_tag = jQuery('<ul class = "prop_value hidden"></ul>');
							
							jQuery(property_tag).append(prop_value_tag)		
						
						break;
						
						case 'line':
						
							var property_tag = jQuery('<tr class = "line_prop"></tr>');
							
							var prop_name_tag = jQuery('<td class = "w-50p"> '+input_name+' </td>');
							
							jQuery(property_tag).append(prop_name_tag)
							
							prop_value_tag = jQuery('<td  class = "w-50p"></td>');
							
							jQuery(property_tag).append(prop_value_tag)	
						
						
						break;
					
					
				}

				
	
				
			}
			
			jQuery(prop_value_tag).append(this.create_input());		
		
			return property_tag;
		
		}
	
	}
	
	this.create_table = function($type){
	
		input =  jQuery('<ul></ul>');
		
		var table = jQuery('<table ></table>');
		
		jQuery(input).append(table)
	
		var sub_properties = {};
		
		for(var p in structure[$type]){
		
			sub_properties[p] = new Property(output,value,p,structure[$type][p],depth+1)
			sub_properties[p].link_to_GUI(linked_GUI);
			sub_properties[p].parent = input_name;
			jQuery(table).append(sub_properties[p].create_jquery_object())
			
			if(value == prop_data.default_value){
			
				output.getModelData()[input_name][p]= sub_properties[p].getDefaultValue();
				
			
			}
			
		}
		
		return input;

	
	}
	
	this.create_array = function($type){
		
			var input =  jQuery('<ul></ul>');
			
			var context = this;
			
			for (var i in value){
				
				var li =  jQuery('<li class = "array_element" ></li>')
				
				jQuery(input).append(li)
				
				var element_name = jQuery('<div class ="array_element_name">'+ value[i].name+'</div>');
				
				jQuery(li).append(element_name)
				
				jQuery(element_name).click(function(e){
					
					jQuery(e.target).next().toggle();
					
				})				
				
				var table = jQuery('<table ></table>');
				jQuery(li).append(table)
				
			
				var sub_properties = {};
				
				for(var p in structure[$type]){
					
					if(value[i][p] != undefined ){
						
						sub_properties[p] = new Property(output,value[i],p,structure[$type][p],depth+1)
						sub_properties[p].link_to_GUI(linked_GUI)
						sub_properties[p].parent = input_name;
						sub_properties[p].parent_index = i;
						
					}
					
				}
				
				for(var sp in value[i]){
					
					jQuery(table).append(sub_properties[sp].create_jquery_object())

				}
				
				var delete_button = jQuery('<button class ="delete_button" index = "'+i+'">x</button>');
				jQuery(li).append(delete_button)
				jQuery(delete_button).click(function(e){

					output.getModelData()[input_name].splice(jQuery(this).attr('index'),1);
					context.update_input();
					
					if(linked_GUI != undefined){
					
						linked_GUI.preview_object_type();	
					
					}							
					
				})							
				
			}	

			
			var add_button = jQuery('<button class ="add_button">+</button>');
			
			jQuery(input).append(add_button)
			
			jQuery(add_button).click(function(e){

				var new_element = {}
				
				for (var p in structure[$type]){
					
					new_element[p] = structure[$type][p].default_value != undefined ? structure[$type][p].default_value : "";
				}
				
				output.getModelData()[input_name].push(new_element);
				
				if(linked_GUI != undefined){
				
					linked_GUI.preview_object_type();	
				
				}
				context.update_input();
											
			})	
			
			return input;

						
	}
	
	this.update_GUI = function(){
	
	
	}
	
	this.turn_on = function(){
		
		off = false;
	}
	
	this.turn_off = function(){
		
		off = true
	}


}
