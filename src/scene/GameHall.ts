class GameHall extends egret.DisplayObjectContainer{
	public constructor(user:any) {
		super();
		this.user = user;
		this.width = 1920;
		this.height = 1080;
		//添加bg是为了在开发时观察Container的范围
		let bg:egret.Shape = new egret.Shape();
		bg.graphics.beginFill( 0xDFDDCD);
    	bg.graphics.drawRect( 0, 0, this.width, this.height ); 
    	bg.graphics.endFill();
		// bg.alpha = 0.5;
		this.addChild(bg);
		this.show();
	}
	private user:any;
	private topContainer:TopContainer = new TopContainer();
	private bottomContainer:BottomContainer = new BottomContainer(0);
	private menuContainer:HallMenuContainer  = new HallMenuContainer(this.user,this);

	private show(){
		this.topContainer.name = "topContainer";
		this.addChild(this.topContainer);
		this.bottomContainer.name = "bottomContainer";
		this.addChild(this.bottomContainer);
		this.menuContainer.name = "menuContainer";
		this.addChild(this.menuContainer);

		
	}
	 private menuOfflineModeClick(){
		 console.log("menuOfflineModeClick---");
		 let playerP2c:PlayerP2C = new PlayerP2C(this.user);
         this.parent.addChild(playerP2c);
		 this.parent.removeChild(this);
	 }
	 private menuClassicModeClick(){
		 console.log("menuClassicModeClick---");
	 }
	 private menuFriendModeClick(){
		 console.log("menuFriendModeClick---");
	 }
	
}