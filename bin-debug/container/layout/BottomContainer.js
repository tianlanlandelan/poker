var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *
 * 通用的Bottom容器，定义各个场景中的Bottom
 */
var BottomContainer = (function (_super) {
    __extends(BottomContainer, _super);
    /**
     * 通用的Bottom容器
     * type 容器类型 0:大厅的bottom 1:房间的bottom
     */
    function BottomContainer(type) {
        var _this = _super.call(this) || this;
        var pc;
        if (type === 0) {
            pc = RES.getRes("layout_json").hallBottomContainer;
            _this.showHallBottom();
        }
        else {
            pc = RES.getRes("layout_json").bottomContainer;
            _this.showRoomBottom();
        }
        _this.x = pc.x;
        _this.y = pc.y;
        _this.width = pc.width;
        _this.height = pc.height;
        // 添加bg是为了在开发时观察Container的范围
        var bg = new egret.Shape();
        bg.graphics.beginFill(0xBFBC9B);
        bg.graphics.drawRect(0, 0, _this.width, _this.height);
        bg.graphics.endFill();
        // bg.alpha = 0.3;
        _this.addChild(bg);
        return _this;
    }
    BottomContainer.prototype.showHallBottom = function () {
    };
    BottomContainer.prototype.showRoomBottom = function () {
        var textTip = new TextTip("贝壳：3000", 40, 6, 32);
        this.addChild(textTip);
        var text2 = new TextTip("铜板：200", 300, 6, 32);
        this.addChild(text2);
        var text3 = new TextTip("宠物头像   宠物技能", 600, 6, 32);
        this.addChild(text3);
    };
    return BottomContainer;
}(egret.DisplayObjectContainer));
__reflect(BottomContainer.prototype, "BottomContainer");
//# sourceMappingURL=BottomContainer.js.map