var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TextTip = (function (_super) {
    __extends(TextTip, _super);
    /**
     * 文字提示
     */
    function TextTip(text, x, y, size) {
        var _this = _super.call(this) || this;
        _this.x = x;
        _this.y = y;
        _this.textColor = 0x778899;
        _this.size = size;
        _this.fontFamily = "KaiTi";
        _this.textAlign = egret.HorizontalAlign.CENTER;
        _this.text = text;
        return _this;
    }
    return TextTip;
}(egret.TextField));
__reflect(TextTip.prototype, "TextTip");
//# sourceMappingURL=TextTip.js.map