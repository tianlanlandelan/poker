class OtherPukerCountContains extends egret.DisplayObjectContainer{
	/**
	 * 显示对手剩余的牌的数量
	 * isLeft 是否是左边的玩家
	 */
	public constructor(count:number,isLeft:boolean) {
		super();
		let pc = RES.getRes("layout_json").otherPukerCountContainer;
		
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


		let pukerCount:TextTip = new TextTip(count+"",0,100,32);
		pukerCount.width  = 100;
		this.addChild(pukerCount);
    
	}
	
  	
}