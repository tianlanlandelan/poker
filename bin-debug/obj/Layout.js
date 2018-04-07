var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Layout = (function (_super) {
    __extends(Layout, _super);
    /**
     * 背景布局
     * width 背景的宽
     * height 背景的高
     *
     */
    function Layout(width, height) {
        var _this = _super.call(this, RES.getRes("gameBgImg_png")) || this;
        _this.width = width;
        _this.height = height;
        return _this;
        // this.alpha = 0.3;
    }
    return Layout;
}(egret.Bitmap));
__reflect(Layout.prototype, "Layout");
//# sourceMappingURL=Layout.js.map