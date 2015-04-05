//this is for the player. a basic setup
/**/game.PlayerEntity = me.Entity.extend ({
	init:function(x , y, settings){
      this.setSuper(x, y);
      this.setPlayerTimers();
      this.setAttributes();
      this.type = "PlayerEntity";
      this.setFlags();
//screen will now follow the player
      me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

      this.addAnimation();
       
      this.renderable.setCurrentAnimation("idle");
	},

  setSuper: function(x, y){
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
  },

  setPlayerTimers: function(){
      this.now = new Date().getTime();
      this.lastHit = this.now;
      this.lastSpear = this.now;
      this.lastAttack = new Date().getTime(); //havent used it yet.

  },

  setAttributes: function(){
      this.health = game.data.playerHealth;
      this.body.setVelocity(game.data.playerMoveSpeed,20);
      this.attack = game.data.playerAttack; 
  },

  setFlags: function(){
      //keeps track of the direction your character is going
     this.facing = "right";
     this.dead = false;
     this.attacking = false;
  },

  addAnimation: function(){
      this.renderable.addAnimation("idle", [78]);
      this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);

      this.renderable.addAnimation("attack", [65 , 66, 67, 68, 69, 70, 71, 72], 80);
  },

	update: function(delta){
		  this.now = new Date().getTime();
      this.dead = this.checkIfDead();
      this.checkKeyPressedAndMove();
      this.checkAbilityKeys();
      this.setAnimation();
      me.collision.check(this, true, this.collideHandler.bind(this), true);
      this.body.update(delta);    
      this._super(me.Entity, "update", [delta]);
      return true;

	},

  checkIfDead: function(){

  // to make sure if the sure is pressing on the key//adds to the position of my x by adding the velocity defined in setVelocity() and multiplying it by me.timer.tick makes the movement smooth
    if (this.health <= 0) {
    return true;
    }
  },

  checkKeyPressedAndMove: function(){
    //binds the key
    if(me.input.isKeyPressed("right")) {
      this.moveRight();
      }  
// to help my player left and right
    else if (me.input.isKeyPressed("left")){
      this.moveLeft();
      } 
    else{
      this.body.vel.x = 0;
      } 
// so my player will now jump.
    if (me.input.isKeyPressed("jump") && !this.body.jumping && !this.body.falling) {
      this.jump();
      }
      this.attacking = me.input.isKeyPressed("attack");
  },

  moveRight: function(){
        //adds to the position of my x by the velocity defined above in setVelocity() and multiplying it by me.timer.tick me.timer.tick makes the movement look smooth
      this.body.vel.x += this.body.accel.x * me.timer.tick;
      this.facing = "right";
      this.flipX(true);
      // for my player to move right 
  },

  moveLeft: function(){
    //for my player to move left
      this.body.vel.x -= this.body.accel.x * me.timer.tick;    
      this.facing = "left"; 
      this.flipX (false);
  },

  jump: function(){
      this.body.jumping = true;
      this.body.vel.y -= this.body.accel.y * me.timer.tick;
  },

  checkAbilityKeys: function(){
    if(me.input.isKeyPressed("skill1")){
        //this.speedBurst();
    }
    else if(me.input.isKeyPressed("skill2")){
        //this.eatCreep();
    }
    else if(me.input.isKeyPressed("skill3")){
        this.throwSpear();
    }
  },

  throwSpear: function(){
    if(this.lastSpear >= game.data.spearTimer && game.data.ability3 >= 0){
      this.lastSpear = this.now;
      var spear = me.pool.pull("spear", this.pos.x, this.pos.y, {});
      me.game.world.addChild(spear, 10);
    }
  },

  setAnimation: function(){
      //to make my player attack so he can damage the towers
    if (this.attacking) {
    if (!this.renderable.isCurrentAnimation("attack")) {
//console.log(!this.renderable.isCurrentAnimation("attack"))
// sets animation to attack then once it  over it goes back to idle
      this.renderable.setCurrentAnimation("attack", "idle");
//once the animation is over the sequence continues from the first animation idle no the one where we last left off from.
    this.renderable.setAnimationFrame();
      }
    }

    else if (this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")){
    if (!this.renderable.isCurrentAnimation("walk")){
      this.renderable.setCurrentAnimation("walk");
      }
    }
    else if (!this.renderable.isCurrentAnimation("attack")){
      this.renderable.setCurrentAnimation("idle");
    }
  },


	loseHealth: function(damage){
        this.health = this.health - damage;
      //  console.log(this.health);
	},
/**/
  collideHandler: function(response) {
    if (response.b.type=== 'EnemyBaseEntity') {
      this.collisionEnemyBase(response);
     	}
    else if(response.b.type === 'EnemyCreep'){
      this.collisionEnemyCreep(response);
     	}
  },

  collisionEnemyBase: function(response){
      var ydif = this.pos.y - response.b.pos.y;
      var xdif = this.pos.x -response.b.pos.x;

    if(ydif<-40 && xdif< 70 && xdif>-35){
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
    if (!this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer) {
      console.log("tower Hit");
      this.lastHit = this.now;
      response.b.loseHealth(game.data.playerAttack);
    } 
  },

  collisionEnemyCreep: function(response){
      var xdif = this.pos.x - response.b.pos.x;
      var ydif = this.pos.y - response.b.pos.y;
      
      this.stopMovement(xdif);

    if(this.checkAttack(xdif, ydif)){
      this.hitCreep(response);
    };

  },

  stopMovement: function(xdif){
    if(xdif>0){
    if (this.facing==="left"){
      this.body.vel.x = 0;
      }
    }
    else{
    if (this.facing=== "right"){
      this.body.vel.x = 0;
      }
    }
  },

  checkAttack: function(xdif, ydif){

    if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.playerAttackTimer && (Math.abs(ydif) <=40) && ((xdif>0) && this.facing==="left") || ((xdif<0) && this.facing==="right")){
      this.lastHit = this.now;
//if the creeps health is less than our attack execute code in the if statement.
    return true;
    }
    return false;
  },

  hitCreep: function(response){
    if(response.b.health <= game.data.playerAttack){
//add one gold for each creep kill
      game.data.gold += 1; 
      console.log("Current gold: " + game.data.gold);
    }
      response.b.loseHealth(game.data.playerAttack);
  }

});
/**/
 


