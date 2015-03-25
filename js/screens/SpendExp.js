game.SpendExp = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('exp-screen')), -10); // TODO

        me.input.bindKey(me.KEY.F1, "F1");
        me.input.bindKey(me.KEY.F2, "F2");
        me.input.bindKey(me.KEY.F3, "F3");
        me.input.bindKey(me.KEY.F4, "F4");
        me.input.bindKey(me.KEY.F5, "F5");

		me.game.world.addChild(new (me.Renderable.extend({
    init: function(){
        this._super(me.Renderable,'init', [10, 10, 300, 50]);
        this.font = new me.Font("Arial", 26, "white");
    
    },

    draw: function(renderer){
        this.font.draw(renderer.getContext(),"Skill Points F1-F4 To BUY, F5 To Skip", this.pos.x, this.pos.y);
        this.font.draw(renderer.getContext(),"Current EXP" + game.data.exp.toString(), this.pos.x + 100, this.pos.y + 50);   
        this.font.draw(renderer.getContext(),"F1:Increase gold gained: " + game.data.exp1.toString() + " COST: " + ((game.data.exp1 + 1) * 10), this.pos.x, this.pos.y + 100);  
        this.font.draw(renderer.getContext(),"F2:Increase damage: " + game.data.exp.toString(), this.pos.x, this.pos.y + 150);
        this.font.draw(renderer.getContext(),"F3:Increase health: " + game.data.exp.toString(), this.pos.x, this.pos.y + 200);
        this.font.draw(renderer.getContext(),"F4:Increase Speed: " + game.data.exp.toString(), this.pos.x, this.pos.y + 250);
    }
    
})));

    this.handler = me.event.subsribe(me.event.KEYDOwn, function (action, keyCode, edge){
        if(action === "F1"){

        }
        else if(action === "F2"){
          
        }
        else if(action === "F3"){
          
        }
        else if(action === "F4"){
          
        }
        else if(action === "F5"){
            me.state.change(me.state.play);
        }
    });

	}, 
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
        me.input.bindKey(me.KEY.F1, "F1");
        me.input.bindKey(me.KEY.F2, "F2");
        me.input.bindKey(me.KEY.F3, "F3");
        me.input.bindKey(me.KEY.F4, "F4");
        me.input.bindKey(me.KEY.F5, "F5");       

	}
});
