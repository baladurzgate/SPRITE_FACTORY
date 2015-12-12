

var menuState = {

	create : function(){

	
		var nameLabel = game.add.text(80,80,'HELLO');
		
		var startLabel = game.add.text(80,game.world.hieght-80,'press w to start');
		
		var wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
		
		wkey.onDown.addOnce(this.start,this);
		
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
		game.physics.arcade.gravity.y = 200;
		
		levels[0].start();
		
		//game.physics.arcade.enable(levels[0].getLevelObjects());
	},
	
	update : function(){
			
		levels[0].update_collisions();
		levels[0].update_behaviours();
			
	},
	
	start:function()
	{
		
		game.state.start('play');
	
	}

}