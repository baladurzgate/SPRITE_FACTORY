var playState = {

	create: function(){
	
		this. keyboard = game.input.keyboard;
		
		this.player = game.add.sprite(16,16,'player');
		game.physics.enable(this.player,Phaser.Physics.ARCADE);
		
		
		this.win = game.add.sprite(256,256,'win')
		game.physics.enable(this.win,Phaser.Physics.ARCADE);
	
	
	},
	
	update: function(){
	
		game.physics.arcade.overlap(this.player, this.win,this.win,null,this);
	
	
	},
	
	Win: function (){
		
		game.state.start('win');
	
	
	}


}