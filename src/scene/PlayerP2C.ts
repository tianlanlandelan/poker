/**
 * 单机游戏场景
 */
class PlayerP2C extends egret.DisplayObjectContainer {

    /**
     * 容器
     */
    //背景
    private layout;
    private textfield: egret.TextField;
    private puker: PukerContainer;//自己的牌
    private pukerPlay: PukerPlayContainer;//自己出的牌
    private pukerRight: PukerOtherContainer;//右边对家（下家）出的牌
    private pukerLeft: PukerOtherContainer;//左边对家（上家）出的牌
    private pukerVerticalRight: PukerVerticalContainer;//下家的明牌（仅明牌时使用）
    private pukerVerticalLeft: PukerVerticalContainer;//上家的明牌（仅明牌时使用）
    private portrait: PortraitContainer;//玩家头像
    private portraitLeft: PortraitOtherContainer;//上家头像
    private portraitRight: PortraitOtherContainer;//下家头像
    private leftCount: OtherPukerCountContains;
    private rightCount: OtherPukerCountContains;
    private pukerBottom: PukerBottomContainer;//底牌
    private textRight: TextOtherContainer;//右边对家（下家）的提示
    private textLeft: TextOtherContainer;//左边对家（上家）的提示
    private buttons: PlayerButtonContainer;

    private bottom: BottomContainer;

    /**
     * 是否是开发模式，开发模式下将显示明牌
     */
    private isDevelop: boolean = true;

    private poc1Index: number = Math.floor(Math.random() * 10) + 1;
    private poc2Index: number = Math.floor(Math.random() * 10) + 1;
    private poc3Index: number = Math.floor(Math.random() * 10) + 1;
    /**
     * 变量
     */

    //测试模拟出牌场景用
    private index: number = 0;
    //玩家座位号
    private mySeat: number = 1;
    //地主座位号
    private landlordSeat: number = 1;
    //当前出牌座位号(现在轮到谁出牌)
    private playingSeat: number = 1;

    /**
     * 当前一手牌
     */
    private playedPuker: Array<Poker> = [];
    private playedSeat: number = 1;

    private player2: any = PukerUtils.randomUsers[Math.floor(Math.random() * PukerUtils.randomUsers.length)];
    private player3: any = PukerUtils.randomUsers[Math.floor(Math.random() * PukerUtils.randomUsers.length)];

    //玩家出的牌
    private playerPukers1: Array<Poker> = new Array<Poker>();
    //上家出的牌
    private playerPukers2: Array<Poker> = new Array<Poker>();
    //下家出的牌
    private playerPukers3: Array<Poker> = new Array<Poker>();

    //玩家选择的牌
    private pukerSelectArray: Array<Poker> = new Array<Poker>();
    /**
     * 发牌
     */
    //初始化一副牌（洗牌）
    private pokers: Array<Poker> = PukerUtils.getRandomPokers();
    //玩家1发到的牌
    private pukers1: Array<Poker> = PukerUtils.sortDescPokers(this.pokers.slice(0, 17));
    //玩家2发到的牌
    private pukers2: Array<Poker> = PukerUtils.sortDescPokers(this.pokers.slice(17, 34));
    //玩家3发到的牌
    private pukers3: Array<Poker> = PukerUtils.sortDescPokers(this.pokers.slice(34, 51));
    //底牌
    private pukers4: Array<Poker> = this.pokers.slice(51);
    private user: any = PukerUtils.randomUsers[Math.floor(Math.random() * PukerUtils.randomUsers.length)];

    // private sound:egret.Sound = RES.getRes("puker_deal_mp3");
    private sound: egret.Sound = RES.getRes("bg_guzheng_mp3");

