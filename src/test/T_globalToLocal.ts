class T_globalToLocal extends egret.DisplayObjectContainer {
	/**
 	* 演示本地坐标和舞台坐标的转换
 	*/
	public constructor() {
		super();
		var container: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
		container.x = 200;
		container.y = 200;
		this.addChild(container);
		//画一个红色的圆，添加到 container 中
		var circle: egret.Shape = new egret.Shape();
		circle.graphics.beginFill(0xff0000);
		circle.graphics.drawCircle(25,25,25);
		circle.graphics.endFill();
		container.addChild(circle);
		//给圆增加点击事件
		circle.touchEnabled = true;
		circle.addEventListener(egret.TouchEvent.TOUCH_TAP,onClick,this);
		function onClick():void{
			//把舞台左上角的坐标(0,0)转换为 container 内部的坐标
			var targetPoint: egret.Point = container.globalToLocal(0,0);
			//重新定位圆，可以看到圆形移到了屏幕的左上角
			circle.x = targetPoint.x;
			circle.y = targetPoint.y;
		}
	}
}



