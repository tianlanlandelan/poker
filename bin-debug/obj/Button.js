var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Button = (function (_super) {
    __extends(Button, _super);
    /**
     * 创建一个标准的按钮对象
     *
     * x 按钮的x坐标
     * y 按钮的y坐标
     * w 按钮的宽
     * h 按钮的高
     */
    function Button(type, x, y, w, h) {
        var _this = this;
        var buttonName = "button_" + type + "_png";
        _this = _super.call(this, RES.getRes(buttonName)) || this;
        _this.x = x;
        _this.y = y;
        _this.width = w;
        _this.height = h;
        _this.name = type + x;
        return _this;
        //设置九宫格
        // var rect:egret.Rectangle = new egret.Rectangle(60,30,80,20);
        // this.scale9Grid =rect;
    }
    return Button;
}(egret.Bitmap));
__reflect(Button.prototype, "Button");
//# sourceMappingURL=Button.js.map