    private soundChannel: egret.SoundChannel;
	/**
	 * 单机游戏场景
	 */
    public constructor(user: any) {
        super();
        this.user = user;
        this.layout = RES.getRes("layout_json").layout;

        //加载游戏背景
        let sky: Layout = new Layout(this.layout.stageWidth, this.layout.stageHeight);
        this.addChild(sky);

        //加载返回按钮
        let tip:TextTip = new TextTip("返回大厅",10,10,64);
        tip.touchEnabled = true;
        tip.addEventListener(egret.TouchEvent.TOUCH_TAP,this.button_gameOver,this);
		this.addChild(tip);		

        //加载游戏场景，开始游戏
        this.show();
        // this.test();
    }
    /**
     * 发牌，显示一张一张发牌的效果
     * 1.缓慢显示自己的牌
     * 2.缓慢刷新其他玩家的牌的计数
     */
    private initPukers() {
        let index: number = 17;
        let pukers: Array<Poker> = new Array<Poker>();
        let i: number = 0;
        this.soundChannel = this.sound.play(0, 1);
        this.soundChannel.volume = 0.5;
        this.createTimer(300, index,
            () => {
                this.soundChannel.stop();
                console.log("发牌：", i);

                pukers.push(this.pukers1[i]);
                this.clearPukers();
                this.puker = new PukerContainer(this, pukers);
                this.puker.name = "puker";
                this.addChild(this.puker);

                this.showCount(2, i + 1);
                this.showCount(3, i + 1);
                i++;
                this.soundChannel = this.sound.play(0, 1);
            },
            () => {
                console.log("发牌结束");
                /** 显示叫地主按钮 */
                this.showButtons(RoomManager.ButtonsCallTheLandlord);
                this.soundChannel.stop();
            }
        );

    }
    private show() {

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
    }

    /**
     * 监听点击“出牌”按钮的动作
     * 点击出牌后：
     *  1.从自己牌的数组中移除已选择的牌
     *  2.刷新自己的牌
     *  3.刷新出牌区
     *  4.清空已选择牌的数组
     */
    public buttonChuPai(evt: egret.TouchEvent): void {
        if (this.playedSeat != 1) {
            if (!PukerCompareUtils.comparePukers(this.pukerSelectArray, this.playedPuker)) {//当选择的牌没有上家大，不许出牌
                console.log("没有上家的牌大,上家座位号：", this.playedSeat);
                return;
            }
        }
        if (PukerTypeUtils.getType(this.pukerSelectArray) == null) {
            console.log("你这选的是啥呀");
            return;
        }
        this.pukers1 = PukerUtils.removePokers(this.pukers1, this.pukerSelectArray);
        console.log("已出牌，剩余牌数", this.pukers1)
        //刷新自己的牌
        if (this.getChildByName("puker") != null) {
            this.removeChild(this.getChildByName("puker"));
        }
        this.puker = new PukerContainer(this, this.pukers1);
        this.puker.name = "puker";
        this.addChild(this.puker);
        //刷新出牌区
        this.showPukerPlay();

        this.playedPuker = PukerUtils.sortDescPokers(this.pukerSelectArray);
        this.playedSeat = 1;
        this.playingSeat = 2;
        this.autoPlay();

        //清空已选择的牌数组
        this.pukerSelectArray = new Array<Poker>();
        this.clearButtons();
    }

    /**
     * 不叫地主，
     * 下家或上家成为地主，得到底牌，
     * 刷新地主头像，刷新地主牌，
     * 叫地主按钮消失，等待地主出牌
     */
    public buttonBuJiao(evt: egret.TouchEvent): void {
        console.log("不叫");
        this.clearButtons();
        let randNumber: number = Math.floor(Math.random() * 2);
        if (randNumber === 0) {//下家叫地主
            this.pukers2 = PukerUtils.sortDescPokers(this.pukers2.concat(this.pukers4));
            if (this.isDevelop) this.showPukerVertival(2);
            this.showCount(2, this.pukers2.length);
            this.playingSeat = 2;
            this.landlordSeat = 2;
            this.autoPlay();
            this.showOtherPortrait(2, true);
        } else {//上家叫地主
            this.pukers3 = PukerUtils.sortDescPokers(this.pukers3.concat(this.pukers4));
            if (this.isDevelop) this.showPukerVertival(3);
            this.showCount(3, this.pukers3.length);
            this.playingSeat = 3;
            this.landlordSeat = 3
            this.autoPlay();
            this.showOtherPortrait(3, true);
        }

    }
    /**
     * 叫地主，玩家成为地主，玩家得到底牌，刷新玩家的牌
     */
    public buttonJiaoDiZhu(evt: egret.TouchEvent): void {
        console.log("叫地主");
        this.pukers1 = PukerUtils.sortDescPokers(this.pukers1.concat(this.pukers4));
        //清空玩家选择的牌
        this.pukerSelectArray = new Array<Poker>();
        this.showPukers();
        this.showButtons(RoomManager.ButtonsDiscard);
        this.showPortrait(true);
    }

