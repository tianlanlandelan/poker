class GameHall extends egret.DisplayObjectContainer{
	public constructor(user:User) {
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

        RES.loadGroup("portraits", 4);
		console.log("portraits load ok");
        RES.loadGroup("pokers", 3);
		console.log("pokers load ok");
		RES.loadGroup("buttons", 2);
		console.log("buttons load ok");
        RES.loadGroup("shops", 1);
		console.log("shops load ok");

	}
	private user:User;
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
		 let playerP2c:StandaloneModel = new StandaloneModel(this.user);
         this.parent.addChild(playerP2c);
		 this.parent.removeChild(this);
	 }
	 private menuClassicModeClick(){
		 console.log("menuClassicModeClick---");
		 let player:ClassicModel = new ClassicModel(this.user);
         this.parent.addChild(player);
		 this.parent.removeChild(this);
	 }
	 private menuFriendModeClick(){
		 console.log("menuFriendModeClick---");
	 }
	
}