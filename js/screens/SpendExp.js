game.SpendExp = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('exp-screen')), -10); // TODO


		me.game.world.addChild(new (me.Renderable.extend({
    init: function(){
        this._super(me.Renderable,'init', [10, 10, 300, 50]);
        this.font = new me.Font("Arial", 46, "white");
    
    },

    draw: function(renderer){
        this.font.draw(renderer.getContext(),"Skill Points F1-F4 To BUY, F5 To Skip", this.pos.x, this.pos.y);
        this.font.draw(renderer.getContext(),"Current EXP" + game.data.exp.toString(), this.pos.x + 100, this.pos.y + 50);   
        this.font.draw(renderer.getContext(),"F1: Increase gold gained" + game.data.exp.toString(), this.pos.x + 200, this.pos.y + 100);  
        this.font.draw(renderer.getContext(),"Increase damage" + game.data.exp.toString(), this.pos.x + 200, this.pos.y + 150);
        this.font.draw(renderer.getContext(),"F3: Increase health" + game.data.exp.toString(), this.pos.x + 200, this.pos.y + 200);
        this.font.draw(renderer.getContext(),"Increase Speed" + game.data.exp.toString(), this.pos.x + 200, this.pos.y + 250);
        this.font.draw(renderer.getContext(),"Increase Attack Speed" + game.data.exp.toString(), this.pos.x + 200, this.pos.y + 300);
    }
    
})));

	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {

	}
});