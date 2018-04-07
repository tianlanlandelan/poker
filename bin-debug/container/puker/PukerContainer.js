var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PukerContainer = (function (_super) {
    __extends(PukerContainer, _super);
    /**
     * 标准扑克容器，控制自己的牌
     * 这个容器支持点击选牌操作，可以用来做斗地主、跑得快等
     * player 场景，当场景加载该容器时，传入该场景，该场景必须实现pukerClick（evt:egret.TouchEvent）方法，用来处理点击扑克后执行的处理流程
     * arrays 扑克id的数组
     * x 扑克的x坐标
     */
    function PukerContainer(player, arrays) {
        var _this = _super.call(this) || this;
        var pc = RES.getRes("layout_json").pukerContainer;
        _this.x = pc.x;
        _this.y = pc.y;
        _this.width = pc.width;
        _this.height = pc.height;
        //添加bg是为了在开发时观察Container的范围
        // let bg:egret.Shape = new egret.Shape();
        // bg.graphics.beginFill( 0xffffff);
        // bg.graphics.drawRect( 0, 0, this.width, this.height ); 
        // bg.graphics.endFill();
        // bg.alpha = 0.3;
        // this.addChild(bg);
        _this.show(player, arrays);
        return _this;
    }
    PukerContainer.prototype.show = function (player, arrays) {
        var p = RES.getRes("layout_json").puker;
        var x = (20 - arrays.length) * 0.5 * p.pukerSpace; //居中排列
        for (var i = 0; i < arrays.length; i++) {
            var puker = new Puker(arrays[i], x + i * p.pukerSpace, p.pukerUpMove, p.pukerWidth, p.pukerHeight);
            puker.touchEnabled = true;
            puker.addEventListener(egret.TouchEvent.TOUCH_TAP, player.pukerClick, player);
            this.addChild(puker);
        }
    };
    PukerContainer.prototype.removePukerByNames = function (name) {
        for (var i = 0; i < name.length; i++) {
            if (this.getChildByName(name[i] + "") != null) {
                this.removeChild(this.getChildByName(name[i] + ""));
            }
        }
    };
    return PukerContainer;
}(egret.DisplayObjectContainer));
__reflect(PukerContainer.prototype, "PukerContainer");
//# sourceMappingURL=PukerContainer.js.map