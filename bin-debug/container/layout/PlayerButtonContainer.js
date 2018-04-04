var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 通用的游戏按钮容器，定义游戏中所有的按钮组
 */
var PlayerButtonContainer = (function (_super) {
    __extends(PlayerButtonContainer, _super);
    /**
     * 标准的斗地主玩家出牌动作按钮组容器
     * 包含:不要、提示、出牌、不可出牌按钮
     * player 当场景要加载该容器时，传入该场景，调用该容器的场景必须实现buttonOkClick(evt:egret.TouchEvent)方法，该方法是用来处理点击出牌按钮后执行的流程
     */
    function PlayerButtonContainer(player, type) {
        var _this = _super.call(this) || this;
        var pc = RES.getRes("layout_json").playerButtonContainer;
        _this.x = pc.x;
        _this.y = pc.y;
        _this.width = pc.width;
        _this.height = pc.height;
        //添加bg是为了在开发时观察Container的范围
        // let bg:egret.Shape = new egret.Shape();
        // bg.graphics.beginFill( 0x112233);
        // bg.graphics.drawRect( 0, 0, this.width, this.height ); 
        // bg.graphics.endFill();
        // bg.alpha = 0.3;
        // this.addChild(bg);
        _this.show(player, type);
        return _this;
    }
    PlayerButtonContainer.prototype.show = function (player, type) {
        if (type == 0) {
            /** 不叫 */
            var buttonTip = new Button("nocall", 150, 0, 300, 200);
            buttonTip.touchEnabled = true;
            buttonTip.addEventListener(egret.TouchEvent.TOUCH_TAP, player.buttonBuJiao, player);
            this.addChild(buttonTip);
            // let textTip:TextTip = new TextTip("不叫",286,6,64);
            // this.addChild(textTip);
            /** 叫地主 */
            var buttonOK = new Button("call", 550, 0, 300, 200);
            buttonOK.touchEnabled = true;
            buttonOK.addEventListener(egret.TouchEvent.TOUCH_TAP, player.buttonJiaoDiZhu, player);
            this.addChild(buttonOK);
        }
        else if (type == 1) {
            /** 不抢 */
            var buttonTip = new Button("pass", 250, 0, 200, 50);
            buttonTip.touchEnabled = true;
            buttonTip.addEventListener(egret.TouchEvent.TOUCH_TAP, player.buttonBuQiang, player);
            this.addChild(buttonTip);
            var textTip = new TextTip("不抢", 286, 6, 64);
            this.addChild(textTip);
            /** 抢地主 */
            var buttonOK = new Button("ok", 550, 0, 200, 50);
            buttonOK.touchEnabled = true;
            buttonOK.addEventListener(egret.TouchEvent.TOUCH_TAP, player.buttonQiangDiZhu, player);
            this.addChild(buttonOK);
            var textOk = new TextTip("抢地主", 554, 6, 64);
            this.addChild(textOk);
        }
        else if (type == 2) {
            /** 不要 */
            var buttonPass = new Button("pass", 25, 0, 300, 200);
            buttonPass.touchEnabled = true;
            buttonPass.addEventListener(egret.TouchEvent.TOUCH_TAP, player.buttonBuYao, player);
            this.addChild(buttonPass);
            // let textPass:TextTip = new TextTip("不要",136,6,64);
            // this.addChild(textPass);
            /** 提示 */
            var buttonTip = new Button("tip", 350, 0, 300, 200);
            buttonTip.touchEnabled = true;
            buttonTip.addEventListener(egret.TouchEvent.TOUCH_TAP, player.buttonTiShi, player);
            this.addChild(buttonTip);
            // let textTip:TextTip = new TextTip("提示",436,6,64);
            // this.addChild(textTip);
            /** 出牌 */
            var buttonOK = new Button("ok", 675, 0, 300, 200);
            buttonOK.touchEnabled = true;
            buttonOK.addEventListener(egret.TouchEvent.TOUCH_TAP, player.buttonChuPai, player);
            this.addChild(buttonOK);
        }
        else if (type == 3) {
            /** 离开房间 */
            var buttonLeave = new Button("leaveRoom", 250, 0, 300, 200);
            buttonLeave.touchEnabled = true;
            buttonLeave.addEventListener(egret.TouchEvent.TOUCH_TAP, player.buttonJieShu, player);
            this.addChild(buttonLeave);
            /** 再来一把 */
            var buttonAgain = new Button("newGame", 550, 0, 300, 200);
            buttonAgain.touchEnabled = true;
            buttonAgain.addEventListener(egret.TouchEvent.TOUCH_TAP, player.buttonZaiLai, player);
            this.addChild(buttonAgain);
        }
    };
    return PlayerButtonContainer;
}(egret.DisplayObjectContainer));
__reflect(PlayerButtonContainer.prototype, "PlayerButtonContainer");
