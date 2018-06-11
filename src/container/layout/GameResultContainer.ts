/**
 * 通用的游戏结果显示容器，显示游戏结果
 */
class GameResultContainer extends egret.DisplayObjectContainer{
	/**
	 * 显示游戏结果
	 * isVictory 是否胜利
	 */
	public constructor(isVictory:boolean) {
		super();
		let pc = RES.getRes("layout_json").layout;
		
		this.x = 0;
		this.y = 0;
		this.width = pc.stageWidth;
		this.height = pc.stageHeight;
		
		/** 遮罩层 */
		let bg:egret.Shape = new egret.Shape();
		bg.graphics.beginFill( 0x112233);
    	bg.graphics.drawRect( 0, 0, this.width, this.height ); 
    	bg.graphics.endFill();
		bg.alpha = 0.3;
		this.addChild(bg);
		this.show(isVictory);
	}
	private show(isVictory:boolean){
		let text:TextTip ;
		if(isVictory){//胜利
			text = new TextTip("胜利",800,700,128);
		}else{//失败
			text = new TextTip("失败",800,700,128);
		}
		this.addChild(text);
	}
}