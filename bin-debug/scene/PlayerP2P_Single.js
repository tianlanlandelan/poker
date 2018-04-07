var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PlayerP2P_Single = (function (_super) {
    __extends(PlayerP2P_Single, _super);
    /**
     * 联机游戏场景
     * user  玩家
     */
    function PlayerP2P_Single(user) {
        var _this = _super.call(this) || this;
        //玩家选择的牌
        _this.pukerSelectArray = new Array();
        _this.index = 0;
        _this.pukerUtil = new PukerUtils();
        //初始化一副牌（洗牌）
        _this.pukers = [];
        // this.pukerUtil.init();
        //玩家1发到的牌
        _this.pukers1 = [];
        // this.pukers.slice(0,17).sort(PukerUtils.sortDESC);
        //玩家2发到的牌
        _this.pukers2 = [];
        // this.pukers.slice(17,34).sort(PukerUtils.sortDESC);
        //玩家3发到的牌
        _this.pukers3 = [];
        // this.pukers.slice(34,51).sort(PukerUtils.sortDESC);
        //底牌
        _this.pukers4 = [];
        _this.user = user;
        _this.layout = RES.getRes("layout_json").layout;
        var sky = new Layout(_this.layout.stageWidth, _this.layout.stageHeight);
        _this.addChild(sky);
        _this.show();
        console.log("进入游戏房间");
        _this.init("ws://127.0.0.1:8080/pokerWebSocket", _this.user.name);
        return _this;
    }
    PlayerP2P_Single.prototype.init = function (url, userName) {
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
    PlayerP2P_Single.prototype.send = function (data) {
        this.webSocket.writeUTF(this.UUID + JSON.stringify(data));
    };
    PlayerP2P_Single.prototype.onReceiveData = function (e) {
        var response = this.webSocket.readUTF();
        console.log("onReceiveData:", response);
        if (response.length == 0) {
            return;
        }
        var res = JSON.parse(response);
        if (res.code == RoomManager.Response_RoomInfo) {
        }
        else if (res.code == RoomManager.Response_Reday) {
        }
        else if (res.code == RoomManager.Response_DealPoker) {
        }
        else if (res.code == RoomManager.Response_ToCallTheLandlord) {
        }
        else if (res.code == RoomManager.Response_LandlordAndLastCard) {
        }
        else if (res.code == RoomManager.Response_Discard) {
        }
        // console.log("onReceiveData:",res.code,res.data);
    };
    PlayerP2P_Single.prototype.onConnected = function () {
        console.log('webSocket', 'connect success');
    };
    PlayerP2P_Single.prototype.onConnectClose = function () {
        console.log('webSocket', 'connect closed');
    };
    PlayerP2P_Single.prototype.onIOError = function () {
        console.log('webSocket', 'IO Error');
    };
    /**
     * 加载其他玩家头像
     * seat 座位号
     * name 名字
     * isLandlord 是否添加地主标志
     */
    PlayerP2P_Single.prototype.loadOtherPlayerPortrait = function (seat, name, isLandlord) {
        if (this.isLeft(seat)) {
            if (this.getChildByName("portraitLeft") != null) {
                this.removeChild(this.getChildByName("portraitLeft"));
            }
            if (name != null)
                this.leftName = name;
            this.portraitLeft = new PortraitOtherContainer(this.leftName, 1, true, isLandlord);
            this.portraitLeft.name = "portraitLeft";
            this.addChild(this.portraitLeft);
        }
        else {
            if (this.getChildByName("portraitRight") != null) {
                this.removeChild(this.getChildByName("portraitRight"));
            }
            if (name != null)
                this.leftName = name;
            this.portraitRight = new PortraitOtherContainer(this.leftName, 2, false, isLandlord);
            this.portraitRight.name = "portraitRight";
            this.addChild(this.portraitRight);
        }
    };
    /**
     * 是否是上家
     */
    PlayerP2P_Single.prototype.isLeft = function (seat) {
        if (this.mySeat == 1 && seat == 3)
            return true;
        if (this.mySeat == 2 && seat == 1)
            return true;
        if (this.mySeat == 3 && seat == 2)
            return true;
        return false;
    };
    /**
     * 显示按钮组
     * type 按钮组类型
     * 0 叫地主
     * 1 抢地主按钮组
     * 2 出牌按钮组
     */
    PlayerP2P_Single.prototype.showButton = function (type) {
        if (this.getChildByName("buttons") != null) {
            this.removeChild(this.getChildByName("buttons"));
        }
        this.buttons = new PlayerButtonContainer(this, type);
        this.buttons.name = "buttons";
        this.addChild(this.buttons);
    };
    /**
     * 显示游戏场景
     */
    PlayerP2P_Single.prototype.show = function () {
        var portrait = new DefaultPortrait("man", 1, 360, 700, 100, 100);
        portrait.name = "portrait";
        this.addChild(portrait);
    };
    /**
     * 监听点击“出牌”按钮的动作
     * 点击出牌后：
     *  1.从自己牌的数组中移除已选择的牌
     *  2.刷新自己的牌
     *  3.刷新出牌区
     *  4.清空已选择牌的数组
     */
    PlayerP2P_Single.prototype.buttonChuPai = function (evt) {
        console.log("出牌");
        Socket.send({
            key: "room",
            code: 11003,
            data: {
                do: true,
                data: this.pukerSelectArray
            }
        });
    };
    PlayerP2P_Single.prototype.buttonBuJiao = function (evt) {
        console.log("不叫");
        Socket.send({
            key: "room",
            code: 11002,
            data: {
                do: false
            }
        });
        if (this.getChildByName("buttons") != null) {
            this.removeChild(this.getChildByName("buttons"));
        }
    };
    PlayerP2P_Single.prototype.buttonJiaoDiZhu = function (evt) {
        console.log("叫地主");
        Socket.send({
            key: "room",
            code: 11002,
            data: {
                do: true
            }
        });
        if (this.getChildByName("buttons") != null) {
            this.removeChild(this.getChildByName("buttons"));
        }
    };
    PlayerP2P_Single.prototype.buttonBuQiang = function (evt) {
        console.log("不抢");
        Socket.send({
            key: "room",
            code: 11002,
            data: {
                do: false
            }
        });
        if (this.getChildByName("buttons") != null) {
            this.removeChild(this.getChildByName("buttons"));
        }
    };
    PlayerP2P_Single.prototype.buttonQiangDiZhu = function (evt) {
        console.log("抢地主");
        Socket.send({
            key: "room",
            code: 11002,
            data: {
                do: true
            }
        });
        if (this.getChildByName("buttons") != null) {
            this.removeChild(this.getChildByName("buttons"));
        }
    };
    PlayerP2P_Single.prototype.buttonBuYao = function (evt) {
        console.log("不要");
        Socket.send({
            key: "room",
            code: 11003,
            data: {
                do: false
            }
        });
    };
    PlayerP2P_Single.prototype.buttonTiShi = function (evt) {
        console.log("提示");
    };
    /**
     * 监听点击扑克的动作
     */
    PlayerP2P_Single.prototype.pukerClick = function (evt) {
        var p = RES.getRes("layout_json").puker;
        var y = p.pukerUpMove;
        var draggedObject = evt.currentTarget;
        //显示扑克的y坐标和扑克的名称
        //   console.log("pukerClick: y:",draggedObject.y,draggedObject.name);
        if (draggedObject.y == y) {
            draggedObject.y = 0;
            this.pukerSelectArray.push(parseInt(draggedObject.name));
        }
        else {
            draggedObject.y = y;
            this.pukerSelectArray = ArrayUtils.removeElements(this.pukerSelectArray, [parseInt(draggedObject.name)]);
        }
    };
    return PlayerP2P_Single;
}(egret.DisplayObjectContainer));
__reflect(PlayerP2P_Single.prototype, "PlayerP2P_Single");
//# sourceMappingURL=PlayerP2P_Single.js.map