//this is for the player. a basic setup
/**/game.PlayerEntity = me.Entity.extend ({
	init:function(x , y, settings){
       this._super(me.Entity, 'init', [x, y, {
       	image: "player",
       	width: 64,
       	height: 64,
       	spritewidth: "64",
       	spriteheight: "64",
       	getShape: function(){
       		return(new me.Rect(0, 0, 64, 64)).toPolygon();
       	}
       }]);

       this.body.setVelocity(5,0);
	},

	update: function(delta){
	// to make sure if the sure is pressing on the key
       if(me.input.isKeyPressed("right")) {
//adds to the position of my x by adding the velocity defined in setVelocity() and multiplying it by me.timer.tick makes the movement smooth
        this.body.vel.x += this.body.accel.x * me.timer.tick;
       } 
       else{
        this.body.vel.x = 0;
       }

       this.body.update(delta);
       return true;
	}
});
/**/