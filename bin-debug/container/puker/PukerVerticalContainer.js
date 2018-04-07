var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 显示其他玩家的明牌
 */
var PukerVerticalContainer = (function (_super) {
    __extends(PukerVerticalContainer, _super);
    /**
     * 竖着排列的牌，用于显示对手的明牌
     * arrays 扑克id的数组
     * x 扑克的x坐标
     */
    function PukerVerticalContainer(arrays, isLeft) {
        var _this = _super.call(this) || this;
        var pc = RES.getRes("layout_json").pukerVerticalContainer;
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
        // bg.graphics.beginFill( 0x112299);
        // bg.graphics.drawRect( 0, 0, this.width, this.height ); 
        // bg.graphics.endFill();
        // bg.alpha = 0.5;
        // this.addChild(bg);
        _this.show(arrays);
        return _this;
    }
    /**
     * 横着排列
     */
    PukerVerticalContainer.prototype.show = function (arrays) {
        var p = RES.getRes("layout_json").puker;
        var x = 0;
        var y = 0;
        for (var i = 0; i < arrays.length; i++) {
            if (i >= 10) {
                y = 40;
            }
            if (x >= 10) {
                x = x - 10;
            }
            var puker = new Puker(arrays[i], x * p.pukerSmallSpace, y, p.pukerSmallWidth, p.pukerSmallHeight);
            x++;
            this.addChild(puker);
        }
    };
    /**
     * 竖着排列
     */
    PukerVerticalContainer.prototype.show1 = function (arrays) {
        var p = RES.getRes("layout_json").puker;
        var x = 0;
        var y = 0;
        for (var i = 0; i < arrays.length; i++) {
            if (i >= 10) {
                x = p.pukerSmallHeight * 0.3;
            }
            if (y >= 10) {
                y = y - 10;
            }
            var puker = new Puker(arrays[i], x, y * p.pukerSmallSpace, p.pukerSmallWidth, p.pukerSmallHeight);
            y++;
            this.addChild(puker);
        }
    };
    return PukerVerticalContainer;
}(egret.DisplayObjectContainer));
__reflect(PukerVerticalContainer.prototype, "PukerVerticalContainer");
//# sourceMappingURL=PukerVerticalContainer.js.map