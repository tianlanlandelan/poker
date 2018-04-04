class Socket{
    private static socketReceiveList:SocketReceive[] = [];
    private static ip:string;
    private static port:number;
    private static webSocket:egret.WebSocket;
    public  static UUID:string ;

    public static init(ip:string,port:number){
        this.webSocket = new egret.WebSocket();
        //添加收到数据侦听，收到数据会调用此方法
        this.webSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA,this.onReceiveData,this);
        //添加链接打开侦听，连接成功会调用此方法
        this.webSocket.addEventListener(egret.Event.CONNECT,this.onConnected,this);
        //添加链接关闭侦听，手动关闭或者服务器关闭连接会调用此方法
        this.webSocket.addEventListener(egret.Event.CLOSE,this.onConnectClose,this);
        //添加异常侦听，出现异常会调用此方法
        this.webSocket.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onIOError,this);
        this.webSocket.connect(ip,port);
    }

    public static register(socketReceive:SocketReceive):void{
        if(this.socketReceiveList.some(item => (socketReceive.module == item.module))){
            throw 'module is exist';
        }
        this.socketReceiveList.push(socketReceive);
    }

    public static writeOff(module:string):void{
        for(let i:number = 0; i <= this.socketReceiveList.length; i++){
            let socketReceive:SocketReceive = this.socketReceiveList[i];
            if(socketReceive.module == module){
                this.socketReceiveList.splice(i,1);
                break;
            }
        }
    }

    public static send(data:any):void{
        this.webSocket.writeUTF(this.UUID + JSON.stringify(data));
    }

    private static onReceiveData(e:egret.Event):void{
        let response:string = this.webSocket.readUTF();
        if(response.length == 0){
            return;
        }
        let res:any = JSON.parse(response);
        for(let socketReceive of this.socketReceiveList){
            if(socketReceive.module == res.module){
                socketReceive.receive(res.code,res.data);
            }
        }
    }

    private static onConnected():void{
        console.log('webSocket','connect success');
    }

    private static onConnectClose():void{
        console.log('webSocket','connect closed');
    }

    private static onIOError():void{
        console.log('webSocket','IO Error');
    }
}