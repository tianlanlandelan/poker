var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var T_touchMove = (function (_super) {
    __extends(T_touchMove, _super);
    /**
     * 演示对象的跟随手指移动事件
     */
    function T_touchMove() {
        var _this = _super.call(this) || this;
        //要拖拽的对象
        var draggedObject;
        var offsetX;
        var offsetY;
        //画一个红色的圆
        var circle = new egret.Shape();
        circle.graphics.beginFill(0xff0000);
        circle.graphics.drawCircle(25, 25, 25);
        circle.graphics.endFill();
        _this.addChild(circle);
        //画一个蓝色的正方形
        var square = new egret.Shape();
        square.graphics.beginFill(0x0000ff);
        square.graphics.drawRect(0, 0, 100, 100);
        square.graphics.endFill();
        _this.addChild(square);
        //增加圆形的触摸监听
        circle.touchEnabled = true;
        circle.addEventListener(egret.TouchEvent.TOUCH_BEGIN, startMove, _this);
        circle.addEventListener(egret.TouchEvent.TOUCH_END, stopMove, _this);
        //增加正方形的触摸监听
        square.touchEnabled = true;
        square.addEventListener(egret.TouchEvent.TOUCH_BEGIN, startMove, _this);
        square.addEventListener(egret.TouchEvent.TOUCH_END, stopMove, _this);
        function startMove(e) {
            //把手指按到的对象记录下来
            draggedObject = e.currentTarget;
            //计算手指和要拖动的对象的距离
            offsetX = e.stageX - draggedObject.x;
            offsetY = e.stageY - draggedObject.y;
            //把触摸的对象放在显示列表的顶层
            this.addChild(draggedObject);
            //手指在屏幕上移动，会触发 onMove 方法
            this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, onMove, this);
        }
        function stopMove(e) {
            console.log(22);
            //手指离开屏幕，移除手指移动的监听
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, onMove, this);
        }
        function onMove(e) {
            //通过计算手指在屏幕上的位置，计算当前对象的坐标，达到跟随手指移动的效果
            draggedObject.x = e.stageX - offsetX;
            draggedObject.y = e.stageY - offsetY;
        }
        return _this;
    }
    return T_touchMove;
}(egret.DisplayObjectContainer));
__reflect(T_touchMove.prototype, "T_touchMove");
