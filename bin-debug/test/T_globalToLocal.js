var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var T_globalToLocal = (function (_super) {
    __extends(T_globalToLocal, _super);
    /**
    * 演示本地坐标和舞台坐标的转换
    */
    function T_globalToLocal() {
        var _this = _super.call(this) || this;
        var container = new egret.DisplayObjectContainer();
        container.x = 200;
        container.y = 200;
        _this.addChild(container);
        //画一个红色的圆，添加到 container 中
        var circle = new egret.Shape();
        circle.graphics.beginFill(0xff0000);
        circle.graphics.drawCircle(25, 25, 25);
        circle.graphics.endFill();
        container.addChild(circle);
        //给圆增加点击事件
        circle.touchEnabled = true;
        circle.addEventListener(egret.TouchEvent.TOUCH_TAP, onClick, _this);
        function onClick() {
            //把舞台左上角的坐标(0,0)转换为 container 内部的坐标
            var targetPoint = container.globalToLocal(0, 0);
            //重新定位圆，可以看到圆形移到了屏幕的左上角
            circle.x = targetPoint.x;
            circle.y = targetPoint.y;
        }
        return _this;
    }
    return T_globalToLocal;
}(egret.DisplayObjectContainer));
__reflect(T_globalToLocal.prototype, "T_globalToLocal");
//# sourceMappingURL=T_globalToLocal.js.map