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

       this.body.setVelocity(4,20);
//keeps track of the direction your character is going
       this.facing = "right";
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
        this.facing = "right";
        this.flipX(true);
       }  
// to help my player left and right
       else if (me.input.isKeyPressed("left")){
           this.body.vel.x -= this.body.accel.x * me.timer.tick;    
           this.facing = "left"; 
           this.flipX (false);
      }else{
      	this.body.vel.x = 0;
      } 
// so my player will now jump.
      if (me.input.isKeyPressed("jump") && !this.body.jumping && !this.body.falling) {
      	this.body.jumping = true;
      	this.body.vel.y -= this.body.accel.y * me.timer.tick;
      }
//to make my player attack so he can damage the towers
            if (me.input.isKeyPressed("attack")) {
       	if (!this.renderable.isCurrentAnimation("attack")) {
       		console.log(!this.renderable.isCurrentAnimation("attack"))
// sets animation to attack then once it  over it goes back to idle
       	this.renderable.setCurrentAnimation("attack", "idle");
//once the animation is over the sequence continues from the first animation idle no the one where we last left off from.
       	this.renderable.setAnimationFrame();
       	}
       }

      me.collision.check(this, true, this.collideHandler.bind(this), true);

       this.body.update(delta);
       
       this._super(me.Entity, "update", [delta]);
       return true;
	},
/**/
     collideHandler: function (response) {
     	if (response.b.type=== 'EnemyBaseEntity') {
        var ydif = this.pos.y - response.b.pos.y;
        var xdif = this.pos.x -response.b.pos.x;

        console.log("xdif " + xdif + "ydif " + ydif);

         if(ydif<-40){
            this.body.falling = false;
            this.body.vel.y = -1;
          }

        else if (xdif >-35 && this.facing=== 'right' && (xdif<0)) {
            this.body.vel.x = 0;
            this.pos.x = this.x -1;
          }  
        else if(xdif<70 && this.facing==='left' && (xdif>0)){
            this.body.vel.x = 0;
            this.pos.x = this.pos.x +1;
          }
     	}
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
