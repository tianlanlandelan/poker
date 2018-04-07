var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var StartScene = (function (_super) {
    __extends(StartScene, _super);
    function StartScene(user) {
        var _this = _super.call(this) || this;
        _this.sound = RES.getRes("bg_guzheng_mp3");
        _this.user = user;
        _this.show();
        return _this;
    }
    StartScene.prototype.show = function () {
        var layout = RES.getRes("layout_json").layout;
        this.soundChannel = this.sound.play();
        this.soundChannel.volume = 0.3;
        //加载游戏背景图
        var bg = new egret.Bitmap(RES.getRes("startBgImg_png"));
        bg.name = "bgImg";
        this.addChild(bg);
        //加载开始按钮
        var button = new egret.Bitmap(RES.getRes("button_begin_png"));
        button.touchEnabled = true;
        button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startGame, this);
        button.name = "button";
        button.x = 700;
        button.y = 300;
        this.addChild(button);
    };
    /**
     * 点击开始游戏按钮,移除开始界面，进入游戏大厅
     */
    StartScene.prototype.startGame = function (evt) {
        this.soundChannel.stop();
        var gameHall = new GameHall(this.user);
        gameHall.name = "gameHall";
        this.parent.addChild(gameHall);
        this.parent.removeChild(this);
    };
    return StartScene;
}(egret.DisplayObjectContainer));
__reflect(StartScene.prototype, "StartScene");
//# sourceMappingURL=StartScene.js.map