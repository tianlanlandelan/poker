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

		this.clearChileByName("menuContainer");
		// this.testHttpRequest();
	 }
	 private menuFriendModeClick(){
		 console.log("menuFriendModeClick---");
	 }
	private clearChileByName(name:string){
       if (this.getChildByName(name) != null) {
            this.removeChild(this.getChildByName(name));
        } 
    }
	private testHttpRequest(){
		var request = new egret.HttpRequest();
		request.responseType = egret.HttpResponseType.TEXT;
		request.open("http://127.0.0.1:8800/test",egret.HttpMethod.GET);
		request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		request.send();
		request.addEventListener(egret.Event.COMPLETE,this.onGetComplete,this);
		request.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onGetIOError,this);
		request.addEventListener(egret.ProgressEvent.PROGRESS,this.onGetProgress,this);
	}
	private onGetComplete(event:egret.Event):void {
        var request = <egret.HttpRequest>event.currentTarget;
		let res:Array<any> = JSON.parse(request.response);
		console.log("get data : ",res);
		for(let i = 0 ; i <res.length ; i ++){

			var responseLabel = new egret.TextField();
        	responseLabel.size = 18;
			responseLabel.text = "房间号：" + i + " id:" +  res[i].id + "    name:" + res[i].name + "   sort:" + res[i].sort;
			responseLabel.name = "responseLabel_" + i;
			responseLabel.width = 1000;
        	responseLabel.x = 50;
        	responseLabel.y = 70 + i * 20;
			responseLabel.touchEnabled = true;
			responseLabel.addEventListener(egret.TouchEvent.TOUCH_TAP,this.responseLabelClick,this);
			this.addChild(responseLabel);	
			console.log(res[i].id)
		}
        
    }
    private onGetIOError(event:egret.IOErrorEvent):void {
        console.log("get error : " + event);
    }
    private onGetProgress(event:egret.ProgressEvent):void {
        console.log("get progress : " + Math.floor(100*event.bytesLoaded/event.bytesTotal) + "%");
    }
	private responseLabelClick(evt: egret.TouchEvent){
		let obj:egret.TextField = evt.currentTarget;
		console.log(obj.name);
	}
}