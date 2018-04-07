var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 通用的游戏结果显示容器，显示游戏结果
 */
var GameResultContainer = (function (_super) {
    __extends(GameResultContainer, _super);
    /**
     * 显示游戏结果
     * isVictory 是否胜利
     */
    function GameResultContainer(isVictory) {
        var _this = _super.call(this) || this;
        var pc = RES.getRes("layout_json").layout;
        _this.x = 0;
        _this.y = 0;
        _this.width = pc.stageWidth;
        _this.height = pc.stageHeight;
        /** 遮罩层 */
        // let bg:egret.Shape = new egret.Shape();
        // bg.graphics.beginFill( 0x112233);
        // bg.graphics.drawRect( 0, 0, this.width, this.height ); 
        // bg.graphics.endFill();
        // bg.alpha = 0.3;
        // this.addChild(bg);
        _this.show(isVictory);
        return _this;
    }
    GameResultContainer.prototype.show = function (isVictory) {
        var text;
        if (isVictory) {
            text = new TextTip("胜利", 800, 700, 128);
        }
        else {
            text = new TextTip("失败", 800, 700, 128);
        }
        this.addChild(text);
    };
    return GameResultContainer;
}(egret.DisplayObjectContainer));
__reflect(GameResultContainer.prototype, "GameResultContainer");
//# sourceMappingURL=GameResultContainer.js.map