class PlayerP2P_Single extends egret.DisplayObjectContainer{

    
	private textfield: egret.TextField;

    private puker:PukerContainer;//自己的牌
    private pukerPlay:PukerPlayContainer;//自己出的牌
    private pukerRight:PukerOtherContainer;//右边对家（下家）出的牌
    private pukerLeft:PukerOtherContainer;//左边对家（上家）出的牌
    private pukerVerticalRight:PukerVerticalContainer;//下家的明牌（仅明牌时使用）
    private pukerVerticalLeft:PukerVerticalContainer;//上家的明牌（仅明牌时使用）
    private portraitLeft:PortraitOtherContainer;//上家头像
    private portraitRight:PortraitOtherContainer;//下家头像
    private pukerBottom:PukerBottomContainer;//底牌
    private textRight:TextOtherContainer;//右边对家（下家）的提示
    private textLeft:TextOtherContainer;//左边对家（上家）的提示
    private buttons:PlayerButtonContainer;
    //玩家选择的牌
    private pukerSelectArray:Array<number> = new Array<number>();
	private index:number = 0;
	private layout;
    

    private user;
    private pukerUtil:PukerUtils = new PukerUtils();
    //初始化一副牌（洗牌）
    private pukers:Array<number> =
     [];
    // this.pukerUtil.init();
    //玩家1发到的牌
    private pukers1:Array<number> = 
    [];
    // this.pukers.slice(0,17).sort(PukerUtils.sortDESC);
    //玩家2发到的牌
    private pukers2:Array<number> = [];
    // this.pukers.slice(17,34).sort(PukerUtils.sortDESC);
    //玩家3发到的牌
    private pukers3:Array<number> = [];
    // this.pukers.slice(34,51).sort(PukerUtils.sortDESC);
    //底牌
    private pukers4:Array<number> = [];
    // this.pukers.slice(51).sort(PukerUtils.sortDESC);
    private mySeat:number;

    private leftName:string;
    private rightName:string;
    
    private webSocket:egret.WebSocket;
    public  UUID:string ;

	/**
	 * 联机游戏场景
     * user  玩家
	 */
	public  constructor(user:string) {
		super();
        this.user = user;
		this.layout = RES.getRes("layout_json").layout;
		let sky:Layout = new Layout(this.layout.stageWidth,this.layout.stageHeight);
        this.addChild(sky);
        this.show();
        console.log("进入游戏房间");
        this.init("ws://127.0.0.1:8080/pokerWebSocket",this.user.name);
        
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
        this.webSocket.writeUTF(this.UUID + JSON.stringify(data));
    }
    private  onReceiveData(e:egret.Event):void{
        let response:string = this.webSocket.readUTF();
        console.log("onReceiveData:",response);
        if(response.length == 0){
            return;
        }
        let res:any = JSON.parse(response);
        if(res.code == RoomManager.Response_RoomInfo){

        }else if(res.code == RoomManager.Response_Reday){

        }else if(res.code == RoomManager.Response_DealPoker){

        }else if(res.code == RoomManager.Response_ToCallTheLandlord){

        }else if(res.code == RoomManager.Response_LandlordAndLastCard){

        }else if(res.code == RoomManager.Response_Discard){
            
        }
        // console.log("onReceiveData:",res.code,res.data);
    }
    private  onConnected():void{
        console.log('webSocket','connect success');
    }

    private  onConnectClose():void{
        console.log('webSocket','connect closed');
    }

    private  onIOError():void{
        console.log('webSocket','IO Error');
    }
  
