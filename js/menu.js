

var menuState = {

	create : function(){

	
		var nameLabel = game.add.text(80,80,'HELLO');
		
		var startLabel = game.add.text(80,game.world.hieght-80,'press w to start');
		
		var wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
		
		wkey.onDown.addOnce(this.start,this);
		
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
		game.physics.arcade.gravity.y = 200;
		
		GAME_LEVELS[0].start();
		
		this.player = GAME_LEVELS[0].select_player();
		
		console.log(this.player)
		
		//game.physics.arcade.enable(GAME_LEVELS[0].getLevelObjects());
	},
	
	update : function(){


	
		GAME_LEVELS[0].update_collisions();
		GAME_LEVELS[0].update_behaviours();

		this.player.actions.play('IDLE');
		
		if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
			
			this.player.actions.play('WALK_LEFT');			
		
			
		}else if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
			
			this.player.actions.play('WALK_RIGHT')
			
		}
		
		/*if(game.input.keyboard.isDown(Phaser.Keyboard.UP)){
			
			this.player.actions.play('FLY_UP');			
			
		}else if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
			
			this.player.actions.play('FLY_DOWN')
			
		}*/

		if(!game.input.keyboard.isDown(Phaser.Keyboard.UP)
			&&!game.input.keyboard.isDown(Phaser.Keyboard.DOWN)
			&&!game.input.keyboard.isDown(Phaser.Keyboard.LEFT)
			&&!game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)
		){
			
			
			
			
		}
			
		

		
		if(game.input.keyboard.isDown(Phaser.Keyboard.UP)){
			
			this.player.actions.play('JUMP')
			
		}
		
		if(game.input.keyboard.isDown(Phaser.Keyboard.F)){
			
			this.player.actions.play('FIRE')
			
		}
		
		if(game.input.keyboard.isDown(Phaser.Keyboard.D)){
			
			this.player.actions.play('DUPLICATE')
			
		}
		
		
		
			
	},
	
	start:function()
	{
		
		game.state.start('play');
	
	}

}

