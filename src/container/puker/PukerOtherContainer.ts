/**
 * 标准扑克容器，显示其他玩家出的牌
 */
class PukerOtherContainer extends egret.DisplayObjectContainer{
	/**
	 * 标准扑克容器，显示其他玩家出的牌
	 * 这个容器只能显示牌，不能对牌进行操作
	 * arrays 扑克id的数组
	 * x 扑克的x坐标
	 */
	public constructor(arrays:Array<Poker>,isLeft:boolean) {
		super();
		let pc = RES.getRes("layout_json").pukerOtherContainer;
		
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
		// bg.graphics.beginFill( 0x112233);
    	// bg.graphics.drawRect( 0, 0, this.width, this.height ); 
    	// bg.graphics.endFill();
		// bg.alpha = 0.5;
		// this.addChild(bg);

		this.show(arrays,isLeft);
    
	}
	/**
	 * 左边玩家出的牌靠左排列，右边玩家出的牌靠右排列
	 */
  	private show(arrays:Array<Poker>,isLeft:boolean){
		  let p = RES.getRes("layout_json").puker;
		  let x = 0;//默认靠左排列
		  
		  if(!isLeft){
			x =  (20 - arrays.length) * p.pukerSmallSpace;//靠右排列
		  }
		for(var i = 0; i < arrays.length;i++){
			let puker:Puker = new Puker(arrays[i].getId(),
			x + i * p.pukerSmallSpace,0,
			p.pukerSmallWidth,p.pukerSmallHeight);
			this.addChild(puker);
		}
	  	
	}
}