    public buttonBuQiang(evt: egret.TouchEvent): void {
        console.log("不抢");
    }
    public buttonQiangDiZhu(evt: egret.TouchEvent): void {
        console.log("抢地主");
    }
    public buttonBuYao(evt: egret.TouchEvent): void {

        if (this.landlordSeat == 1 && this.pukers1.length == 20) {
            console.log("地主首张牌", this.pukers1.length);
        } else {
            this.clearButtons();
            this.playingSeat = 2;
            this.autoPlay();
        }

    }
    public buttonTiShi(evt: egret.TouchEvent): void {
        //测试判断牌类型
        console.log(PukerTypeUtils.getType(this.pukerSelectArray));
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
     * 再来一局
     */
    public button_restart(): void {
        let playerP2c: PlayerP2C = new PlayerP2C(this.user);
        this.parent.addChild(playerP2c);
        this.parent.removeChild(this);
    }
    private clearPukerPlay() {
        if (this.getChildByName("pukerPlay") != null) {
            this.removeChild(this.getChildByName("pukerPlay"));
        }
    }
    private showPukerPlay() {
        this.clearPukerPlay();
        this.pukerPlay = new PukerPlayContainer(PukerUtils.sortDescPokers(this.pukerSelectArray));
        this.pukerPlay.name = "pukerPlay";
        this.addChild(this.pukerPlay);
    }

    /**
     * 显示游戏结果
     */
    private showResult(isVictory: boolean) {
        if (this.getChildByName("result") != null) {
            this.removeChild(this.getChildByName("result"));
        }
        let result: GameResultContainer = new GameResultContainer(isVictory);
        result.name = "result";
        this.addChild(result);
        this.showButtons(RoomManager.ButtonsGameOver);
    }
    /**
     * 判断游戏是否结束
     */
    private gameOver(): boolean {
        if (this.pukers1 == null || this.pukers1.length == 0) {
            this.showResult(true);
            return true;
        }
        if (this.pukers2 == null || this.pukers2.length == 0) {
            if (this.landlordSeat !== 3) {
                this.showResult(false);
            } else {
                this.showResult(true);
            }

            return true;
        }
        if (this.pukers3 == null || this.pukers3.length == 0) {
            if (this.landlordSeat !== 2) {
                this.showResult(false);
            } else {
                this.showResult(true);
            }
            return true;
        }
        return false;
    }

    /**
     * 自动出牌的控制
     * 当轮到玩家出牌时，退出自动出牌，
     * 当轮到系统出牌时，随机延迟一段时间，同时倒计时15秒（相当与人的思考时间）
     */
    private autoPlay(): void {
        if (this.gameOver()) return;
        if (this.playingSeat === 1) {//玩家出牌，不采用自动出牌模式
            return;
        }
        this.clearTextTip(this.playingSeat);
        //随机等待0到5秒
        let index: number = Math.floor(Math.random() * 5) + 1;
        let time = 15;
        this.createTimer(1000, index,
            () => {
                this.showOPTimer(time--);
            },
            () => {
                this.clearOPTimer();
                this.doAutoPlay();
            }
        );

        // this.doAutoPlay();
    }
    /**
     * 自动出牌执行逻辑
     */
    private doAutoPlay() {
        if (this.playingSeat === 2) {//下家出牌，系统自动出牌
            this.playerPukers2 = PukerSeekUtils.autoPlay(this.pukers2, 2, this.landlordSeat, this.playedPuker, this.playedSeat);
            if (this.playerPukers2 == null || this.playerPukers2.length == 0) {//不出
                this.showTextTip(this.playingSeat);
            } else {//出牌
                this.showOtherPuker(2);
                this.pukers2 = PukerUtils.sortDescPokers(PukerUtils.removePokers(this.pukers2, this.playerPukers2));
                if (this.isDevelop) this.showPukerVertival(2);
                this.playedPuker = this.playerPukers2;
                this.playedSeat = 2;
                this.showCount(2, this.pukers2.length);
                if (this.gameOver()) return;
            }
            this.playingSeat = 3;
            this.autoPlay();
        }
        else if (this.playingSeat === 3) {//上家出牌，系统自动出牌
            this.playerPukers3 = PukerSeekUtils.autoPlay(this.pukers3, 3, this.landlordSeat, this.playedPuker, this.playedSeat);
            if (this.playerPukers3 == null || this.playerPukers3.length == 0) {//不出
                this.showTextTip(this.playingSeat);
            } else {//出牌
                this.showOtherPuker(3);
                this.pukers3 = PukerUtils.sortDescPokers(PukerUtils.removePokers(this.pukers3, this.playerPukers3));

                if (this.isDevelop) this.showPukerVertival(3);
                this.playedPuker = this.playerPukers3;
                this.playedSeat = 3;
                this.showCount(3, this.pukers3.length);
                if (this.gameOver()) return;
            }
            this.playingSeat = 1;
            this.clearPukerPlay();
            this.showButtons(RoomManager.ButtonsDiscard);
        }
    }
    /**
     * 监听点击扑克的动作
     */
    public pukerClick(evt: egret.TouchEvent): void {

        let p = RES.getRes("layout_json").puker;
        let y = p.pukerUpMove;
        let draggedObject: egret.Bitmap = evt.currentTarget;
        //显示扑克的y坐标和扑克的名称
        let id: number = parseInt(draggedObject.name.split(",")[0]);
        let orderValue: number = parseInt(draggedObject.name.split(",")[1]);
        if (draggedObject.y == y) {//选中牌，将牌加入数组
            draggedObject.y = 0;
            this.pukerSelectArray.push(new Poker(id, orderValue));

        } else {//取消选中牌，将牌从数组中移除
            draggedObject.y = y;
            let poker = new Poker(id, orderValue);
            console.log("poker", poker.toString(), "array", this.pukerSelectArray);

            this.pukerSelectArray = PukerUtils.removePokers(this.pukerSelectArray, [poker]);
            console.log("removedArray", this.pukerSelectArray)
        }

    }
    private test() {
        let index = 10;
        this.createTimer(1000, index,
            () => { console.log(index), index-- },
            () => { console.log("计时结束") })
    }
    private createTimer(delay: number, times: number, timerRun = (times: number) => { }, timerEnd = () => { }) {
        var timer: egret.Timer = new egret.Timer(delay, times);
        timer.addEventListener(egret.TimerEvent.TIMER, timerRun, this);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, timerEnd, this);
        //开始计时
        timer.start();
    }

