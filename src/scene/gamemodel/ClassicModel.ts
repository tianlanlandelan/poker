class ClassicModel extends egret.DisplayObjectContainer{

	private layout;
    private user:User;
    private webSocket:egret.WebSocket;

    private portrait:PortraitContainer;//玩家头像
    private portraitLeft: PortraitOtherContainer;//上家头像
    private portraitRight: PortraitOtherContainer;//下家头像

    private pokerContainer: PukerContainer;//玩家的牌
    private publicPokerContainer: PukerBottomContainer;//底牌

    private buttons: PlayerButtonContainer;//游戏按钮组

    private poc1Index: number = Math.floor(Math.random() * 10) + 1;
    private poc2Index: number = Math.floor(Math.random() * 10) + 1;
    private poc3Index: number = Math.floor(Math.random() * 10) + 1;

    private leftPlayer: User = PukerUtils.getRandomUser();
    private rightPlayer: User = PukerUtils.getRandomUser();
    private roomId:string;
    /**
     * 玩家的牌
     */
    private pokers:Array<Poker> = new Array<Poker>();
    /**
     * 当前房间出的牌
     */
    private activityPokers:Array<Poker> = new Array<Poker>();
    /**
     * 房间里当前出的牌的玩家的座位号
     */
    private activityPlayerSeat:number = 1;
    /**
     * 底牌
     */
    private publicPokers:Array<Poker> = new Array<Poker>();

    private selectedPokers:Array<Poker> = new Array<Poker>();
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
        this.showPortrait(false);
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
            case RoomManager.Response_InitUserOK:{
                console.log("用户初始化完成","用户Id",res.data.userId);
                this.user.setId(res.data.userId);
                let request:any = new Object;
                let body:any = new Object;
                request.code = RoomManager.Request_onRoom;
                body.userId = this.user.getId();
                body.userName = this.user.getName();
                request.data = body;
                this.send(request);
            } break;
            case RoomManager.Response_RoomInfo:{
                console.log("进入游戏房间成功","房间号",res.data.roomId);
                this.roomId = res.data.roomId;
                let  players:Array<any> = res.data.players;
                //因为其他玩家的座位显示是根据自己的座位显示的为上家和下家的，因此需要先取出玩家自己的数据再取出其他玩家数据
                for(let i = 0 ; i < players.length ; i ++){
                    //存储自己的数据
                    if(players[i].id == this.user.getId()){
                        this.user.setSeat(players[i].seat);
                    }
                }
                for(let i = 0 ; i < players.length ; i ++){
                    //保存其他玩家的数据
                    if(players[i].id != this.user.getId()){
                        if(this.isLeft(players[i].seat)){
                            this.leftPlayer.setSeat(players[i].seat);
                            this.leftPlayer.setName(players[i].name);
                        }else{
                            this.rightPlayer.setSeat(players[i].seat);
                            this.rightPlayer.setName(players[i].name);
                        }
                         this.showOtherPortrait(players[i].seat,false);
                    }
                }

            } break;
            case RoomManager.Response_NewPlayerJoin:{
                console.log("有新玩家加入",res.data.player);
                let player = res.data.player;
                if(this.isLeft(player.seat)){
                    this.leftPlayer.setSeat(player.seat);
                    this.leftPlayer.setName(player.name);
                }else{
                    this.rightPlayer.setSeat(player.seat);
                    this.rightPlayer.setName(player.name);
                }
                this.showOtherPortrait(player.seat,false);
            }  break;
            case RoomManager.Response_Reday:{
                console.log("房间人满，准备开始游戏------------","房间号",res.data.roomId);
                let request:any = new Object;
                let body:any = new Object;
                request.code = RoomManager.Request_BeReady;
                body.roomId = res.data.roomId;
                body.userId = this.user.getId();
                request.data = body;
                this.send(request);
            }  break;
            case RoomManager.Response_DealPoker:{
                console.log("------------发牌---------------");
                console.log("我的牌",res.data.pokers);
                let list:Array<any> = res.data.pokers;
                for(let i = 0 ; i < list.length ; i ++){
                    this.pokers.push(new Poker(list[i].id,list[i].sort));
                }
                //显示自己的牌
                this.showPokersDynamic();
                
            }  break;
            case RoomManager.Response_ToCallTheLandlord:{
                
            }  break;
            case RoomManager.Response_LandlordAndLastCard:{
                console.log("------------产生地主---------------");
                console.log("底牌",res.data.publicPokers);
                console.log("地主座位号",res.data.landlordSeat);
                let landlordSeat = res.data.landlordSeat;
                this.activityPlayerSeat = landlordSeat;
                let publicPokers:Array<any> = res.data.publicPokers;
                for(let i = 0 ; i < publicPokers.length ; i ++){
                    this.publicPokers.push(new Poker(publicPokers[i].id,publicPokers[i].sort));
                }
                //显示底牌
                this.showPublicPokers();
                //如果自己是地主，将底牌加入自己的牌中，并刷新自己的牌，并显示出牌按钮
                if(this.user.getSeat() == landlordSeat){
                    this.user.setLandlord(true);
                    this.pokers = PukerUtils.sortDescPokers(this.pokers.concat(this.publicPokers));
                    //清空玩家选择的牌
                    this.selectedPokers = new Array<Poker>();
                    this.showPokers();
                    //自己的头像旁显示地主的标识
                    this.showPortrait(true);
                    //显示出牌按钮
                    this.showButtons(RoomManager.ButtonsDiscard);
                //地主的头像旁显示地主的标识
                }else{
                    if(this.leftPlayer.getSeat() == landlordSeat)
                        this.leftPlayer.setLandlord(true);
                    else
                        this.rightPlayer.setLandlord(true);

                    this.showOtherPortrait(landlordSeat,true);
                }   
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
               
    }

    private  onConnectClose():void{
        console.log('webSocket','connect closed');
    }

    private  onIOError():void{
        console.log('webSocket','IO Error');
    }
    
    private showPublicPokers(){
        /** 显示底牌 */
        this.publicPokerContainer = new PukerBottomContainer(this.publicPokers);
        this.publicPokerContainer.name = "publicPokerContainer";
        this.addChild(this.publicPokerContainer);
    }

    /**
     * 显示自己的牌
     */
    private showPokers() {
        this.clearPokers();
        this.pokerContainer = new PukerContainer(this, this.pokers);
        this.pokerContainer.name = "pokerContainer";
        this.addChild(this.pokerContainer);
    }
    /**
     * 动态显示扑克牌
     */
    private showPokersDynamic() {
        //先排序
        this.pokers = PukerUtils.sortDescPokers(this.pokers);
        let index: number = this.pokers.length;
        let i: number = 0;
        let pokers:Array<Poker> = new Array<Poker>();
        this.createTimer(300, index,
            () => {
                console.log("发牌：", i);
                pokers.push(this.pokers[i]);
                this.clearPokers();
                this.pokerContainer = new PukerContainer(this, pokers);
                this.pokerContainer.name = "pokerContainer";
                this.addChild(this.pokerContainer);
                i++;
            },
            () => {
                console.log("发牌结束");
            }
        );

    }

    private clearPokers() {
        if (this.getChildByName("pokerContainer") != null) {
            this.removeChild(this.getChildByName("pokerContainer"));
        }
    }
    /**
     * 清理玩家头像
     */
    private clearPortrait() {
        if (this.getChildByName("portrait") != null) {
            this.removeChild(this.getChildByName("portrait"));
        }
    }
    /**
     * 显示玩家头像
     */
    private showPortrait(isLandlord: boolean) {
        this.clearPortrait();
        this.portrait = new PortraitContainer(this.user, 7, isLandlord);
        this.portrait.name = "portrait";
        this.addChild(this.portrait);
    }
    private clearOtherPortrait(seat: number) {
        let name :string;
        if(this.isLeft(seat)){
            name = "portraitLeft";
        }else{
            name = "portraitRight";
        }
        if (this.getChildByName(name) != null) {
            this.removeChild(this.getChildByName(name));
        }
    }

    private showOtherPortrait(seat: number, isLandlord: boolean) {
        this.clearOtherPortrait(seat);
        if(this.isLeft(seat)){
            this.portraitLeft = new PortraitOtherContainer(this.leftPlayer, this.poc3Index, this.isLeft(seat), isLandlord);
            this.portraitLeft.name = "portraitLeft";
            this.addChild(this.portraitLeft);
        }else{
            this.portraitRight = new PortraitOtherContainer(this.rightPlayer, this.poc3Index, this.isLeft(seat), isLandlord);
            this.portraitRight.name = "portraitRight";
            this.addChild(this.portraitRight);
        }
    }
    /**
     * 是否是上家
     */
    private isLeft(seat:number){
        if(seat == this.user.getSeat() + 1 || seat == this.user.getSeat() % 3 + 1)
            return false;
        return true;
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
    
        /**
     * 清理出牌按钮组
     */
    private clearButtons() {
        if (this.getChildByName("buttons") != null) {
            this.removeChild(this.getChildByName("buttons"));
        }
    }
    /**
     * 显示出牌按钮组
     */
    private showButtons(type: number) {
        this.clearButtons();
        this.buttons = new PlayerButtonContainer(this, type);
        this.buttons.name = "buttons";
        this.addChild(this.buttons);
    }
    public buttonChuPai(evt: egret.TouchEvent): void {
        if (PukerTypeUtils.getType(this.selectedPokers) == null) {
            console.log("你这选的是啥呀");
            return;
        }
        //如果当前房间出的有牌且不是自己出的，要判断自己出的牌能不能压住当前房间已经出的牌
        if(this.activityPlayerSeat != this.user.getSeat() &&
             this.activityPokers != null && this.activityPokers.length > 0){
            if(!PukerCompareUtils.comparePukers(this.selectedPokers, this.activityPokers)){
                console.log("没有上家的牌大");
                return;
            }
        }
        //TODO 出牌
        let request:any = new Object;
        let body:any = new Object;
        request.code = RoomManager.Request_Discard;
        body.roomId = this.roomId;
        body.userId = this.user.getId();
        body.pokers = this.selectedPokers;
        request.data = body;
        this.send(request);
    }
    public buttonBuYao(evt: egret.TouchEvent): void {

    }
    public buttonTiShi(evt: egret.TouchEvent): void {
       
    }
    public pukerClick(evt: egret.TouchEvent): void {

        let p = RES.getRes("layout_json").puker;
        let y = p.pukerUpMove;
        let draggedObject: egret.Bitmap = evt.currentTarget;
        //显示扑克的y坐标和扑克的名称
        let id: number = parseInt(draggedObject.name.split(",")[0]);
        let orderValue: number = parseInt(draggedObject.name.split(",")[1]);
        if (draggedObject.y == y) {//选中牌，将牌加入数组
            draggedObject.y = 0;
            this.selectedPokers.push(new Poker(id, orderValue));

        } else {//取消选中牌，将牌从数组中移除
            draggedObject.y = y;
            let poker = new Poker(id, orderValue);
            console.log("poker", poker.toString(), "array", this.selectedPokers);

            this.selectedPokers = PukerUtils.removePokers(this.selectedPokers, [poker]);
            console.log("removedArray", this.selectedPokers)
        }
    }
  

}