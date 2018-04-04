/**
 * 通用的TOP容器，定义各个场景中的TOP
 */
class TopContainer extends egret.DisplayObjectContainer{
	public constructor() {
		super();
		let pc = RES.getRes("layout_json").topContainer;
		
		this.x = pc.x;
		this.y = pc.y;
		this.width = pc.width;
		this.height = pc.height;
		
		// 添加bg是为了在开发时观察Container的范围
		let bg:egret.Shape = new egret.Shape();
		bg.graphics.beginFill( 0xB1BDDD);
    	bg.graphics.drawRect( 0, 0, this.width, this.height ); 
    	bg.graphics.endFill();
		// bg.alpha = 0.3;
		this.addChild(bg);

		this.show();
    
	}
	
  	private show(){
		let textTip:TextTip = new TextTip("贝壳：3000",40,6,32);
		this.addChild(textTip);
		
		let text2 :TextTip = new TextTip("铜板：200",300,6,32);
		this.addChild(text2);

		let text3 :TextTip = new TextTip("宠物头像   宠物技能",600,6,32);
		this.addChild(text3);
	}
}