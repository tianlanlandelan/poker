class PortraitOtherContainer extends egret.DisplayObjectContainer{
	/**
	 * 显示对手的头像
	 * name 名称
	 * index 头像
	 * isLeft 是否是左边的玩家
	 * isLandlord 是否是地主
	 */
	public constructor(user:User,index:number,isLeft:boolean,isLandlord:boolean) {
		super();
		let pc = RES.getRes("layout_json").portraitOtherContainer;
		
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


		let playerName:TextTip = new TextTip(user.getName(),0,100,16);
		playerName.width  = 100;
		this.addChild(playerName);
		if(isLandlord){
			let playerName:TextTip = new TextTip("地主",0,-50,32);
			playerName.width  = 100;
			this.addChild(playerName);
		}
		this.show(user,index);
	}
	
  	private show(user:User,index:number){  
		let portrait:DefaultPortrait = new DefaultPortrait(user.getSex(),index,0,0,100,100);
		this.addChild(portrait);
	}
}