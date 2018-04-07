var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HallMenus = (function (_super) {
    __extends(HallMenus, _super);
    function HallMenus(name, x, y, w, h) {
        var _this = _super.call(this, RES.getRes(name)) || this;
        _this.x = x;
        _this.y = y;
        _this.width = w;
        _this.height = h;
        _this.name = name + x + "_" + y;
        return _this;
    }
    return HallMenus;
}(egret.Bitmap));
__reflect(HallMenus.prototype, "HallMenus");
//# sourceMappingURL=HallMenus.js.map