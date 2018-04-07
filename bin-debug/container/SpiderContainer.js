var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SpiderContainer = (function (_super) {
    __extends(SpiderContainer, _super);
    /**
     * 标准扑克容器，控制自己的牌
     * 这个容器支持移动牌的操作，可以用来做蜘蛛纸牌
     * arrays 扑克id的数组
     * x 扑克的x坐标
     */
    function SpiderContainer(arrays, x) {
        var _this = _super.call(this) || this;
        //加载配置参数
        _this.layout = RES.getRes("layout_json").layout;
        _this.x = 0;
        _this.y = 100;
        _this.width = 900;
        _this.height = 400;
        //添加bg是为了在开发时观察Container的范围
        // let bg:egret.Shape = new egret.Shape();
        // bg.graphics.beginFill( 0x778899);
        // bg.graphics.drawRect( 0, 0, this.width, this.height ); 
        // bg.graphics.endFill();
        // bg.alpha = 0.3;
        // this.addChild(bg);
        _this.show(arrays, x);
        return _this;
    }
    SpiderContainer.prototype.show = function (arrays, x) {
        for (var i = 0; i < arrays.length; i++) {
            var puker = new Puker(arrays[i], x + (i + 1) * this.layout.pukerBigSpace, 20, this.layout.pukerBigWidth, this.layout.pukerBigHeight);
            puker.touchEnabled = true;
            //显示对象的TOUCH_TAP事件和TOUCH_MOVE事件会冲突
            // puker.addEventListener(egret.TouchEvent.TOUCH_TAP,this.pukerClick,this);
            puker.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.pukerStartMove, this);
            puker.addEventListener(egret.TouchEvent.TOUCH_END, this.pukerStopMove, this);
            this.addChild(puker);
        }
    };
    /**
     * 开始移动扑克
     * 计算手指的位置，将要移动的扑克放在最前面
     */
    SpiderContainer.prototype.pukerStartMove = function (evt) {
        this.draggedObject = evt.currentTarget;
        this.offsetX = evt.stageX - this.draggedObject.x;
        this.offsetY = evt.stageY - this.draggedObject.y;
        this.addChild(this.draggedObject);
        console.log("dd:", _super.prototype.getChildIndex.call(this, this.draggedObject));
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.pukerMove, this);
    };
    /**
     * 移动扑克
     * 跟随手指的移动移动扑克位置
     */
    SpiderContainer.prototype.pukerMove = function (evt) {
        this.draggedObject.x = evt.stageX - this.offsetX;
        this.draggedObject.y = evt.stageY - this.offsetY;
    };
    /**
     * 结束移动扑克
     * 移除掉扑克的TOUCH_MOVE监听
     */
    SpiderContainer.prototype.pukerStopMove = function (evt) {
        //显示扑克的y坐标和扑克的名称
        console.log("pukerClick: y:", this.draggedObject.y, this.draggedObject.name);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.pukerMove, this);
    };
    return SpiderContainer;
}(egret.DisplayObjectContainer));
__reflect(SpiderContainer.prototype, "SpiderContainer");
//# sourceMappingURL=SpiderContainer.js.map