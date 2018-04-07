var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Shop = (function (_super) {
    __extends(Shop, _super);
    function Shop() {
        var _this = _super.call(this) || this;
        _this.bottomContainer = new BottomContainer(1);
        _this.width = 1920;
        _this.height = 1080;
        //添加bg是为了在开发时观察Container的范围
        var bg = new egret.Shape();
        bg.graphics.beginFill(0xDFDDCD); //#AAD27A
        bg.graphics.drawRect(0, 0, _this.width, _this.height);
        bg.graphics.endFill();
        // bg.alpha = 0.5;
        _this.addChild(bg);
        _this.show();
        return _this;
    }
    Shop.prototype.show = function () {
        this.bottomContainer.name = "bottomContainer";
        this.addChild(this.bottomContainer);
        var shopContainer = new ShopContainer(0);
        this.addChild(shopContainer);
    };
    return Shop;
}(egret.DisplayObjectContainer));
__reflect(Shop.prototype, "Shop");
//# sourceMappingURL=Shop.js.map