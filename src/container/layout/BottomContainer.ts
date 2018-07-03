/**
 * 
 * 通用的Bottom容器，定义各个场景中的Bottom
 */
class BottomContainer extends egret.DisplayObjectContainer{
	/**
	 * 通用的Bottom容器
	 * type 容器类型 0:大厅的bottom 1:房间的bottom
	 */
	public constructor(type:number) {
		super();
		let pc;
		if(type === 0){
			 pc = RES.getRes("layout_json").hallBottomContainer;
			 this.showHallBottom();
		}else{
			 pc = RES.getRes("layout_json").bottomContainer;
			 this.showRoomBottom();
		}
		this.x = pc.x;
		this.y = pc.y;
		this.width = pc.width;
		this.height = pc.height;
		
		// 添加bg是为了在开发时观察Container的范围
		let bg:egret.Shape = new egret.Shape();
		bg.graphics.beginFill( 0xBFBC9B);
    	bg.graphics.drawRect( 0, 0, this.width, this.height ); 
    	bg.graphics.endFill();
		// bg.alpha = 0.3;
		this.addChild(bg);
	}
	private showHallBottom(){

	}
  	private showRoomBottom(){
		let textTip:TextTip = new TextTip("贝壳：3000",40,6,32);
		this.addChild(textTip);
		
		let text2 :TextTip = new TextTip("铜板：200",300,6,32);
		this.addChild(text2);

		let text3 :TextTip = new TextTip("宠物头像   宠物技能",600,6,32);
		this.addChild(text3);
	}
}