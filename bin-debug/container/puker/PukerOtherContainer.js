var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 标准扑克容器，显示其他玩家出的牌
 */
var PukerOtherContainer = (function (_super) {
    __extends(PukerOtherContainer, _super);
    /**
     * 标准扑克容器，显示其他玩家出的牌
     * 这个容器只能显示牌，不能对牌进行操作
     * arrays 扑克id的数组
     * x 扑克的x坐标
     */
    function PukerOtherContainer(arrays, isLeft) {
        var _this = _super.call(this) || this;
        var pc = RES.getRes("layout_json").pukerOtherContainer;
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
        _this.show(arrays, isLeft);
        return _this;
    }
    /**
     * 左边玩家出的牌靠左排列，右边玩家出的牌靠右排列
     */
    PukerOtherContainer.prototype.show = function (arrays, isLeft) {
        var p = RES.getRes("layout_json").puker;
        var x = 0; //默认靠左排列
        if (!isLeft) {
            x = (20 - arrays.length) * p.pukerSmallSpace; //靠右排列
        }
        for (var i = 0; i < arrays.length; i++) {
            var puker = new Puker(arrays[i], x + i * p.pukerSmallSpace, 0, p.pukerSmallWidth, p.pukerSmallHeight);
            this.addChild(puker);
        }
    };
    return PukerOtherContainer;
}(egret.DisplayObjectContainer));
__reflect(PukerOtherContainer.prototype, "PukerOtherContainer");
