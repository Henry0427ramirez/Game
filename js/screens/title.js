game.TitleScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
	   me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('title-screen')), -10); // TODO

        game.data.option1 = new (me.Renderable.extend({
    init: function(){
        this._super(me.Renderable,'init', [270, 240, 300, 50]);
        this.font = new me.Font("Arial", 46, "white");
        me.input.registerPointerEvent('pointerdown', this, this.newgame.bind(this), true);
    },

    draw: function(renderer){
        this.font.draw(renderer.getContext(),"Start Game!", this.pos.x, this.pos.y);
        renderer.strokeRect(this.pos.x, this.pos.y, this.width, this.height, "green");
    },
         
    update: function(dt){
        return true;
    },

    newgame: function(){
        me.input.releasePointerEvent('pointerdown', this);
        me.input.releasePointerEvent('pointerdown', game.data.option1);
        me.save.remove('exp1');
        me.save.remove('exp2');
        me.save.remove('exp3');
        me.save.remove('exp4');
        me.save.add({exp: 0, exp1: 0, exp2: 0, exp3: 0, exp4: 0});
        me.state.change(me.state.NEW);

    }
}));
    me.game.world.addChild(game.data.option1);

    game.data.option2 = new (me.Renderable.extend({
    init: function(){
        this._super(me.Renderable,'init', [380, 340, 250, 50]);
        this.font = new me.Font("Arial", 46, "white");
        me.input.registerPointerEvent('pointerdown', this, this.newgame.bind(this), true);
    },

    draw: function(renderer){
        this.font.draw(renderer.getContext(),"CONTINUE", this.pos.x, this.pos.y);
        renderer.strokeRect(this.pos.x, this.pos.y, this.width, this.height, "blue");
    },
         
    update: function(dt){
        return true;
    },

    newgame: function(){
        game.data.exp = me.save.exp;
        game.data.exp = me.save.exp1;
        game.data.exp = me.save.exp2;
        game.data.exp = me.save.exp3;
        game.data.exp = me.save.exp4;
        me.input.releasePointerEvent('pointerdown', game.data.option1);
        me.input.releasePointerEvent('pointerdown', this);
        me.state.change(me.state.LOAD);

    }

}));

	},
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {

	}
});