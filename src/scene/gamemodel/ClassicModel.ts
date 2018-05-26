class ClassicModel extends egret.DisplayObjectContainer{

	private layout;
    private user:User;
    private mySeat:number;
    private webSocket:egret.WebSocket;

    private portrait:PortraitContainer;

    public  UUID:string ;

	/**
	 * 联机游戏场景
     * user  玩家
	 */
	public  constructor(user:User) {
		super();
        this.user = user;
        this.layout = RES.getRes("layout_json").layout;
		let sky:Layout = new Layout(this.layout.stageWidth,this.layout.stageHeight);
        this.addChild(sky);

        //加载返回按钮
        let tip:TextTip = new TextTip("返回大厅",10,10,64);
        tip.touchEnabled = true;
        tip.addEventListener(egret.TouchEvent.TOUCH_TAP,this.button_gameOver,this);
		this.addChild(tip);	

        this.show();
        
        
	}
    /**
     * 显示游戏场景
     */
    private show(){  
        console.log("进入游戏房间");
        this.init("ws://127.0.0.1:8080/pokerWebSocket",this.user.getName()); 
        
        // this.test();   
    }
    private test() {
        let index = 10;
        this.createTimer(1000, index,
            () => {
                switch(index){
                    case 10: {
                        console.log(index,"玩家进入房间，显示玩家信息");
                        this.showPortrait(false);
                    };break;
                    case 9:{
                        console.log(index,"显示房间信息，此时没有其他玩家，显示默认等待界面");
                    };break;
                    case 8:{
                        console.log(index,"有其他玩家加入，显示其他玩家信息");
                    };break;
                    case 7:{
                        console.log(index,"房间人满，显示开始前的倒计时");
                    };break;
                    case 6:{
                        console.log(index,"游戏开始，绘制自己的牌");
                    };break;
                    case 5:{
                        console.log(index,"绘制其他玩家的牌和底牌");
                    };break;
                    case 4:{
                        console.log(index,"显示叫地主按钮组");
                    };break;
                    case 3:{
                        console.log(index,"显示抢地主按钮组");
                    };break;
                    case 2:{
                        console.log(index,"显示出牌按钮组");
                    };break;
                    case 1:{
                        console.log(index,"绘制自己出的牌和其他玩家出的牌");
                    };break;
                }

                index-- ;
            },
            () => { console.log("计时结束") })
    }

    //清理玩家头像
    private clearPortrait() {
        if (this.getChildByName("portrait") != null) {
            this.removeChild(this.getChildByName("portrait"));
        }
    }
    //显示玩家头像
    private showPortrait(isLandlord: boolean) {
        this.clearPortrait();
        this.portrait = new PortraitContainer(this.user, 7, isLandlord);
        this.portrait.name = "portrait";
        this.addChild(this.portrait);
    }

    private init(url:string,userName:string):void{
       this.webSocket = new egret.WebSocket();
        //添加收到数据侦听，收到数据会调用此方法
        this.webSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA,this.onReceiveData,this);
        //添加链接打开侦听，连接成功会调用此方法
        this.webSocket.addEventListener(egret.Event.CONNECT,this.onConnected,this);
        //添加链接关闭侦听，手动关闭或者服务器关闭连接会调用此方法
        this.webSocket.addEventListener(egret.Event.CLOSE,this.onConnectClose,this);
        //添加异常侦听，出现异常会调用此方法
        this.webSocket.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onIOError,this);
        // this.webSocket.connect(ip,port);
        this.webSocket.connectByUrl(url + "/" + userName); 
    }
    public  send(data:any):void{
        this.webSocket.writeUTF(JSON.stringify(data));
        console.log("消息发送成功",JSON.stringify(data));
    }
    private  onReceiveData(e:egret.Event):void{
        let response:string = this.webSocket.readUTF();
        console.log("onReceiveData:",response);
        if(response.length == 0){
            return;
        }
        let res:any = JSON.parse(response);
        switch(res.code){
            case RoomManager.Response_RoomInfo:{
                console.log("进入游戏房间成功","房间号",res.data.roomId);
                let request:any = new Object;
                let body:any = new Object;
                request.code = RoomManager.Request_BeReady;
                body.roomId = res.data.roomId;
                body.message = "其实我也不知道";
                request.data = body;
                this.send(request);
            } break;
            case RoomManager.Response_Reday:{

            }  break;
            case RoomManager.Response_DealPoker:{

            }  break;
            case RoomManager.Response_ToCallTheLandlord:{

            }  break;
            case RoomManager.Response_LandlordAndLastCard:{

            }  break;
            case RoomManager.Response_Discard:{

            }  break;
            default :{
                console.log("onReceiveData:",res.code,res.data);
            } break;

        }  
    }
    private  onConnected():void{
        console.log("成功连接到服务器-------------");
                let request:any = new Object;
                let body:any = new Object;
                request.code = RoomManager.Request_onRoom;
                body.userId = "abcdefg";
                body.userName = this.user.getName();
                request.data = body;
                this.send(request);
    }

    private  onConnectClose():void{
        console.log('webSocket','connect closed');
    }

    private  onIOError():void{
        console.log('webSocket','IO Error');
    }
  

    /**
     * 是否是上家
     */
    private isLeft(seat:number){
        if(this.mySeat == 1 && seat == 3) return true;
        if(this.mySeat == 2 && seat == 1) return true;
        if(this.mySeat == 3 && seat == 2) return true;
        return false;
        
    }
    private createTimer(delay: number, times: number, timerRun = (times: number) => { }, timerEnd = () => { }) {
        var timer: egret.Timer = new egret.Timer(delay, times);
        timer.addEventListener(egret.TimerEvent.TIMER, timerRun, this);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, timerEnd, this);
        //开始计时
        timer.start();
    }
	
    /**
     * 游戏结束，返回大厅
     */
    public button_gameOver(): void {
        console.log("返回大厅");
        let gameHall:GameHall = new GameHall(this.user);
        gameHall.name = "gameHall";
        this.parent.addChild(gameHall);
        this.parent.removeChild(this);
    }

  

}