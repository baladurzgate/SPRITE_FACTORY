function Property ($object,$object_data,$name,$prop_data,$depth){
	
	var output_object = $object;
	
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
	
	var prop_value = jQuery('<ul class = "prop_value"></ul>');
	
	this.link_to_GUI = function($GUI){
		
		linked_GUI = $GUI;
		
	}
	
	this.create_input = function(){
		
		var input = jQuery('<input name = "'+input_name +'"type = "text" value = "'+value+'">');
		
		switch(prop_data.input_type){
		
			case 'string' : 
					
					input =  jQuery('<input name = "'+input_name+'"type = "text" value = "'+value+'">')
					
					var context = this;
					
					jQuery(input).change(function(e) {

						if(context.parent == undefined){
							
							output_object.getModelData()[input_name] = e.target.value;
							
						}else{
							
							if(context.parent_index == undefined){
								
								output_object.getModelData()[context.parent][input_name] = e.target.value;
								
							}else{
								
								output_object.getModelData()[context.parent][context.parent_index][input_name] = e.target.value;
								
							}
							
							
						}

						if(linked_GUI != undefined){
							
							linked_GUI.preview_game_object();	
							
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
							
							output_object.getModelData()[input_name] = e.target.checked;
							
						}else{
							
							if(context.parent_index == undefined){
								
								output_object.getModelData()[context.parent][input_name] = e.target.checked;
								
							}else{
								
								output_object.getModelData()[context.parent][context.parent_index][input_name] = e.target.checked;
								
							}
							
							
						}
						if(linked_GUI != undefined){
							
							linked_GUI.preview_game_object();	
							
						}
	
					})

			
			break;
			
			
			case 'int' : 
			
					input =  jQuery('<input name = "'+input_name+'"type = "number" step = "'+prop_data.step+'" min = "'+prop_data.min+'" max = "'+prop_data.max+'" value = "'+value+'">')
					
					var context = this;
					
					jQuery(input).change(function(e) {

						if(context.parent == undefined){
							
							output_object.getModelData()[input_name] = parseInt(e.target.value);
							
						}else{
							
							if(context.parent_index == undefined){
								
								output_object.getModelData()[context.parent][input_name] = parseInt(e.target.value);
								
							}else{
								
								output_object.getModelData()[context.parent][context.parent_index][input_name] = parseInt(e.target.value);
								
							}
							
							
						}

						if(linked_GUI != undefined){
							
							linked_GUI.preview_game_object();	
							
						}
	
					})

			
			break;
			
			
			case 'number' : 
			

					
					input =  jQuery('<input name = "'+input_name+'"type = "number" step = "'+prop_data.step+'" min = "'+prop_data.min+'" max = "'+prop_data.max+'" value = "'+value+'">')
					
					var context = this;
					
					jQuery(input).change(function(e) {
						
						if(context.parent == undefined){
							
							output_object.getModelData()[input_name] = parseFloat(e.target.value);
							
						}else{
							
							if(context.parent_index == undefined){
								
								output_object.getModelData()[context.parent][input_name] = parseFloat(e.target.value);
								
							}else{
								
								output_object.getModelData()[context.parent][context.parent_index][input_name] = parseFloat(e.target.value);
								
							}
							
							
						}

						if(linked_GUI != undefined){
							
							linked_GUI.preview_game_object();	
							
						}
	
					})

			
			break;
			
			case 'point' : 
			
					var input = jQuery('<table ></table>');
			
					var coords =  jQuery('<tr><td></td></tr>')
					
					var inputx = jQuery('<input id = "'+input_name+'_x" name = "'+input_name+'"type = "number" step = "'+prop_data.step+'" min = "'+prop_data.min+'" max = "'+prop_data.max+'" value = "'+value.x+'">')
					var inputy = jQuery('<input id = "'+input_name+'_y" name = "'+input_name+'"type = "number" step = "'+prop_data.step+'" min = "'+prop_data.min+'" max = "'+prop_data.max+'" value = "'+value.y+'">')
					
					jQuery(input).append(coords);
					jQuery(coords).append(inputx);
					jQuery(coords).append(inputy);
					
					var context = this;

					jQuery(inputx).change(function(e) {

						if(context.parent == undefined){
							
							output_object.getModelData()[input_name].x = e.target.value;
							
						}else{
							
							if(context.parent_index == undefined){
								
								output_object.getModelData()[context.parent][input_name].x = e.target.value;
								
							}else{
								
								output_object.getModelData()[context.parent][context.parent_index][input_name].x = e.target.value;
								
							}
							
							
						}

						if(linked_GUI != undefined){
							
							linked_GUI.preview_game_object();	
							
						}
				
							
					})
					
					jQuery(inputy).change(function(e) {
							
						if(context.parent == undefined){
							
							output_object.getModelData()[input_name].y = e.target.value;
							
						}else{
							
							if(context.parent_index == undefined){
								
								output_object.getModelData()[context.parent][input_name].y = e.target.value;
								
							}else{
								
								output_object.getModelData()[context.parent][context.parent_index][input_name].y = e.target.value;
								
							}
							
							
						}
						if(linked_GUI != undefined){
							
							linked_GUI.preview_game_object();	
							
						}
				
							
					})
			
			break;

			case 'select' : 
			
				var select = jQuery('<select name = "'+input_name +'  value = "'+value+'">')
			
				input =  jQuery('<select name = "'+input_name +'"></select>')
				
				if(prop_data.options != undefined){
					
					for(var o = 0 ; o < prop_data.options.length;o++){
						
						var option = jQuery('<option value = "'+prop_data.options[o]+'">'+prop_data.options[o]+'</option>');
						
						jQuery(input).append(option);
						
					}					
					
				}
				
				var context = this;
				
				jQuery(input).change(function(e) {
						
					if(context.parent == undefined){
						
						output_object.getModelData()[input_name] = e.target.value;
						
					}else{
							
							if(context.parent_index == undefined){
								
								output_object.getModelData()[context.parent][input_name] = e.target.value;
								
							}else{
								
								output_object.getModelData()[context.parent][context.parent_index][input_name] = e.target.value;
								
							}
							
							
						}

					if(linked_GUI != undefined){
						
						linked_GUI.preview_game_object();	
						
					}
			
						
				})

			
			break;
			
			case 'file' : 
			

					
					input =  jQuery('<input name = "'+input_name+'"type = "file" value = "'+value+'">')
					
					jQuery(input).change(function(e) {

						output_object.changeData(e.target.name,e.target.value)

						if(linked_GUI != undefined){
							
							linked_GUI.preview_game_object();	
							
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
								
								sub_properties[p] = new Property(output_object,value[i],p,structure.image[p],depth+1)
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
					
					input = input =  this.create_array(prop_data.input_type)	
					
				}
			
			break;
			
			case 'animation' : 

				if(prop_data.isArray){
					
					input =  input =  this.create_array(prop_data.input_type)	
					
				}
			
			break;	
			
			case 'physical' : 
					
					input =  jQuery('<ul></ul>');
					
					var table = jQuery('<table ></table>');
					
					jQuery(input).append(table)
				
					var sub_properties = {};
					
					for(var p in structure.physical){
						
						if(value[p] != undefined ){
							
							sub_properties[p] = new Property(output_object,value,p,structure.physical[p],depth+1)
							sub_properties[p].link_to_GUI(linked_GUI);
							sub_properties[p].parent = input_name;
						}
						
					}
					
					for(var sp in value){
						
						jQuery(table).append(sub_properties[sp].create_jquery_object())

					}
			
			break;
			
			case 'action' : 

				if(prop_data.isArray){
					
					input =  this.create_array(prop_data.input_type)	
					
				}
			
			break;	
			
			case 'pattern' : 

				if(prop_data.isArray){
					
					input =  this.create_array(prop_data.input_type)	
					
				}
				
			break;
			

			case 'sequence' : 
			
					
				input =  jQuery('<input name = "'+input_name+'"type = "text" value = "'+value+'">')
				
				var context = this;
				
				
				jQuery(input).change(function(e) {
						
					var array = e.target.value.split(',')

					if(context.parent == undefined){
						
						output_object.getModelData()[input_name] = array;
						
					}else{
						
						if(context.parent_index == undefined){
							
							output_object.getModelData()[context.parent][input_name] = array;
							
						}else{
							
							output_object.getModelData()[context.parent][context.parent_index][input_name] = array;
							
						}
						
						
					}

					if(linked_GUI != undefined){
						
						linked_GUI.preview_game_object();	
						
					}

				})
				

			
			break;				
			
			case 'movement' : 
			
					input =  jQuery('<ul></ul>');
					
					var table = jQuery('<table ></table>');
					
					jQuery(input).append(table)
				
					var sub_properties = {};
					
					for(var p in structure.movement){
						
						if(value[p] != undefined ){
							
							sub_properties[p] = new Property(output_object,value,p,structure.movement[p],depth+1)
							sub_properties[p].link_to_GUI(linked_GUI);
							sub_properties[p].parent = input_name;
							sub_properties[p].parent_index = i;
						}
						
					}
					
					for(var sp in value){
						
						jQuery(table).append(sub_properties[sp].create_jquery_object())

					}
					
									
			
			break;
			
			case 'attack' : 
			
					input =  jQuery('<ul></ul>');
					
					var table = jQuery('<table ></table>');
					
					jQuery(input).append(table)
				
					var sub_properties = {};
					
					for(var p in structure.attack){
						
						if(value[p] != undefined ){
							
							sub_properties[p] = new Property(output_object,value,p,structure.attack[p],depth+1)
							sub_properties[p].link_to_GUI(linked_GUI);
							sub_properties[p].parent = input_name;
							sub_properties[p].parent_index = i;
						}
						
					}
					
					for(var sp in value){
						
						jQuery(table).append(sub_properties[sp].create_jquery_object())

					}
					
			break;

			case 'link' : 
			
				var select = jQuery('<select name = "'+input_name +'  value = "'+value+'">')
			
				input =  jQuery('<select name = "'+input_name +'"></select>')
				
				var context = this;
					
				if(prop_data.match_type != undefined){
						
					switch (prop_data.match_type){
						
						case 'game_object':
						
							for(var o = 0 ; o <game_objects.length ;o++){
								
								var option = jQuery('<option value = "'+game_objects[o].getName()+'">'+game_objects[o].getName()+'</option>');
								
								jQuery(input).append(option);
								
							}									
						
						break;
						
						case 'projectile':
						
							for(var o = 0 ; o <game_objects.length ;o++){

								if(game_objects[o].getModelData().behaviour == 'projectile'){
									
									var option = jQuery('<option value = "'+game_objects[o].getName()+'">'+game_objects[o].getName()+'</option>');
									
								}
								
								jQuery(input).append(option);
								
							}									
						
						break;
						
						case 'animation':
						
							if(output_object.getModelData().animations != undefined){
							
								for(var a = 0 ; a <output_object.getModelData().animations.length ;a++){

									var option = jQuery('<option value = "'+output_object.getModelData().animations[a].name+'">'+output_object.getModelData().animations[a].name+'</option>');
			
									jQuery(input).append(option);
									
								}				

							}
						
						break;
						
						case 'sound':
						
								for(var s in game_sounds){
									
									var option = jQuery('<option value = "'+game_sounds[s].name+'">'+game_sounds[s].name+'</option>');
									jQuery(input).append(option);
									
								}

						break;						
						
					}
					
				}
				

				
				jQuery(input).change(function(e) {
						
					if(context.parent == undefined){
						
						output_object.getModelData()[input_name] = e.target.value;
						
					}else{
							
							if(context.parent_index == undefined){
								
								output_object.getModelData()[context.parent][input_name] = e.target.value;
								
							}else{
								
								output_object.getModelData()[context.parent][context.parent_index][input_name] = e.target.value;
								
							}
							
						}

					if(linked_GUI != undefined){
						
						linked_GUI.preview_game_object();	
						
					}
				
				})
			
			break;			
		
		}

		return input;
		
	}
	
	this.update_input = function(){
		
		prop_value.empty();
		
		jQuery(prop_value).append(this.create_input());	
		
	}
	
	this.create_jquery_object = function(){
		
		if(depth > 0){
			
			var property = jQuery('<tr class = ""></tr>');
			
			var prop_name = jQuery('<td class = ""> '+input_name+' </td>');
			
			jQuery(property).append(prop_name)
			
			prop_value = jQuery('<td  class = ""></td>');
			
			jQuery(property).append(prop_value)		

	
			
		}else{
			
			var property = jQuery('<li class = "property"></li>');
			
			var prop_name = jQuery('<div class = "prop_name"> '+input_name+' </div>');
			
			jQuery(property).append(prop_name)
			
			jQuery(prop_name).click(function(e){
				
				jQuery(e.target).next().toggle();
				
			})
			
			prop_value = jQuery('<ul class = "prop_value"></ul>');
			
			jQuery(property).append(prop_value)			
			
		}
		
		jQuery(prop_value).append(this.create_input());		
	
		return property;
	
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
						
						sub_properties[p] = new Property(output_object,value[i],p,structure[$type][p],depth+1)
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

					output_object.getModelData()[input_name].splice(jQuery(this).attr('index'),1);
					context.update_input();
					
					if(linked_GUI != undefined){
					
						linked_GUI.preview_game_object();	
					
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
				
				console.log(new_element)
				
				output_object.getModelData()[input_name].push(new_element);
				
				if(linked_GUI != undefined){
				
					linked_GUI.preview_game_object();	
				
				}
				context.update_input();
											
			})	
			
			return input;

						
	}
	
	this.turn_on = function(){
		
		off = false;
	}
	
	this.turn_off = function(){
		
		off = true
	}


}




							
							/*var sub_input = jQuery('<tr><td>'+sub_prop+'</td><td><input id = "'+input_name+i+sub_prop+'" name = "'+sub_prop+'" type = "text" value = "'+value[i][sub_prop]+'"></td></tr>');
							jQuery(sub_properties).append(sub_input)
							
							jQuery(sub_input).change(function(e) {
							/*		
								console.log(e.target);
								output_object.changeData(e.target.name,e.target.value)

								if(linked_GUI != undefined){
									
									linked_GUI.preview_game_object();	
									
								}
						
									
							})*/
							
