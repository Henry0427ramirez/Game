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

       this.body.setVelocity(3,20);
//screen will now follow the player
       me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
       
       this.renderable.addAnimation("idle", [78]);
       this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);

       this.renderable.addAnimation("attack", [65 , 66, 67, 68, 69, 70, 71, 72], 80);

       this.renderable.setCurrentAnimation("idle");
	},

	update: function(delta){
	// to make sure if the sure is pressing on the key//adds to the position of my x by adding the velocity defined in setVelocity() and multiplying it by me.timer.tick makes the movement smooth
      if(me.input.isKeyPressed("right")) {
        this.body.vel.x += this.body.accel.x * me.timer.tick;
        this.flipX(true);
       }  
       else{
        this.body.vel.x = 0;
       }
        
        
             if (me.input.isKeyPressed("attack")) {
       	if (!this.renderable.isCurrentAnimation("attack")) {
       		console.log(!this.renderable.isCurrentAnimation("attack"))
// sets animation to attack then once it  over it goes back to idle
       	this.renderable.setCurrentAnimation("attack", "idle");
//once the animation is over the sequence continues from the first animation idle no the one where we last left off from.
       	this.renderable.setAnimationFrame();
       
       	}

       }
       
      else if (this.body.vel.x !==0) {
       if(!this.renderable.isCurrentAnimation("walk")){
        this.renderable.setCurrentAnimation("walk");
       }
   }else{
   	    this.renderable.setCurrentAnimation("idle");
   }

           if (me.input.isKeyPressed("attack")) {
       	if (!this.renderable.isCurrentAnimation("attack")) {
       		console.log(!this.renderable.isCurrentAnimation("attack"))
// sets animation to attack then once it  over it goes back to idle
       	this.renderable.setCurrentAnimation("attack", "idle");
//once the animation is over the sequence continues from the first animation idle no the one where we last left off from.
       	this.renderable.setAnimationFrame();
       
       	}

       }

       this.body.update(delta);
       
       this._super(me.Entity, "update", [delta]);
       return true;
	}



});
/**/
game.PlayerBaseEntity = me.Entity.extend({
    init : function(x, y, settings){
       this._super(me.Entity, 'init', [x, y, {
       image:"tower", 
    	width:100,
    	height:100,
    	spritewidth:"100",
    	spriteheight:"100",
        getShape:function(){
        return (new me.Rect(0, 0, 100, 100)).toPolygon();

       }

    }]);

    this.broken = false;
    this.health = 10;
    this.alwaysUpdate = true;
    this.body.onCollision = this.onCollision.bind(this);

    this.type = "PlayerBaseEntity";

     this.renderable.addAnimation("idle", [0]);
     this.renderable.addAnimation("broken",[1]);
     this.renderable.setCurrentAnimation("idle");

    },


    update:function(delta){
     if(this.health<=0){
     	this.broken = true;
     	this.renderable.setCurrentAnimation("broken");
     }
     this.body.update(delta);

     this._super(me.Entity,"update", [delta]);
     return true;
    },

    onCollision: function(){

    }

}); 
/**/
game.EnemyBaseEntity = me.Entity.extend({
    init : function(x, y, settings){
       this._super(me.Entity, 'init', [x, y, {
       image:"tower", 
    	width:100,
    	height:100,
    	spritewidth:"100",
    	spriteheight:"100",
        getShape:function(){
        return (new me.Rect(0, 0, 100, 100)).toPolygon();
       }

    }]);

    this.broken = false;
    this.health = 10;
    this.alwaysUpdate = true;
    this.body.onCollision = this.onCollision.bind(this);

    this.type = "EnemyBaseEntity";

     this.renderable.addAnimation("idle", [0]);
     this.renderable.addAnimation("broken",[1]);
     this.renderable.setCurrentAnimation("idle");

    },

    update:function(delta){
     if(this.health<=0){
     	this.broken = true;
     	this.renderable.setCurrentAnimation("broken");
     }
     this.body.update(delta);

     this._super(me.Entity,"update", [delta]);
     return true;
    },

    onCollision: function(){

    }

});
