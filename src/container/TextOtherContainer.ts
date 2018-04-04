class TextOtherContainer extends egret.DisplayObjectContainer{
	/**
	 * 其他玩家不出牌时的文字提示
	 */
	public constructor(text:string,isLeft:boolean) {
		super();
		let pc = RES.getRes("layout_json").textOtherContainer;
		
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

		this.show(text,isLeft);

	}
	private layout;
	private show(text:string,isLeft:boolean){
		let x:number = 0;
		if(!isLeft){
			x = 16 + (6 - text.length) * 64;
		}
		let tip:TextTip = new TextTip(text,x,0,64);
		this.addChild(tip);		
	}
}