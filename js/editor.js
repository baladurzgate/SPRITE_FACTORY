

var editorState = {

	create : function(){
		
		game.stage.backgroundColor = '#FFFFFF';
		
		var style = {font : "15px Arial", fill:"#000000"};
		
		this.GUI.init()
		
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
		game.physics.arcade.gravity.y = 200;
		
		GAME_LEVELS[2].start();
		
	//	display_level_list(200,20,style)
	
		for (var i = 0 ; i<GAME_ASSETS.Object_types.length; i++){
		
			GAME_ASSETS.Object_types[i].fill_pool();
			
		}

	},

	
	GUI : {
		
		
		editor : '',
		panel:{
			menu : '',
			outliner : '',
			object_types:'',
			images:'',
			sounds:'',
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
			
			
			this.build_outliner();
			this.update_asset_list('Object_types');
			this.update_asset_list('sounds');
			this.update_asset_list('images');
			
			this.displayed_game_object = game.add.sprite();
			
			this.diplay_creation_panel();
			
			this.display_menu_panel();
			
			//CREATE A SMALL TILEMAP FOR TESTING
			
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
				
			})		
		
		},
		
		
		build_outliner:function(){
		
			jQuery(this.panel.outliner).empty();
				
			var tab_links_ul = jQuery('<ul></ul>');
			jQuery(this.panel.outliner).append(tab_links_ul)
			
			
			
			for (var asset_type in GAME_ASSETS){
			
				var tab_link_li = jQuery('<li class = "tab_link" name = "'+asset_type+'" ></li>');
				var link_button = jQuery('<button  class = "link_button" asset_type = "'+asset_type+'" >'+asset_type+'</button>');
				jQuery(tab_links_ul).append(tab_link_li )
				jQuery(tab_link_li).append(link_button )
				
				jQuery(link_button).click(function(e){
				
					var asset_type = jQuery(e.target).attr('asset_type');
					
					 jQuery(e.target).attr( "class","link_button tab_active" );
					 
					jQuery('.link_button').each(function(){

						if(jQuery(this).attr('asset_type') != asset_type){

							jQuery(this).attr( "class","link_button tab_link" );

						}

					 });

					jQuery('.tab_content').each(function(){

						if(jQuery(this).attr('id') == asset_type){
						
							jQuery(this).show();
							
							jQuery(this).attr( "class","tab_content tab_active" );

						}else{
						
							jQuery(this).hide();
							
							jQuery(this).attr( "class","tab_content" );
						
						}


					 });
					
					
				})				
		
				
			}
		
			for (var asset_type in GAME_ASSETS){
			
				var tab_content = jQuery('<div id = "'+asset_type+'" class = "tab_content"></div>');
				jQuery(this.panel.outliner).append(tab_content)
				this.panel[asset_type] = tab_content;

			}	

		
		
		},
		
		display_object_types_list:function(){
			
			jQuery(this.panel.object_types).empty();

			var object_types_list = jQuery('<ul></ul>')
			jQuery(this.panel.object_types).append(object_types_list)
			
			var GUI = this;
			
			for (var i = 0 ; i<GAME_ASSETS.Object_types.length; i++){
				
				var object_type_li =jQuery('<li class = "outliner_element_li"></li>')
				var object_type_header =jQuery('<div class = "outliner_element_header" >'+GAME_ASSETS.Object_types[i].getName()+'</div>')
				var object_type_options =jQuery('<div class = "outliner_element_options" ></div>')
				var object_type_select_button =jQuery('<button class = "select_button" name = "'+GAME_ASSETS.Object_types[i].getName()+'"> INSTANCIATE </button>')
				
				jQuery(this.panel.object_types).append(object_type_li)
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

					GAME_ASSETS.Object_types.splice(jQuery(this).attr('index'),1);
					context.display_object_types_list();

				})	
				
			}				

			var add_object_types_button = jQuery('<li><button class ="add_button">+</button></li>');
			
			jQuery(this.panel.object_types).append(add_object_types_button)
			
			jQuery(add_object_types_button).click(function(e){
				
				
			})		
			
		},
		
		update_asset_list:function(_atype){
		
			var atype = _atype;
		
			jQuery(this.panel[atype]).empty();

			var atype_list = jQuery('<ul></ul>')
			jQuery(this.panel[atype]).append(atype_list)
			
			var GUI = this;
			
			
			for (var i = 0 ; i<GAME_ASSETS[atype].length; i++){
			
				var asset_name = GAME_ASSETS[atype][i].name != undefined ? GAME_ASSETS[atype][i].name : GAME_ASSETS[atype][i].getName() != undefined ? GAME_ASSETS[atype][i].getName() : '' ;

				var li =jQuery('<li class = "outliner_element_li"></li>')
				var header =jQuery('<div class = "outliner_element_header" >'+asset_name+'</div>')
				var options =jQuery('<div class = "outliner_element_options" ></div>')
				
				jQuery(this.panel[atype]).append(li);
				
				jQuery(li).append(header);
				
				jQuery(li).append(options);
				
				if(atype == 'images'){
			
					var snapshot =jQuery('<img name = "image_'+i+'"src = "'+GAME_ASSETS[atype][i].path+'">');
					jQuery(li).append(snapshot);
				}
				
				
				if(atype == 'sounds'){
				
					var select_button =jQuery('<button class = "select_button" name = "'+asset_name+'"> PLAY </button>')
					jQuery(options).append(select_button)
					
					jQuery(select_button).click(function(e){
					
						
							GAME_ASSETS[e.target.name].play();
						

					})
					
				}
				
				if(atype == 'Object_types'){
				
					var select_button =jQuery('<button class = "select_button" name = "'+asset_name+'"> INSTANCIATE </button>')
					jQuery(options).append(select_button)
					
					
					jQuery(select_button).click(function(e){
					
						
							GUI.edit_object_type(e.target.name);
						

					})
					
				}
				
				var delete_button = jQuery('<button class ="delete_button" index = "'+i+'">x</button>');
				jQuery(options).append(delete_button)
				var context = this;
				
				jQuery(delete_button).click(function(){

					GAME_ASSETS[atype].splice(jQuery(this).attr('index'),1);
					context.update_asset_list(atype);

				})	
				
			}				

			var add_button = jQuery('<li><button class ="add_button">+</button></li>');
			
			jQuery(this.panel[atype]).append(add_button)
			
			jQuery(add_button).click(function(e){
				
				
			})			
		
		
		
		
		},

		preview_object_type:function(){
			
			//if(this.displayed_game_object != undefined && this.displayed_game_object != "" && this.displayed_game_object != "empty"){

				//this.displayed_game_object.destroy();
				
				//this.displayed_game_object.kill();
			
			//}
			
			//game.world.removeAll();
			
			this.displayed_game_object = this.edited_object_type.instanciate({x:Math.random()*game.width,y:game.length});			
			
		},
	
	
		edit_object_type:function(_objectName){
		
			for (var i = 0 ; i<GAME_ASSETS.Object_types.length; i++){
				
				if(GAME_ASSETS.Object_types[i].getName() == _objectName){
					
					this.edited_object_type= GAME_ASSETS.Object_types[i];
					
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
					
			if (game.input.mousePointer.isDown)
			{
			
				var layer =  GAME_LEVELS[2].getTileMap().layers[0]

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


