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
     * 单房间联机游戏场景
     * seat 座位号
     * gamers 房间里的其他人
     */
    function PlayerP2P_Single(userName, seat, gamers) {
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
        _this.module = "room";
        _this.userName = userName;
        _this.layout = RES.getRes("layout_json").layout;
        _this.mySeat = seat;
        var sky = new Layout(_this.layout.stageWidth, _this.layout.stageHeight);
        _this.addChild(sky);
        _this.show();
        console.log("进入游戏房间，座位号:", _this.mySeat, "其他人:", gamers);
        //TODO  加载房间里已经有的人的头像和名字
        if (gamers != null && gamers.length > 0) {
            for (var i = 0; i < gamers.length; i++) {
                _this.loadOtherPlayerPortrait(gamers[i].seat, gamers[i].name, false);
            }
        }
        return _this;
        // for(let gamer:any in gamers){
        //     this.loadOtherPlayerPortrait(gamer.seat,gamer.name,false);
        // }
    }
    /**
     * 接收
     */
    PlayerP2P_Single.prototype.receive = function (code, data) {
        console.log("收到服务器数据--code:", code, "data", data);
        if (code === 11002) {
            console.log("Server发牌");
            var myPukers = data.pukers;
            this.pukers1 = myPukers.sort(PukerUtils.sortDESC);
            this.puker = new PukerContainer(this, this.pukers1);
            this.puker.name = "puker";
            this.addChild(this.puker);
            Socket.send({
                key: "room",
                code: 11001
            });
        }
        else if (code === 11003) {
            console.log("Server已随机选择地主");
            if (data.self) {
                this.showButton(0);
            }
        }
        else if (code === 11004) {
            console.log("争地主");
            if (data.self) {
                this.showButton(1);
            }
        }
        else if (code === 11005) {
            console.log("地主已确定");
            if (data.self) {
                //TODO data.seat 地主的座号
                this.pukers1 = this.pukers1.concat(data.pukers).sort(PukerUtils.sortDESC);
                if (this.getChildByName("puker") != null) {
                    this.removeChild(this.getChildByName("puker"));
                }
                this.puker = new PukerContainer(this, this.pukers1);
                this.puker.name = "puker";
                this.addChild(this.puker);
                this.showButton(2);
            }
            else {
                this.loadOtherPlayerPortrait(data.seat, null, true);
            }
            //显示底牌
            this.pukerBottom = new PukerBottomContainer(data.pukers);
            this.pukerBottom.name = "pukerBottom";
            this.addChild(this.pukerBottom);
        }
        else if (code === 11006) {
            console.log("有玩家进入房间");
            this.loadOtherPlayerPortrait(data.seat, data.name, false);
        }
        else if (code === 11007) {
            console.log("有玩家准备/取消准备");
        }
        else if (code === 11008) {
            console.log("该谁出牌");
            if (data.self) {
                this.showButton(2);
            }
        }
        else if (code === 11009) {
            console.log("其他玩家出牌");
        }
        else if (code === 11010) {
            console.log("游戏结束");
        }
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
        Socket.register(this);
        Socket.send({
            key: "room",
            code: "11000"
        });
        console.log("正在请求服务器... ...");
        // this.puker = new PukerContainer(this,this.pukers1);
        // this.puker.name = "puker";
        // this.addChild(this.puker);
        // this.pukerBottom = new PukerBottomContainer(this.pukers4);
        // this.pukerBottom.name = "pukerBottom";
        // this.addChild(this.pukerBottom);
        // this.buttons = new PlayerButtonContainer(this,0);
        // this.buttons.name = "buttons";
        // this.addChild(this.buttons);
        this.portraitLeft = new PortraitOtherContainer("等待玩家连接", 1, true, false);
        this.portraitLeft.name = "portraitLeft";
        this.addChild(this.portraitLeft);
        this.portraitRight = new PortraitOtherContainer("等待玩家连接", 2, false, false);
        this.portraitRight.name = "portraitRight";
        this.addChild(this.portraitRight);
        var portrait = new DefaultPortrait("man", 1, 360, 700, 100, 100);
        portrait.name = "portrait";
        this.addChild(portrait);
        // this.pukerRight = new PukerOtherContainer([10,9,8,7,6,5],false);
        // this.pukerRight.name = "pukerRight";
        // this.addChild(this.pukerRight);
        // this.pukerLeft = new PukerOtherContainer([54,53],true);
        // this.pukerLeft.name = "pukerLeft";
        // this.addChild(this.pukerLeft);
        // this.textLeft = new TextOtherContainer("不要",true);
        // this.textLeft.name = "textLeft";
        // this.addChild(this.textLeft);
        // this.textRight = new TextOtherContainer("不要",false);
        // this.textRight.name = "textRight";
        // this.addChild(this.textRight);
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
        // console.log("ButtonOkClick--自己的牌:",this.pukers1.toString());
        // console.log("ButtonOkClick--要出的牌:",this.pukerSelectArray.toString());
        // this.pukers1 = PukerUtils.removeElements(this.pukers1,this.pukerSelectArray);
        // console.log("ButtonOkClick--出过后的牌:",this.pukers1.toString());
        // //刷新自己的牌
        // if(this.getChildByName("puker") != null){
        //     this.removeChild(this.getChildByName("puker"));
        // }
        // this.puker = new PukerContainer(this,this.pukers1);
        // this.puker.name = "puker";
        // this.addChild(this.puker);
        // //刷新出牌区
        // if(this.getChildByName("pukerPlay") != null){
        //     this.removeChild(this.getChildByName("pukerPlay"));
        // }
        // this.pukerPlay = new PukerPlayContainer(this.pukerSelectArray);
        // this.pukerPlay.name = "pukerPlay";
        // this.addChild(this.pukerPlay);
        // //清空已选择的牌数组
        // this.pukerSelectArray = new Array<number>();
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
__reflect(PlayerP2P_Single.prototype, "PlayerP2P_Single", ["SocketReceive"]);
