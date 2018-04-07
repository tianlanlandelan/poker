var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 用户头像显示容器
 */
var PortraitContainer = (function (_super) {
    __extends(PortraitContainer, _super);
    function PortraitContainer(user, index, isLandlord) {
        var _this = _super.call(this) || this;
        var pc = RES.getRes("layout_json").portraitContainer;
        _this.x = pc.x;
        _this.y = pc.y;
        _this.width = pc.width;
        _this.height = pc.height;
        //添加bg是为了在开发时观察Container的范围
        // let bg:egret.Shape = new egret.Shape();
        // bg.graphics.beginFill( 0x112233);
        // bg.graphics.drawRect( 0, 0, this.width, this.height ); 
        // bg.graphics.endFill();
        // bg.alpha = 0.5;
        // this.addChild(bg);
        var playerName = new TextTip(user.name, 0, 100, 16);
        playerName.width = 100;
        _this.addChild(playerName);
        if (isLandlord) {
            var playerName_1 = new TextTip("地主", 100, 0, 32);
            playerName_1.width = 100;
            _this.addChild(playerName_1);
        }
        _this.show(user.sex, index);
        return _this;
    }
    PortraitContainer.prototype.show = function (sex, index) {
        var portrait = new DefaultPortrait(sex, index, 0, 0, 100, 100);
        this.addChild(portrait);
    };
    return PortraitContainer;
}(egret.DisplayObjectContainer));
__reflect(PortraitContainer.prototype, "PortraitContainer");
//# sourceMappingURL=PortraitContainer.js.map