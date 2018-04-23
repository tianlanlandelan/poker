class StartScene extends egret.DisplayObjectContainer{
    private user:User;
    private sound:egret.Sound = RES.getRes("bg_guzheng_mp3");
    private soundChannel:egret.SoundChannel;
	public constructor(user:User) {
		super();
        this.user = user;
        this.show();
	}
	private show(){
		let layout = RES.getRes("layout_json").layout;
        this.soundChannel = this.sound.play();
        this.soundChannel.volume = 0.3;

        //加载游戏背景图
        let bg:egret.Bitmap = new egret.Bitmap(RES.getRes("startBgImg_png"));
        bg.name = "bgImg";
        this.addChild(bg);

        //加载开始按钮
        let button:egret.Bitmap = new egret.Bitmap(RES.getRes("button_begin_png"));
        button.touchEnabled = true;
		button.addEventListener(egret.TouchEvent.TOUCH_TAP,this.startGame,this);
        button.name = "button";
        button.x = 700;
        button.y = 300;
        this.addChild(button);

	}
	/**
     * 点击开始游戏按钮,移除开始界面，进入游戏大厅
     */
    private startGame(evt:egret.TouchEvent):void{
        this.soundChannel.stop();
        let gameHall:GameHall = new GameHall(this.user);
        gameHall.name = "gameHall";
        this.parent.addChild(gameHall);
        this.parent.removeChild(this);
    }
}