var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 单机游戏场景
 */
var PlayerP2C = (function (_super) {
    __extends(PlayerP2C, _super);
    /**
     * 单机游戏场景
     */
    function PlayerP2C(user) {
        var _this = _super.call(this) || this;
        /**
         * 是否是开发模式，开发模式下将显示明牌
         */
        _this.isDevelop = true;
        _this.poc1Index = Math.floor(Math.random() * 10) + 1;
        _this.poc2Index = Math.floor(Math.random() * 10) + 1;
        _this.poc3Index = Math.floor(Math.random() * 10) + 1;
        /**
         * 变量
         */
        //测试模拟出牌场景用
        _this.index = 0;
        //玩家座位号
        _this.mySeat = 1;
        //地主座位号
        _this.landlordSeat = 1;
        //当前出牌座位号(现在轮到谁出牌)
        _this.playingSeat = 1;
        /**
         * 当前一手牌
         */
        _this.playedPuker = [];
        _this.playedSeat = 1;
        _this.player2 = PukerUtils.randomUsers[Math.floor(Math.random() * PukerUtils.randomUsers.length)];
        _this.player3 = PukerUtils.randomUsers[Math.floor(Math.random() * PukerUtils.randomUsers.length)];
        //玩家出的牌
        _this.playerPukers1 = new Array();
        //上家出的牌
        _this.playerPukers2 = new Array();
        //下家出的牌
        _this.playerPukers3 = new Array();
        //玩家选择的牌
        _this.pukerSelectArray = new Array();
        /**
         * 发牌
         */
        //初始化一副牌（洗牌）
        _this.pukers = PukerUtils.init();
        //玩家1发到的牌
        _this.pukers1 = _this.pukers.slice(0, 17).sort(PukerUtils.sortDESC);
        //玩家2发到的牌
        _this.pukers2 = _this.pukers.slice(17, 34).sort(PukerUtils.sortDESC);
        //玩家3发到的牌
        _this.pukers3 = _this.pukers.slice(34, 51).sort(PukerUtils.sortDESC);
        //底牌
        _this.pukers4 = _this.pukers.slice(51).sort(PukerUtils.sortDESC);
        _this.user = PukerUtils.randomUsers[Math.floor(Math.random() * PukerUtils.randomUsers.length)];
        // private sound:egret.Sound = RES.getRes("puker_deal_mp3");
        _this.sound = RES.getRes("bg_guzheng_mp3");
        _this.user = user;
        _this.layout = RES.getRes("layout_json").layout;
        var sky = new Layout(_this.layout.stageWidth, _this.layout.stageHeight);
        _this.addChild(sky);
        _this.show();
        return _this;
        // this.test();
    }
    /**
     * 发牌，显示一张一张发牌的效果
     * 1.缓慢显示自己的牌
     * 2.缓慢刷新其他玩家的牌的计数
     */
    PlayerP2C.prototype.initPukers = function () {
        var _this = this;
        var index = 17;
        var pukers = new Array();
        var i = 0;
        this.soundChannel = this.sound.play(0, 1);
        this.soundChannel.volume = 0.5;
        this.createTimer(300, index, function () {
            _this.soundChannel.stop();
            console.log("发牌：", i);
            pukers.push(_this.pukers1[i]);
            _this.clearPukers();
            _this.puker = new PukerContainer(_this, pukers);
            _this.puker.name = "puker";
            _this.addChild(_this.puker);
            _this.showCount(2, i + 1);
            _this.showCount(3, i + 1);
            i++;
            _this.soundChannel = _this.sound.play(0, 1);
        }, function () {
            console.log("发牌结束");
            /** 显示叫地主按钮 */
            _this.showButtons(0);
            _this.soundChannel.stop();
        });
    };
    PlayerP2C.prototype.show = function () {
        /** 显示玩家的牌 */
        this.initPukers();
        this.showCount(2, this.pukers2.length);
        this.showCount(3, this.pukers3.length);
        if (this.isDevelop) {
            /** 显示下家的牌 */
            this.pukerVerticalRight = new PukerVerticalContainer(this.pukers2, false);
            this.pukerVerticalRight.name = "pukerVerticalRight";
            this.addChild(this.pukerVerticalRight);
            /** 显示上家的牌 */
            this.pukerVerticalLeft = new PukerVerticalContainer(this.pukers3, true);
            this.pukerVerticalLeft.name = "pukerVerticalLeft";
            this.addChild(this.pukerVerticalLeft);
        }
        /** 显示底牌 */
        this.pukerBottom = new PukerBottomContainer(this.pukers4);
        this.pukerBottom.name = "pukerBottom";
        this.addChild(this.pukerBottom);
        /** 显示玩家头像 */
        this.showPortrait(false);
        /** 显示上家头像 */
        this.showOtherPortrait(2, false);
        /** 显示上家头像 */
        this.showOtherPortrait(3, false);
        this.bottom = new BottomContainer(1);
        this.bottom.name = "bottom";
        this.addChild(this.bottom);
    };
    /**
     * 监听点击“出牌”按钮的动作
     * 点击出牌后：
     *  1.从自己牌的数组中移除已选择的牌
     *  2.刷新自己的牌
     *  3.刷新出牌区
     *  4.清空已选择牌的数组
     */
    PlayerP2C.prototype.buttonChuPai = function (evt) {
        if (this.playedSeat != 1) {
            if (!PukerCompareUtils.comparePukers(this.pukerSelectArray, this.playedPuker)) {
                console.log("没有上家的牌大,上家座位号：", this.playedSeat);
                return;
            }
        }
        if (PukerTypeUtils.getType(this.pukerSelectArray) == null) {
            console.log("你这选的是啥呀");
            return;
        }
        this.pukers1 = ArrayUtils.removeElements(this.pukers1, this.pukerSelectArray);
        //刷新自己的牌
        if (this.getChildByName("puker") != null) {
            this.removeChild(this.getChildByName("puker"));
        }
        this.puker = new PukerContainer(this, this.pukers1);
        this.puker.name = "puker";
        this.addChild(this.puker);
        //刷新出牌区
        this.showPukerPlay();
        this.playedPuker = this.pukerSelectArray.sort(PukerUtils.sortDESC);
        this.playedSeat = 1;
        this.playingSeat = 2;
        this.autoPlay();
        //清空已选择的牌数组
        this.pukerSelectArray = new Array();
        this.clearButtons();
    };
    /**
     * 不叫地主，
     * 下家或上家成为地主，得到底牌，
     * 刷新地主头像，刷新地主牌，
     * 叫地主按钮消失，等待地主出牌
     */
    PlayerP2C.prototype.buttonBuJiao = function (evt) {
        console.log("不叫");
        this.clearButtons();
        var randNumber = Math.floor(Math.random() * 2);
        if (randNumber === 0) {
            this.pukers2 = this.pukers2.concat(this.pukers4).sort(PukerUtils.sortDESC);
            if (this.isDevelop)
                this.showPukerVertival(2);
            this.showCount(2, this.pukers2.length);
            this.playingSeat = 2;
            this.landlordSeat = 2;
            this.autoPlay();
            this.showOtherPortrait(2, true);
        }
        else {
            this.pukers3 = this.pukers3.concat(this.pukers4).sort(PukerUtils.sortDESC);
            if (this.isDevelop)
                this.showPukerVertival(3);
            this.showCount(3, this.pukers3.length);
            this.playingSeat = 3;
            this.landlordSeat = 3;
            this.autoPlay();
            this.showOtherPortrait(3, true);
        }
    };
    /**
     * 叫地主，玩家成为地主，玩家得到底牌，刷新玩家的牌
     */
    PlayerP2C.prototype.buttonJiaoDiZhu = function (evt) {
        console.log("叫地主");
        this.pukers1 = this.pukers1.concat(this.pukers4).sort(PukerUtils.sortDESC);
        this.showPukers();
        this.showButtons(2);
        this.showPortrait(true);
    };
    PlayerP2C.prototype.buttonBuQiang = function (evt) {
        console.log("不抢");
    };
    PlayerP2C.prototype.buttonQiangDiZhu = function (evt) {
        console.log("抢地主");
    };
    PlayerP2C.prototype.buttonBuYao = function (evt) {
        if (this.landlordSeat == 1 && this.pukers1.length == 20) {
            console.log("地主首张牌");
        }
        else {
            this.clearButtons();
            this.playingSeat = 2;
            this.autoPlay();
        }
    };
    PlayerP2C.prototype.buttonTiShi = function (evt) {
        //测试判断牌类型
        console.log(PukerTypeUtils.getType(this.pukerSelectArray));
    };
    PlayerP2C.prototype.buttonJieShu = function () {
        var gameHall = new GameHall(this.user);
        gameHall.name = "gameHall";
        this.parent.addChild(gameHall);
        this.parent.removeChild(this);
    };
    PlayerP2C.prototype.buttonZaiLai = function () {
        var playerP2c = new PlayerP2C(this.user);
        this.parent.addChild(playerP2c);
        this.parent.removeChild(this);
    };
    PlayerP2C.prototype.clearPukerPlay = function () {
        if (this.getChildByName("pukerPlay") != null) {
            this.removeChild(this.getChildByName("pukerPlay"));
        }
    };
    PlayerP2C.prototype.showPukerPlay = function () {
        this.clearPukerPlay();
        this.pukerPlay = new PukerPlayContainer(this.pukerSelectArray.sort(PukerUtils.sortDESC));
        this.pukerPlay.name = "pukerPlay";
        this.addChild(this.pukerPlay);
    };
    PlayerP2C.prototype.showResult = function (isVictory) {
        if (this.getChildByName("result") != null) {
            this.removeChild(this.getChildByName("result"));
        }
        var result = new GameResultContainer(isVictory);
        result.name = "result";
        this.addChild(result);
        this.showButtons(3);
    };
    PlayerP2C.prototype.gameOver = function () {
        if (this.pukers1 == null || this.pukers1.length == 0) {
            this.showResult(true);
            return true;
        }
        if (this.pukers2 == null || this.pukers2.length == 0) {
            if (this.landlordSeat !== 3) {
                this.showResult(false);
            }
            else {
                this.showResult(true);
            }
            return true;
        }
        if (this.pukers3 == null || this.pukers3.length == 0) {
            if (this.landlordSeat !== 2) {
                this.showResult(false);
            }
            else {
                this.showResult(true);
            }
            return true;
        }
        return false;
    };
    /**
     * 自动出牌
     * 当轮到玩家出牌时，退出自动出牌，
     * 当轮到系统出牌时，随机延迟一段时间，同时倒计时15秒（相当与人的思考时间）
     */
    PlayerP2C.prototype.autoPlay = function () {
        var _this = this;
        if (this.gameOver())
            return;
        if (this.playingSeat === 1) {
            return;
        }
        this.clearTextTip(this.playingSeat);
        //随机等待0到5秒
        var index = Math.floor(Math.random() * 5) + 1;
        var time = 15;
        this.createTimer(1000, index, function () {
            _this.showOPTimer(time--);
        }, function () {
            _this.clearOPTimer();
            _this.doAutoPlay();
        });
        // this.doAutoPlay();
    };
    PlayerP2C.prototype.doAutoPlay = function () {
        if (this.playingSeat === 2) {
            this.playerPukers2 = PukerSeekUtils.autoPlay(this.pukers2, 2, this.landlordSeat, this.playedPuker, this.playedSeat);
            if (this.playerPukers2 == null || this.playerPukers2.length == 0) {
                this.showTextTip(this.playingSeat);
            }
            else {
                this.showOtherPuker(2);
                this.pukers2 = ArrayUtils.removeElements(this.pukers2, this.playerPukers2).sort(PukerUtils.sortDESC);
                if (this.isDevelop)
                    this.showPukerVertival(2);
                this.playedPuker = this.playerPukers2;
                this.playedSeat = 2;
                this.showCount(2, this.pukers2.length);
                if (this.gameOver())
                    return;
            }
            this.playingSeat = 3;
            this.autoPlay();
        }
        else if (this.playingSeat === 3) {
            this.playerPukers3 = PukerSeekUtils.autoPlay(this.pukers3, 3, this.landlordSeat, this.playedPuker, this.playedSeat);
            if (this.playerPukers3 == null || this.playerPukers3.length == 0) {
                this.showTextTip(this.playingSeat);
            }
            else {
                this.showOtherPuker(3);
                this.pukers3 = ArrayUtils.removeElements(this.pukers3, this.playerPukers3).sort(PukerUtils.sortDESC);
                if (this.isDevelop)
                    this.showPukerVertival(3);
                this.playedPuker = this.playerPukers3;
                this.playedSeat = 3;
                this.showCount(3, this.pukers3.length);
                if (this.gameOver())
                    return;
            }
            this.playingSeat = 1;
            this.clearPukerPlay();
            this.showButtons(2);
        }
    };
    /**
     * 监听点击扑克的动作
     */
    PlayerP2C.prototype.pukerClick = function (evt) {
        var p = RES.getRes("layout_json").puker;
        var y = p.pukerUpMove;
        var draggedObject = evt.currentTarget;
        //显示扑克的y坐标和扑克的名称
        if (draggedObject.y == y) {
            draggedObject.y = 0;
            this.pukerSelectArray.push(parseInt(draggedObject.name));
        }
        else {
            draggedObject.y = y;
            this.pukerSelectArray = ArrayUtils.removeElements(this.pukerSelectArray, [parseInt(draggedObject.name)]);
        }
    };
    PlayerP2C.prototype.test = function () {
        var index = 10;
        this.createTimer(1000, index, function () { console.log(index), index--; }, function () { console.log("计时结束"); });
    };
    PlayerP2C.prototype.createTimer = function (delay, times, timerRun, timerEnd) {
        if (timerRun === void 0) { timerRun = function (times) { }; }
        if (timerEnd === void 0) { timerEnd = function () { }; }
        var timer = new egret.Timer(delay, times);
        timer.addEventListener(egret.TimerEvent.TIMER, timerRun, this);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, timerEnd, this);
        //开始计时
        timer.start();
    };
    /**
     * 清理玩家出牌展示区和不出牌提示区
     * seat 玩家座位号
     */
    PlayerP2C.prototype.clearTextTip = function (seat) {
        if (seat === 3) {
            if (this.getChildByName("pukerLeft") != null) {
                this.removeChild(this.getChildByName("pukerLeft"));
            }
            if (this.getChildByName("textLeft") != null) {
                this.removeChild(this.getChildByName("textLeft"));
            }
        }
        else {
            if (this.getChildByName("pukerRight") != null) {
                this.removeChild(this.getChildByName("pukerRight"));
            }
            if (this.getChildByName("textRight") != null) {
                this.removeChild(this.getChildByName("textRight"));
            }
        }
    };
    /**
     *  展示其他玩家不出牌时的文字提示区
     * seat  玩家座位号
     */
    PlayerP2C.prototype.showTextTip = function (seat) {
        this.clearTextTip(seat);
        if (seat === 3) {
            this.textLeft = new TextOtherContainer(PukerUtils.getRandomTextTip(), true);
            this.textLeft.name = "textLeft";
            this.addChild(this.textLeft);
        }
        else {
            this.textRight = new TextOtherContainer(PukerUtils.getRandomTextTip(), false);
            this.textRight.name = "textRight";
            this.addChild(this.textRight);
        }
    };
    /**
     * 清理玩家的明牌
     * seat  玩家座位号
     */
    PlayerP2C.prototype.clearPukerVertical = function (seat) {
        if (seat === 2) {
            if (this.getChildByName("pukerVerticalRight") != null) {
                this.removeChild(this.getChildByName("pukerVerticalRight"));
            }
        }
        else {
            if (this.getChildByName("pukerVerticalLeft") != null) {
                this.removeChild(this.getChildByName("pukerVerticalLeft"));
            }
        }
    };
    /**
     * 显示其他玩家的明牌
     * seat 玩家座位号
     */
    PlayerP2C.prototype.showPukerVertival = function (seat) {
        this.clearPukerVertical(seat);
        if (seat === 2) {
            this.pukerVerticalRight = new PukerVerticalContainer(this.pukers2, false);
            this.pukerVerticalRight.name = "pukerVerticalRight";
            this.addChild(this.pukerVerticalRight);
        }
        else {
            this.pukerVerticalLeft = new PukerVerticalContainer(this.pukers3, true);
            this.pukerVerticalLeft.name = "pukerVerticalLeft";
            this.addChild(this.pukerVerticalLeft);
        }
    };
    /**
     * 显示其他玩家头像
     * seat 玩家座位号
     * isLandlord 是不是地主
     */
    PlayerP2C.prototype.showOtherPortrait = function (seat, isLandlord) {
        this.clearOtherPortrait(seat);
        if (seat === 3) {
            this.portraitLeft = new PortraitOtherContainer(this.player3, this.poc3Index, true, isLandlord);
            this.portraitLeft.name = "portraitLeft";
            this.addChild(this.portraitLeft);
        }
        else {
            this.portraitRight = new PortraitOtherContainer(this.player2, this.poc2Index, false, isLandlord);
            this.portraitRight.name = "portraitRight";
            this.addChild(this.portraitRight);
        }
    };
    /**
     * 清理其他玩家头像
     * seat 玩家座位号
     */
    PlayerP2C.prototype.clearOtherPortrait = function (seat) {
        if (seat === 3) {
            if (this.getChildByName("portraitLeft") != null) {
                this.removeChild(this.getChildByName("portraitLeft"));
            }
        }
        else {
            if (this.getChildByName("portraitRight") != null) {
                this.removeChild(this.getChildByName("portraitRight"));
            }
        }
    };
    PlayerP2C.prototype.clearPortrait = function () {
        if (this.getChildByName("portrait") != null) {
            this.removeChild(this.getChildByName("portrait"));
        }
    };
    PlayerP2C.prototype.showPortrait = function (isLandlord) {
        this.clearPortrait();
        this.portrait = new PortraitContainer(this.user, this.poc1Index, isLandlord);
        this.portrait.name = "portrait";
        this.addChild(this.portrait);
    };
    /**
     * 清理其他玩家剩余的牌的数量
     * seat 玩家座位号
     */
    PlayerP2C.prototype.clearCount = function (seat) {
        if (seat === 3) {
            if (this.getChildByName("leftCount") != null) {
                this.removeChild(this.getChildByName("leftCount"));
            }
        }
        else {
            if (this.getChildByName("rightCount") != null) {
                this.removeChild(this.getChildByName("rightCount"));
            }
        }
    };
    /**
     * 显示其他玩家剩余的牌的数量
     * seat 玩家座位号
     * count 剩余牌数量
     */
    PlayerP2C.prototype.showCount = function (seat, count) {
        this.clearCount(seat);
        if (seat === 3) {
            this.leftCount = new OtherPukerCountContains(count, true);
            this.leftCount.name = "leftCount";
            this.addChild(this.leftCount);
        }
        else {
            this.rightCount = new OtherPukerCountContains(count, false);
            this.rightCount.name = "rightCount";
            this.addChild(this.rightCount);
        }
    };
    /**
    * 显示其他玩家出的牌
    * seat 座位号
    */
    PlayerP2C.prototype.showOtherPuker = function (seat) {
        this.clearTextTip(seat);
        if (seat === 3) {
            this.pukerLeft = new PukerOtherContainer(this.playerPukers3, true);
            this.pukerLeft.name = "pukerLeft";
            this.addChild(this.pukerLeft);
        }
        else {
            this.pukerRight = new PukerOtherContainer(this.playerPukers2, false);
            this.pukerRight.name = "pukerRight";
            this.addChild(this.pukerRight);
        }
    };
    /**
     * 清理出牌按钮组
     */
    PlayerP2C.prototype.clearButtons = function () {
        if (this.getChildByName("buttons") != null) {
            this.removeChild(this.getChildByName("buttons"));
        }
    };
    /**
     * 显示出牌按钮组
     */
    PlayerP2C.prototype.showButtons = function (type) {
        this.clearButtons();
        this.buttons = new PlayerButtonContainer(this, type);
        this.buttons.name = "buttons";
        this.addChild(this.buttons);
    };
    /**
     * 清理自己的牌
     */
    PlayerP2C.prototype.clearPukers = function () {
        if (this.getChildByName("puker") != null) {
            this.removeChild(this.getChildByName("puker"));
        }
    };
    /**
     * 显示自己的牌
     */
    PlayerP2C.prototype.showPukers = function () {
        this.clearPukers();
        this.puker = new PukerContainer(this, this.pukers1);
        this.puker.name = "puker";
        this.addChild(this.puker);
    };
    PlayerP2C.prototype.clearOPTimer = function () {
        if (this.getChildByName("otherPlayingTimer") != null) {
            this.removeChild(this.getChildByName("otherPlayingTimer"));
        }
    };
    PlayerP2C.prototype.showOPTimer = function (index) {
        this.clearOPTimer();
        var timer = new OtherPlayingTimer(index + "", this.playingSeat === 3);
        timer.name = "otherPlayingTimer";
        this.addChild(timer);
    };
    return PlayerP2C;
}(egret.DisplayObjectContainer));
__reflect(PlayerP2C.prototype, "PlayerP2C");
//# sourceMappingURL=PlayerP2C.js.map