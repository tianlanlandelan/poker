/**
 * 显示其他玩家的明牌
 */
class PukerVerticalContainer extends egret.DisplayObjectContainer{
	/**
	 * 竖着排列的牌，用于显示对手的明牌
	 * arrays 扑克id的数组
	 * x 扑克的x坐标
	 */
	public constructor(arrays:Array<Poker>,isLeft:boolean) {
		super();
		let pc = RES.getRes("layout_json").pukerVerticalContainer;
		
		if(isLeft){
			this.x = pc.leftX;
		}else{
			this.x = pc.rightX;
		}
		this.y = pc.y;
		this.width = pc.width;
		this.height = pc.height;
		
		//添加bg是为了在开发时观察Container的范围
		// let bg:egret.Shape = new egret.Shape();
		// bg.graphics.beginFill( 0x112299);
    	// bg.graphics.drawRect( 0, 0, this.width, this.height ); 
    	// bg.graphics.endFill();
		// bg.alpha = 0.5;
		// this.addChild(bg);

		this.show(arrays);
    
	}
	/**
	 * 横着排列
	 */
	private show(arrays:Array<Poker>){
		  let p = RES.getRes("layout_json").puker;
		  let x:number = 0;
		  let y:number = 0;
		for(var i = 0; i < arrays.length;i++){
			if(i >= 10) {
				y = 40;
			}
			if(x >= 10){
				x = x - 10;
			}
			let puker:Puker = new Puker(arrays[i],
			x * p.pukerSmallSpace, y,
			p.pukerSmallWidth,p.pukerSmallHeight);
			x ++;
			this.addChild(puker);
		}
	  	
	}
	/**
	 * 竖着排列
	 */
  	private show1(arrays:Array<Poker>){
		  let p = RES.getRes("layout_json").puker;
		  let x:number = 0;
		  let y:number = 0;
		for(var i = 0; i < arrays.length;i++){
			if(i >= 10) {
				x = p.pukerSmallHeight * 0.3;
			}
			if(y >= 10){
				y = y - 10;
			}
			let puker:Puker = new Puker(arrays[i],
			x, y * p.pukerSmallSpace,
			p.pukerSmallWidth,p.pukerSmallHeight);
			y ++;
			this.addChild(puker);
		}
	  	
	}
}