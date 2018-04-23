/**
 * 用户头像显示容器
 */
class PortraitContainer  extends egret.DisplayObjectContainer{
	public constructor(user:User,index:number,isLandlord:boolean) {
		super();
		let pc = RES.getRes("layout_json").portraitContainer;
		
		this.x = pc.x;
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
			let playerName:TextTip = new TextTip("地主",100,0,32);
			playerName.width  = 100;
			this.addChild(playerName);
		}
		this.show(user.getSex(),index);
	}

	
  	private show(sex:string,index:number){
		  
	  	let portrait:DefaultPortrait = new DefaultPortrait(sex,index,0,0,100,100);
		this.addChild(portrait);
	}
}