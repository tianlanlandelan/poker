var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PukerPlayContainer = (function (_super) {
    __extends(PukerPlayContainer, _super);
    /**
     * 标准扑克容器，控制自己的牌
     * 这个容器支持点击选牌操作，可以用来做斗地主、跑得快等
     * arrays 扑克id的数组
     * x 扑克的x坐标
     */
    function PukerPlayContainer(arrays) {
        var _this = _super.call(this) || this;
        var pc = RES.getRes("layout_json").pukerPlayerContainer;
        _this.x = pc.x;
        _this.y = pc.y;
        _this.width = pc.width;
        _this.height = pc.height;
        //添加bg是为了在开发时观察Container的范围
        // let bg:egret.Shape = new egret.Shape();
        // bg.graphics.beginFill( 0x113355);
        // bg.graphics.drawRect( 0, 0, this.width, this.height ); 
        // bg.graphics.endFill();
        // bg.alpha = 0.3;
        // this.addChild(bg);
        _this.show(arrays);
        return _this;
    }
    PukerPlayContainer.prototype.show = function (arrays) {
        var p = RES.getRes("layout_json").puker;
        var x = (20 - arrays.length) * 0.5 * p.pukerPlaySpace; //居中排列
        for (var i = 0; i < arrays.length; i++) {
            var puker = new Puker(arrays[i], x + i * p.pukerPlaySpace, 0, p.pukerPlayWidth, p.pukerPlayHeight);
            this.addChild(puker);
        }
    };
    return PukerPlayContainer;
}(egret.DisplayObjectContainer));
__reflect(PukerPlayContainer.prototype, "PukerPlayContainer");
//# sourceMappingURL=PukerPlayContainer.js.map