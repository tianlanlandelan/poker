var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OtherPlayingTimer = (function (_super) {
    __extends(OtherPlayingTimer, _super);
    /**
     * 其他玩家不出牌时的文字提示
     */
    function OtherPlayingTimer(text, isLeft) {
        var _this = _super.call(this) || this;
        var pc = RES.getRes("layout_json").otherPlayingTimer;
        if (isLeft) {
            _this.x = pc.leftX;
        }
        else {
            _this.x = pc.rightX;
        }
        _this.y = pc.y;
        _this.width = pc.width;
        _this.height = pc.height;
        _this.show(text, isLeft);
        return _this;
    }
    OtherPlayingTimer.prototype.show = function (text, isLeft) {
        var tip = new TextTip(text, 0, 0, 48);
        this.addChild(tip);
    };
    return OtherPlayingTimer;
}(egret.DisplayObjectContainer));
__reflect(OtherPlayingTimer.prototype, "OtherPlayingTimer");
//# sourceMappingURL=OtherPlayingTimer.js.map