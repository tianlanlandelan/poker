var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Socket = (function () {
    function Socket() {
    }
    Socket.init = function (url, userName) {
        this.webSocket = new egret.WebSocket();
        //添加收到数据侦听，收到数据会调用此方法
        this.webSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveData, this);
        //添加链接打开侦听，连接成功会调用此方法
        this.webSocket.addEventListener(egret.Event.CONNECT, this.onConnected, this);
        //添加链接关闭侦听，手动关闭或者服务器关闭连接会调用此方法
        this.webSocket.addEventListener(egret.Event.CLOSE, this.onConnectClose, this);
        //添加异常侦听，出现异常会调用此方法
        this.webSocket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOError, this);
        // this.webSocket.connect(ip,port);
        this.webSocket.connectByUrl(url + "/" + userName);
    };
    Socket.register = function (socketReceive) {
        if (this.socketReceiveList.some(function (item) { return (socketReceive.module == item.module); })) {
            throw 'module is exist';
        }
        this.socketReceiveList.push(socketReceive);
    };
    Socket.writeOff = function (module) {
        for (var i = 0; i <= this.socketReceiveList.length; i++) {
            var socketReceive = this.socketReceiveList[i];
            if (socketReceive.module == module) {
                this.socketReceiveList.splice(i, 1);
                break;
            }
        }
    };
    Socket.send = function (data) {
        this.webSocket.writeUTF(this.UUID + JSON.stringify(data));
    };
    Socket.onReceiveData = function (e) {
        var response = this.webSocket.readUTF();
        console.log("onReceiveData:", response);
        if (response.length == 0) {
            return;
        }
        var res = JSON.parse(response);
        for (var _i = 0, _a = this.socketReceiveList; _i < _a.length; _i++) {
            var socketReceive = _a[_i];
            if (socketReceive.module == res.module) {
                socketReceive.receive(res.code, res.data);
            }
        }
    };
    Socket.onConnected = function () {
        console.log('webSocket', 'connect success');
    };
    Socket.onConnectClose = function () {
        console.log('webSocket', 'connect closed');
    };
    Socket.onIOError = function () {
        console.log('webSocket', 'IO Error');
    };
    return Socket;
}());
Socket.socketReceiveList = [];
__reflect(Socket.prototype, "Socket");
//# sourceMappingURL=Socket.js.map