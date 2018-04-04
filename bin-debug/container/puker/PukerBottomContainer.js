var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PukerBottomContainer = (function (_super) {
    __extends(PukerBottomContainer, _super);
    /**
     * 标准扑克容器，显示底牌
     * 这个容器只能显示牌，不能对牌进行操作
     * arrays 扑克id的数组
     */
    function PukerBottomContainer(arrays) {
        var _this = _super.call(this) || this;
        var pb = RES.getRes("layout_json").pukerBottomContainer;
        _this.x = pb.x;
        _this.y = pb.y;
        _this.width = pb.width;
        _this.height = pb.height;
        //添加bg是为了在开发时观察Container的范围
        // let bg:egret.Shape = new egret.Shape();
        // bg.graphics.beginFill( 0x112233);
        // bg.graphics.drawRect( 0, 0, this.width, this.height ); 
        // bg.graphics.endFill();
        // bg.alpha = 0.5;
        // this.addChild(bg);
        _this.show(arrays);
        return _this;
    }
    PukerBottomContainer.prototype.show = function (arrays) {
        var p = RES.getRes("layout_json").puker;
        var x = 0;
        for (var i = 0; i < arrays.length; i++) {
            var puker = new Puker(arrays[i], x + i * p.pukerSmallSpace, 0, p.pukerSmallWidth, p.pukerSmallHeight);
            this.addChild(puker);
        }
    };
    return PukerBottomContainer;
}(egret.DisplayObjectContainer));
__reflect(PukerBottomContainer.prototype, "PukerBottomContainer");
