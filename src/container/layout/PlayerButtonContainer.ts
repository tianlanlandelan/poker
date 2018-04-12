/**
 * 通用的游戏按钮容器，定义游戏中所有的按钮组
 */
class PlayerButtonContainer extends egret.DisplayObjectContainer{

	/**
	 * 标准的斗地主玩家出牌动作按钮组容器
	 * 包含:不要、提示、出牌、不可出牌按钮
	 * player 当场景要加载该容器时，传入该场景，调用该容器的场景必须实现buttonOkClick(evt:egret.TouchEvent)方法，该方法是用来处理点击出牌按钮后执行的流程
	 */
	public constructor(player,type:number) {
		super();
		let pc = RES.getRes("layout_json").playerButtonContainer;
		
		this.x = pc.x;
		this.y = pc.y;
		this.width = pc.width;
		this.height = pc.height;
		
		//添加bg是为了在开发时观察Container的范围
		// let bg:egret.Shape = new egret.Shape();
		// bg.graphics.beginFill( 0x112233);
    	// bg.graphics.drawRect( 0, 0, this.width, this.height ); 
    	// bg.graphics.endFill();
		// bg.alpha = 0.3;
		// this.addChild(bg);

		this.show(player,type);
    
	}
	
  	private show(player,type:number){
		if(type == RoomManager.ButtonsCallTheLandlord){
			/** 不叫 */
			let buttonTip:Button = new Button("nocall",150,0,300,200);
			buttonTip.touchEnabled = true;
			buttonTip.addEventListener(egret.TouchEvent.TOUCH_TAP,player.buttonBuJiao,player);
			this.addChild(buttonTip);
			// let textTip:TextTip = new TextTip("不叫",286,6,64);
			// this.addChild(textTip);
			/** 叫地主 */
			let buttonOK:Button = new Button("call",550,0,300,200);
			buttonOK.touchEnabled = true;
			buttonOK.addEventListener(egret.TouchEvent.TOUCH_TAP,player.buttonJiaoDiZhu,player);
			this.addChild(buttonOK);
			// let textOk:TextTip = new TextTip("叫地主",554,6,64);
			// this.addChild(textOk);
		}else if(type == RoomManager.ButtonsFight4TheLandlord){
			/** 不抢 */
			let buttonTip:Button = new Button("pass",250,0,200,50);
			buttonTip.touchEnabled = true;
			buttonTip.addEventListener(egret.TouchEvent.TOUCH_TAP,player.buttonBuQiang,player);
			this.addChild(buttonTip);
			let textTip:TextTip = new TextTip("不抢",286,6,64);
			this.addChild(textTip);
			/** 抢地主 */
			let buttonOK:Button = new Button("ok",550,0,200,50);
			buttonOK.touchEnabled = true;
			buttonOK.addEventListener(egret.TouchEvent.TOUCH_TAP,player.buttonQiangDiZhu,player);
			this.addChild(buttonOK);
			let textOk:TextTip = new TextTip("抢地主",554,6,64);
			this.addChild(textOk);
		}
		else if(type == RoomManager.ButtonsDiscard){
			/** 不要 */
			let buttonPass:Button = new Button("pass",25,0,300,200);
			buttonPass.touchEnabled = true;
			buttonPass.addEventListener(egret.TouchEvent.TOUCH_TAP,player.buttonBuYao,player);
			this.addChild(buttonPass);
			// let textPass:TextTip = new TextTip("不要",136,6,64);
			// this.addChild(textPass);
			/** 提示 */
			let buttonTip:Button = new Button("tip",350,0,300,200);
			buttonTip.touchEnabled = true;
			buttonTip.addEventListener(egret.TouchEvent.TOUCH_TAP,player.buttonTiShi,player);
			this.addChild(buttonTip);
			// let textTip:TextTip = new TextTip("提示",436,6,64);
			// this.addChild(textTip);
			/** 出牌 */
			let buttonOK:Button = new Button("ok",675,0,300,200);
			buttonOK.touchEnabled = true;
			buttonOK.addEventListener(egret.TouchEvent.TOUCH_TAP,player.buttonChuPai,player);
			this.addChild(buttonOK);
			// let textOk:TextTip = new TextTip("出牌",736,6,64);
			// this.addChild(textOk);
		}else if(type == RoomManager.ButtonsGameOver){
			/** 离开房间 */
			let buttonLeave:Button = new Button("leaveRoom",250,0,300,200);
			buttonLeave.touchEnabled = true;
			buttonLeave.addEventListener(egret.TouchEvent.TOUCH_TAP,player.button_gameOver,player);
			this.addChild(buttonLeave);

			/** 再来一把 */
			let buttonAgain:Button = new Button("newGame",550,0,300,200);
			buttonAgain.touchEnabled = true;
			buttonAgain.addEventListener(egret.TouchEvent.TOUCH_TAP,player.button_restart,player);
			this.addChild(buttonAgain);
		}

		
	}
}