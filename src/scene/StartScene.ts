class StartScene extends egret.DisplayObjectContainer{
	private isOffLineGame:boolean = false;
    private user:any;
    private sound:egret.Sound = RES.getRes("bg_guzheng_mp3");
    private soundChannel:egret.SoundChannel;
	public constructor(user:any,isOffLineGame:boolean) {
		super();
        this.user = user;
		this.isOffLineGame = isOffLineGame;
        this.show();
	}
	private show(){
		let layout = RES.getRes("layout_json").layout;
        this.soundChannel = this.sound.play();
        this.soundChannel.volume = 0.3;

        let bg:egret.Bitmap = new egret.Bitmap(RES.getRes("startBgImg_png"));
        bg.name = "bgImg";
        this.addChild(bg);

        let button:egret.Bitmap = new egret.Bitmap(RES.getRes("button_begin_png"));
        button.touchEnabled = true;
		button.addEventListener(egret.TouchEvent.TOUCH_TAP,this.startGame,this);
        button.name = "button";
        button.x = 700;
        button.y = 300;
        this.addChild(button);

	}
	/**
     * 点击开始游戏按钮
     */
    private startGame(evt:egret.TouchEvent):void{
        this.soundChannel.stop();
        let gameHall:GameHall = new GameHall(this.user);
        gameHall.name = "gameHall";
        this.parent.addChild(gameHall);
        // if(this.isOffLineGame){//加载单机游戏场景
        //     let playerP2c:PlayerP2C = new PlayerP2C(this.user);
        //     this.parent.addChild(playerP2c);
        // }else{//加载联机游戏场景
        //     Socket.send({//进入房间
        //          module:"room",
        //          code:10001 
        //      });
        //     console.log("已向Server请求开始游戏，等待Server分配房间...");
        // }
         this.parent.removeChild(this);
    }
}