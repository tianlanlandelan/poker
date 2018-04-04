var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OtherPukerCountContains = (function (_super) {
    __extends(OtherPukerCountContains, _super);
    /**
     * 显示对手剩余的牌的数量
     * isLeft 是否是左边的玩家
     */
    function OtherPukerCountContains(count, isLeft) {
        var _this = _super.call(this) || this;
        var pc = RES.getRes("layout_json").otherPukerCountContainer;
        if (isLeft) {
            _this.x = pc.leftX;
        }
        else {
            _this.x = pc.rightX;
        }
        _this.y = pc.y;
        _this.width = pc.width;
        _this.height = pc.height;
        //添加bg是为了在开发时观察Container的范围
        // let bg:egret.Shape = new egret.Shape();
        // bg.graphics.beginFill( 0x112233);
        // bg.graphics.drawRect( 0, 0, this.width, this.height ); 
        // bg.graphics.endFill();
        // bg.alpha = 0.5;
        // this.addChild(bg);
        var pukerCount = new TextTip(count + "", 0, 100, 32);
        pukerCount.width = 100;
        _this.addChild(pukerCount);
        return _this;
    }
    return OtherPukerCountContains;
}(egret.DisplayObjectContainer));
__reflect(OtherPukerCountContains.prototype, "OtherPukerCountContains");
