game.MiniMap = me.Entity.extend({
	init: function(x, y, settings){
		this._super(me.Entity, "init", [x, y, {
			image: "minimap" , 
			width: 73,
			height: 45,
			spritewidth: "73",
			spriteheight: "45",
			getShape: function(){
				return (new me.Rect(0 , 0, 73, 45)).toPolygon();
			}
		}]);
   		this.floating = true;
	}
});