    /**
     * 加载其他玩家头像
     * seat 座位号
     * name 名字
     * isLandlord 是否添加地主标志
     */
    private loadOtherPlayerPortrait(seat:number,name:string,isLandlord:boolean){
        if(this.isLeft(seat)){//上家
                if(this.getChildByName("portraitLeft") != null){
                    this.removeChild(this.getChildByName("portraitLeft"));
                }
                if(name != null) this.leftName = name;
                this.portraitLeft = new PortraitOtherContainer(this.leftName,1,true,isLandlord);
                this.portraitLeft.name = "portraitLeft";
                this.addChild(this.portraitLeft);
            }else{//下家
                if(this.getChildByName("portraitRight") != null){
                    this.removeChild(this.getChildByName("portraitRight"));
                }
                if(name != null) this.leftName = name;
                this.portraitRight = new PortraitOtherContainer(this.leftName,2,false,isLandlord);
                this.portraitRight.name = "portraitRight";
                this.addChild(this.portraitRight);
            }
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
    /**
     * 显示按钮组
     * type 按钮组类型
     * 0 叫地主
     * 1 抢地主按钮组
     * 2 出牌按钮组
     */
    private showButton(type:number){
        if(this.getChildByName("buttons") != null){
            this.removeChild(this.getChildByName("buttons"));
        }
        this.buttons = new PlayerButtonContainer(this,type);
        this.buttons.name = "buttons";
        this.addChild(this.buttons);
    }
    /**
     * 显示游戏场景
     */
    private show(){   
       

        

        let portrait:DefaultPortrait = new DefaultPortrait("man",1,360,700,100,100);
        portrait.name = "portrait";
		this.addChild(portrait);
       


        
    }
    /**
     * 监听点击“出牌”按钮的动作
     * 点击出牌后：
     *  1.从自己牌的数组中移除已选择的牌
     *  2.刷新自己的牌
     *  3.刷新出牌区
     *  4.清空已选择牌的数组
     */
    public buttonChuPai(evt:egret.TouchEvent):void{
        console.log("出牌");
        Socket.send({
            key:"room",
            code:11003,
            data:{
                do:true,
                data:this.pukerSelectArray
            }
        });
       
    }
    public buttonBuJiao(evt:egret.TouchEvent):void{
        console.log("不叫");
        Socket.send({
            key:"room",
            code:11002,
            data:{
                do:false
            }
            
        });
        if(this.getChildByName("buttons") != null){
            this.removeChild(this.getChildByName("buttons"));
        }
    }
    public buttonJiaoDiZhu(evt:egret.TouchEvent):void{
        console.log("叫地主");
        Socket.send({
            key:"room",
            code:11002,
            data:{
                do:true
            }
            
        });
        if(this.getChildByName("buttons") != null){
            this.removeChild(this.getChildByName("buttons"));
        }
    }
    public buttonBuQiang(evt:egret.TouchEvent):void{
        console.log("不抢");
        Socket.send({
            key:"room",
            code:11002,
            data:{
                do:false
            }
        });
        if(this.getChildByName("buttons") != null){
            this.removeChild(this.getChildByName("buttons"));
        }
    }
    public buttonQiangDiZhu(evt:egret.TouchEvent):void{
        console.log("抢地主");
        Socket.send({
            key:"room",
            code:11002,
            data:{
                do:true
            }
            
        });
        if(this.getChildByName("buttons") != null){
            this.removeChild(this.getChildByName("buttons"));
        }
    }
    public buttonBuYao(evt:egret.TouchEvent):void{
        console.log("不要");
        Socket.send({
            key:"room",
            code:11003,
            data:{
                do:false
            }
        });
    }
    public buttonTiShi(evt:egret.TouchEvent):void{
        console.log("提示");
    }
    /**
     * 监听点击扑克的动作
     */
    public pukerClick(evt:egret.TouchEvent):void{
      
      let p = RES.getRes("layout_json").puker;
      let y = p.pukerUpMove;
	  let draggedObject:egret.Bitmap = evt.currentTarget;
	  //显示扑克的y坐标和扑克的名称
	//   console.log("pukerClick: y:",draggedObject.y,draggedObject.name);
      if(draggedObject.y == y){//选中牌，将牌加入数组
        draggedObject.y = 0;
        this.pukerSelectArray.push(parseInt(draggedObject.name));
        
      }else{//取消选中牌，将牌从数组中移除
        draggedObject.y = y;
        this.pukerSelectArray = ArrayUtils.removeElements(this.pukerSelectArray,[parseInt(draggedObject.name)])

      }
      
    }
	

}