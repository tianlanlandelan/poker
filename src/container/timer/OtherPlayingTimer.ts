class OtherPlayingTimer extends egret.DisplayObjectContainer{
	/**
	 * 其他玩家不出牌时的文字提示
	 */
	public constructor(text:string,isLeft:boolean) {
		super();
		let pc = RES.getRes("layout_json").otherPlayingTimer;
		
		if(isLeft){
			this.x = pc.leftX;
		}else{
			this.x = pc.rightX;
		}
		this.y = pc.y;
		this.width = pc.width;
		this.height = pc.height;


		this.show(text,isLeft);

	}
	private layout;
	private show(text:string,isLeft:boolean){
		let tip:TextTip = new TextTip(text,0,0,48);
		this.addChild(tip);		
	}
}