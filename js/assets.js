

var assetsState = {

	create : function(){
		
		game.stage.backgroundColor = '#FFFFFF';

		jQuery('#gamDiv').hide();
		
		console.log(game_objects)
		console.log(levels)		
		
		var style = {font : "15px Arial", fill:"#000000"};
		
		display_game_object_list(20,20,style)
		display_level_list(200,20,style)
		
		
		
	},
	
	update : function(){
		
			
	},
	
	start:function()
	{


	
	},
	

}

function display_game_object_list(x,y,style){
	
	
	//var game_object_list_title = game.add.text(x,y,'GAME_OBJECTS : ',style)
	
	var game_objects_list = jQuery('body').append('<ul> GAME_OBJECTS : </ul>')
	
	var j = 0 ; 
	
	for (var i = 0 ; i<game_objects.length; i++){
		
		var game_object = game_objects_list.append('<li> '+game_objects[i].getName()+' </li>')
		
		//game_objects[i].copy({x:game_object_list_title.x+30,y:(i*25)+30+game_object_list_title.y});
		
		//var game_object_name = game.add.text(game_object_list_title.x+30,(i*25)+30+game_object_list_title.y,game_objects[i].getName(),style)
		//var game_object_name = game.add.text(game_object_list_title.x+30,(i*25)+30+game_object_list_title.y,game_objects[i].getName(),style)
		
		var properties = game_object.append('<ul>  </ul>')
		
		var object_data = game_objects[i].getData();
		
		for (var prop  in object_data){
			
			properties.append('<li> '+prop+' : '+object_data[prop]+' </li>')
			//var prop_name = game.add.text(game_object_name.x+30,(j*25)+30+game_object_name.y,prop+" : ",style)
			//var prop_value = game.add.text(prop_name.x+prop_name.width,(j*25)+30+game_object_name.y,object_data[prop],style)
			
			//console.log(prop)
			//console.log(object_data[prop])
			
			j++;
			
		}
		
	}	
	
}

function display_level_list(x,y,style){
	
	
	var level_list_title = game.add.text(x,y,'LEVELS : ',style)

	
	for (var i = 0 ; i<levels.length; i++){
		
		var game_object = game.add.text(level_list_title.x+30,(i*25)+30+level_list_title.y,levels[i].getName(),style)	
		
	}	
	
}




