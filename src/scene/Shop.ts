class Shop extends egret.DisplayObjectContainer{
	public constructor() {
		super();
		this.width = 1920;
		this.height = 1080;
		//添加bg是为了在开发时观察Container的范围
		let bg:egret.Shape = new egret.Shape();
		bg.graphics.beginFill( 0xDFDDCD);//#AAD27A
    	bg.graphics.drawRect( 0, 0, this.width, this.height ); 
    	bg.graphics.endFill();
		// bg.alpha = 0.5;
		this.addChild(bg);
		this.show();
		
	}
	
	private bottomContainer:BottomContainer = new BottomContainer(1);

	private show(){
		
		
		this.bottomContainer.name = "bottomContainer";
		this.addChild(this.bottomContainer);

		let shopContainer:ShopContainer = new ShopContainer(0);
        this.addChild(shopContainer);
	}
}