    /**
     * 清理玩家出牌展示区和不出牌提示区
     * seat 玩家座位号
     */
    private clearTextTip(seat: number) {
        if (seat === 3) {
            if (this.getChildByName("pukerLeft") != null) {
                this.removeChild(this.getChildByName("pukerLeft"));
            }
            if (this.getChildByName("textLeft") != null) {
                this.removeChild(this.getChildByName("textLeft"));
            }
        } else {
            if (this.getChildByName("pukerRight") != null) {
                this.removeChild(this.getChildByName("pukerRight"));
            }
            if (this.getChildByName("textRight") != null) {
                this.removeChild(this.getChildByName("textRight"));
            }
        }
    }
    /**
     *  展示其他玩家不出牌时的文字提示区
     * seat  玩家座位号
     */
    private showTextTip(seat: number) {
        this.clearTextTip(seat);
        if (seat === 3) {
            this.textLeft = new TextOtherContainer(PukerUtils.getRandomTextTip(), true);
            this.textLeft.name = "textLeft";
            this.addChild(this.textLeft);
        } else {
            this.textRight = new TextOtherContainer(PukerUtils.getRandomTextTip(), false);
            this.textRight.name = "textRight";
            this.addChild(this.textRight);
        }
    }

    /**
     * 清理玩家的明牌
     * seat  玩家座位号
     */
    private clearPukerVertical(seat: number) {
        if (seat === 2) {
            if (this.getChildByName("pukerVerticalRight") != null) {
                this.removeChild(this.getChildByName("pukerVerticalRight"));
            }
        } else {
            if (this.getChildByName("pukerVerticalLeft") != null) {
                this.removeChild(this.getChildByName("pukerVerticalLeft"));
            }
        }
    }
    /**
     * 显示其他玩家的明牌
     * seat 玩家座位号
     */
    private showPukerVertival(seat: number) {
        this.clearPukerVertical(seat);
        if (seat === 2) {
            this.pukerVerticalRight = new PukerVerticalContainer(this.pukers2, false);
            this.pukerVerticalRight.name = "pukerVerticalRight";
            this.addChild(this.pukerVerticalRight);
        } else {
            this.pukerVerticalLeft = new PukerVerticalContainer(this.pukers3, true);
            this.pukerVerticalLeft.name = "pukerVerticalLeft";
            this.addChild(this.pukerVerticalLeft);
        }
    }
    /**
     * 显示其他玩家头像
     * seat 玩家座位号
     * isLandlord 是不是地主
     */
    private showOtherPortrait(seat: number, isLandlord: boolean) {
        this.clearOtherPortrait(seat);
        if (seat === 3) {
            this.portraitLeft = new PortraitOtherContainer(this.player3, this.poc3Index, true, isLandlord);
            this.portraitLeft.name = "portraitLeft";
            this.addChild(this.portraitLeft);
        } else {
            this.portraitRight = new PortraitOtherContainer(this.player2, this.poc2Index, false, isLandlord);
            this.portraitRight.name = "portraitRight";
            this.addChild(this.portraitRight);
        }

    }
    /**
     * 清理其他玩家头像
     * seat 玩家座位号
     */
    private clearOtherPortrait(seat: number) {
        if (seat === 3) {
            if (this.getChildByName("portraitLeft") != null) {
                this.removeChild(this.getChildByName("portraitLeft"));
            }
        } else {
            if (this.getChildByName("portraitRight") != null) {
                this.removeChild(this.getChildByName("portraitRight"));
            }
        }
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
        this.portrait = new PortraitContainer(this.user, this.poc1Index, isLandlord);
        this.portrait.name = "portrait";
        this.addChild(this.portrait);
    }
    /**
     * 清理其他玩家剩余的牌的数量
     * seat 玩家座位号
     */
    private clearCount(seat: number) {
        if (seat === 3) {
            if (this.getChildByName("leftCount") != null) {
                this.removeChild(this.getChildByName("leftCount"));
            }
        } else {
            if (this.getChildByName("rightCount") != null) {
                this.removeChild(this.getChildByName("rightCount"));
            }
        }
    }
    /**
     * 显示其他玩家剩余的牌的数量
     * seat 玩家座位号
     * count 剩余牌数量
     */
    private showCount(seat: number, count: number) {
        this.clearCount(seat);
        if (seat === 3) {
            this.leftCount = new OtherPukerCountContains(count, true);
            this.leftCount.name = "leftCount";
            this.addChild(this.leftCount);
        } else {
            this.rightCount = new OtherPukerCountContains(count, false);
            this.rightCount.name = "rightCount";
            this.addChild(this.rightCount);
        }
    }
    /** 
    * 显示其他玩家出的牌
    * seat 座位号
    */
    private showOtherPuker(seat: number) {
        this.clearTextTip(seat);
        if (seat === 3) {
            this.pukerLeft = new PukerOtherContainer(this.playerPukers3, true);
            this.pukerLeft.name = "pukerLeft";
            this.addChild(this.pukerLeft);
        } else {
            this.pukerRight = new PukerOtherContainer(this.playerPukers2, false);
            this.pukerRight.name = "pukerRight";
            this.addChild(this.pukerRight);
        }

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
    /**
     * 清理自己的牌
     */
    private clearPukers() {
        if (this.getChildByName("puker") != null) {
            this.removeChild(this.getChildByName("puker"));
        }
    }
    /**
     * 显示自己的牌
     */
    private showPukers() {
        this.clearPukers();
        this.puker = new PukerContainer(this, this.pukers1);
        this.puker.name = "puker";
        this.addChild(this.puker);
    }
    //清理其他玩家出牌的定时器
    private clearOPTimer() {
        if (this.getChildByName("otherPlayingTimer") != null) {
            this.removeChild(this.getChildByName("otherPlayingTimer"));
        }
    }
    //显示其他玩家出牌的定时器
    private showOPTimer(index: number) {
        this.clearOPTimer();
        let timer: OtherPlayingTimer = new OtherPlayingTimer(index + "", this.playingSeat === 3);
        timer.name = "otherPlayingTimer";
        this.addChild(timer);
    }

 
}