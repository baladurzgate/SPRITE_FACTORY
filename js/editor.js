

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
		panel:{
			menu : '',
			outliner : '',
			properties : '',
			creation:''
		},
		displayed_game_object : '',		
		edited_object_type:'',
		grid:'',
		grid_cursor:'',
		tiled_mouse:{x:0,y:0},
		map:'',
		layer:'',
		
		init:function(){
			
			this.editor = jQuery("#editor")
			this.panel.menu = jQuery('#menu')	
			this.panel.outliner = jQuery('#outliner')	
			this.panel.properties = jQuery('#properties')
			this.panel.creation = jQuery('#creation')
			this.display_object_types_list();	
			this.displayed_game_object = game.add.sprite();
			this.diplay_creation_panel();
			this.display_menu_panel();
			
			this.draw_grid(32,32)
			
			this.map = game.add.tilemap();

			this.map.addTilesetImage('32_tileset');

			this.layer = this.map.create('layer1', Math.floor(game.width/32),  Math.floor(game.height/32), 32, 32);
			
			this.map.setCollisionBetween(2, 10);
			
			GAME_LEVELS[2].setTileMap(this.map);
			GAME_LEVELS[2].addLayer(this.layer);
		
		},
		
		display_menu_panel:function(){
		
			var save_game_data_button = jQuery('<button class ="game_object">SAVE</button>');
			
			jQuery(this.panel.menu).append(save_game_data_button)
			
			jQuery(save_game_data_button).click(function(e){
				
				editorState.save_GAME_DATA();
				console.log(GAME_DATA)
				
			})		
		
		},
		
		display_object_types_list:function(){
			
			jQuery(this.panel.outliner).empty();

			var GAME_OBJECT_TYPES_list = jQuery('<ul></ul>')
			jQuery(this.panel.outliner).append(GAME_OBJECT_TYPES_list)
			
			var GUI = this;
			
			for (var i = 0 ; i<GAME_OBJECT_TYPES.length; i++){
				
				var object_type_li =jQuery('<li class = "object_type_li"></li>')
				var object_type_header =jQuery('<div class = "object_type_header" >'+GAME_OBJECT_TYPES[i].getName()+'</div>')
				var object_type_options =jQuery('<div class = "object_type_options" ></div>')
				
				var object_type_select_button =jQuery('<button class = "select_button" name = "'+GAME_OBJECT_TYPES[i].getName()+'"> INSTANCIATE </button>')
				jQuery(this.panel.outliner).append(object_type_li)
				jQuery(object_type_li).append(object_type_header)
				jQuery(object_type_li).append(object_type_options)
				jQuery(object_type_options).append(object_type_select_button)
				
				jQuery(object_type_select_button).click(function(e){
					GUI.edit_object_type(e.target.name);
				})
				
				var object_type_delete_button = jQuery('<button class ="delete_button" index = "'+i+'">x</button>');
				jQuery(object_type_options).append(object_type_delete_button)
				var context = this;
				jQuery(object_type_delete_button).click(function(){

					GAME_OBJECT_TYPES.splice(jQuery(this).attr('index'),1);
					context.display_object_types_list();

				})	
				
			}		

			var add_game_object_button = jQuery('<li><button class ="add_button">+</button></li>');
			
			jQuery(this.panel.outliner).append(add_game_object_button)
			
			jQuery(add_game_object_button).click(function(e){
				
				
			})		
			
		},
		
		preview_object_type:function(){
		
			console.log(this.displayed_game_object);
			
			//if(this.displayed_game_object != undefined && this.displayed_game_object != "" && this.displayed_game_object != "empty"){

				//this.displayed_game_object.destroy();
				
				//this.displayed_game_object.kill();
			
			//}
			
			//game.world.removeAll();
			
			this.displayed_game_object = this.edited_object_type.instanciate({x:Math.random()*game.width,y:game.length});			
			
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
		
		diplay_creation_panel: function(){
		
			this.panel.creation.display = 'block';
			
		},
		
		display_properties:function(){
			
			jQuery(this.panel.properties).empty();
	
			if(this.edited_object_type!= undefined){
				
				var object_type_data = this.edited_object_type.getModelData();

				for(var p in this.edited_object_type.properties){
					
					this.edited_object_type.properties[p].link_to_GUI(this);
					
					jQuery(this.panel.properties).append(this.edited_object_type.properties[p].create_jquery_object())
					
				}
			
			}

		},
		
		draw_grid: function(tile_width,tile_height){
		
			if(this.grid == ''){
			
				this.grid = game.add.graphics(0, 0);
				this.grid.lineStyle(1, 0xAAAAAA, 1);
			
			}
			
			this.grid.moveTo(0,0);
			
			var horizontal_lines = Math.round(game.height/tile_height);
			var vertical_lines = Math.round(game.width/tile_width);
			
			for (var h = 0 ; h < horizontal_lines ; h ++){
				this.grid.moveTo(0,h*tile_height);
				this.grid.lineTo(game.width,h*tile_height);
			
			}
			
			for (var v = 0 ; v < vertical_lines ; v ++){
			
				this.grid.moveTo(v*tile_width,0);
				this.grid.lineTo(v*tile_width,game.height);
					
			}			
			
		},
		
		update_grid_cursor:function(){
		
			if(this.grid_cursor == ''){
		
				this.grid_cursor = game.add.graphics(0, 0);
				this.grid_cursor.lineStyle(2, 0x0000FF, 1);
				this.grid_cursor.drawRect(0, 0, 32, 32);				
			}
			
			this.grid_cursor.x = this.tiled_mouse.x;
			this.grid_cursor.y = this.tiled_mouse.y

		},
		
		update_tiled_mouse:function(){
		
			this.tiled_mouse.x = Math.floor((game.input.mousePointer.x)/32)*32;
			this.tiled_mouse.y = Math.floor((game.input.mousePointer.y)/32)*32;
			
			/*if(game.input.activePointer.isDown){
				
				var obstacle = game.add.sprite(this.tiled_mouse.x, this.tiled_mouse.y,null);
				console.log(obstacle);
				obstacle.anchor.set(1, 1);
				obstacle.width = obstacle.height = 32;
				var square = game.add.graphics(0, 0);
				square.beginFill(0xAAAAAA);
				square.drawRect(0,0, 32, 32);			
				square.endFill();				
				obstacle.addChild(square)
				game.physics.arcade.enable(obstacle);
				obstacle.body.width = 32;
				obstacle.body.height = 32;
			}*/
			
			//var currentTile = game.math.snapToFloor(pointer.x, 32) / 32;
					
			if (game.input.mousePointer.isDown)
			{
			
				var layer =  GAME_LEVELS[2].getTileMap().layers[0]
				console.log(layer);
				GAME_LEVELS[2].getTileMap().putTile(9,this.layer.getTileX(this.grid_cursor.x), this.layer.getTileY(this.grid_cursor.y), layer.name);
			}

		
		},
		
		update_output_info : function(_text){
		
		
		}
		
	},
	
	update : function(){
	
		this.GUI.update_tiled_mouse();
		this.GUI.update_grid_cursor();
	
		GAME_LEVELS[2].update_collisions();
		GAME_LEVELS[2].update_behaviours();
			
	},
	
	render:function() {
	
		for (var i = 0 ; i < GAME_LEVELS[2].getLevelObjects().length  ;i++){
		
			game.debug.body(GAME_LEVELS[2].getLevelObjects()[i]);
		
		}
		
	},
	
	save_GAME_DATA:function(){
	
		var data = {
			GD : JSON.stringify(GAME_DATA,null, "\t")
		}
		
		jQuery.post('php/write_game_data.php', data, function(response) {
			console.log(response)
		});

	},
	

	

}


