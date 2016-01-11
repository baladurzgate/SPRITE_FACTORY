

var assetsState = {

	create : function(){
		
		game.stage.backgroundColor = '#FFFFFF';

		jQuery('#gamDiv').hide();
		
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
			this.diplay_object_properties('dot');
		},
		
		display_game_object_list:function(){
			
			console.log(this.outliner);
			
			var game_objects_list = jQuery(this.outliner).append('<ul></ul>')
			
			var j = 0 ; 
			
			for (var i = 0 ; i<game_objects.length; i++){
				
				var game_object =jQuery(this.outliner).append('<li><button href="" name = "'+game_objects[i].getName()+'"> '+game_objects[i].getName()+'</button> </li>')
				
				jQuery(game_object).click(function(e){
					console.log(e.target.name)
					
				})
				
				
			}				
			
		},
		
		diplay_object_properties:function($objectName){
			
			for (var i = 0 ; i<game_objects.length; i++){
				
				if(game_objects[i].getName() == $objectName){
					
					var object_data = game_objects[i].getData();
					
					var properties = jQuery('<ul id="properties"></ul>')
					jQuery(properties).appendTo(this.display);		
					
					for (var prop  in object_data){
						
						jQuery('#properties').append('<li> '+prop+' : '+object_data[prop]+' </li>')
						
					}				
					
				}
				
				return
				
			}				
						
			
		}
		
	},
	
	update : function(){
		
			
	},
	
	start:function()
	{


	
	},
	

}

function display_game_object_list(x,y,style){
	

	
}

function display_level_list(x,y,style){
	
	
	var level_list_title = game.add.text(x,y,'LEVELS : ',style)

	
	for (var i = 0 ; i<levels.length; i++){
		
		var game_object = game.add.text(level_list_title.x+30,(i*25)+30+level_list_title.y,levels[i].getName(),style)	
		
	}	
	
}




