class PukerBottomContainer extends egret.DisplayObjectContainer{
	/**
	 * 标准扑克容器，显示底牌
	 * 这个容器只能显示牌，不能对牌进行操作
	 * arrays 扑克id的数组
	 */
	public constructor(arrays:Array<number>) {
		super();
		let pb = RES.getRes("layout_json").pukerBottomContainer;
		this.x = pb.x;
		this.y = pb.y;
		this.width = pb.width;
		this.height = pb.height;
		
		//添加bg是为了在开发时观察Container的范围
		// let bg:egret.Shape = new egret.Shape();
		// bg.graphics.beginFill( 0x112233);
    	// bg.graphics.drawRect( 0, 0, this.width, this.height ); 
    	// bg.graphics.endFill();
		// bg.alpha = 0.5;
		// this.addChild(bg);

		this.show(arrays);
    
	}
	
  	private show(arrays:Array<number>){
		  let p = RES.getRes("layout_json").puker;
		  let x = 0;
		  
		for(var i = 0; i < arrays.length;i++){
			let puker:Puker = new Puker(arrays[i],
			x + i * p.pukerSmallSpace,0,
			p.pukerSmallWidth,p.pukerSmallHeight);
			this.addChild(puker);
		}
	  	
	}
}