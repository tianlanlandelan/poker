var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameHall = (function (_super) {
    __extends(GameHall, _super);
    function GameHall(user) {
        var _this = _super.call(this) || this;
        _this.topContainer = new TopContainer();
        _this.bottomContainer = new BottomContainer(0);
        _this.menuContainer = new HallMenuContainer(_this.user, _this);
        _this.user = user;
        _this.width = 1920;
        _this.height = 1080;
        //添加bg是为了在开发时观察Container的范围
        var bg = new egret.Shape();
        bg.graphics.beginFill(0xDFDDCD);
        bg.graphics.drawRect(0, 0, _this.width, _this.height);
        bg.graphics.endFill();
        // bg.alpha = 0.5;
        _this.addChild(bg);
        _this.show();
        return _this;
    }
    GameHall.prototype.show = function () {
        this.topContainer.name = "topContainer";
        this.addChild(this.topContainer);
        this.bottomContainer.name = "bottomContainer";
        this.addChild(this.bottomContainer);
        this.menuContainer.name = "menuContainer";
        this.addChild(this.menuContainer);
    };
    GameHall.prototype.menuOfflineModeClick = function () {
        console.log("menuOfflineModeClick---");
        var playerP2c = new PlayerP2C(this.user);
        this.parent.addChild(playerP2c);
        this.parent.removeChild(this);
    };
    GameHall.prototype.menuClassicModeClick = function () {
        console.log("menuClassicModeClick---");
        var player = new PlayerP2P_Single(this.user);
        this.parent.addChild(player);
        this.parent.removeChild(this);
    };
    GameHall.prototype.menuFriendModeClick = function () {
        console.log("menuFriendModeClick---");
    };
    return GameHall;
}(egret.DisplayObjectContainer));
__reflect(GameHall.prototype, "GameHall");
//# sourceMappingURL=GameHall.js.map