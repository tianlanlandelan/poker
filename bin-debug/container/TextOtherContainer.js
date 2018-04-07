var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TextOtherContainer = (function (_super) {
    __extends(TextOtherContainer, _super);
    /**
     * 其他玩家不出牌时的文字提示
     */
    function TextOtherContainer(text, isLeft) {
        var _this = _super.call(this) || this;
        var pc = RES.getRes("layout_json").textOtherContainer;
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
        _this.show(text, isLeft);
        return _this;
    }
    TextOtherContainer.prototype.show = function (text, isLeft) {
        var x = 0;
        if (!isLeft) {
            x = 16 + (6 - text.length) * 64;
        }
        var tip = new TextTip(text, x, 0, 64);
        this.addChild(tip);
    };
    return TextOtherContainer;
}(egret.DisplayObjectContainer));
__reflect(TextOtherContainer.prototype, "TextOtherContainer");
//# sourceMappingURL=TextOtherContainer.js.map