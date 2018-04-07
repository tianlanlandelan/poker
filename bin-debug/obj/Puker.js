var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Puker = (function (_super) {
    __extends(Puker, _super);
    /**
     * 创建一个标准的扑克牌对象
     * index 扑克index
     * x 扑克的x坐标
     * y 扑克的y坐标
     * w 扑克的宽
     * h 扑克的高
     */
    function Puker(index, x, y, w, h) {
        var _this = this;
        var pukerName = index + "_png";
        _this = _super.call(this, RES.getRes(pukerName)) || this;
        _this.x = x;
        _this.y = y;
        _this.width = w;
        _this.height = h;
        _this.name = index + "";
        return _this;
    }
    return Puker;
}(egret.Bitmap));
__reflect(Puker.prototype, "Puker");
//# sourceMappingURL=Puker.js.map