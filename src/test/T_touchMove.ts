class T_touchMove extends egret.DisplayObjectContainer{
	/**
	 * 演示对象的跟随手指移动事件
	 */
	public constructor() {
		super();
		      //要拖拽的对象
		var draggedObject:egret.Shape;
		var offsetX:number;
		var offsetY:number;
		//画一个红色的圆
		var circle: egret.Shape = new egret.Shape();
		circle.graphics.beginFill(0xff0000);
		circle.graphics.drawCircle(25,25,25);
		circle.graphics.endFill();
		this.addChild(circle);
		//画一个蓝色的正方形
		var square:egret.Shape = new egret.Shape();
		square.graphics.beginFill(0x0000ff);
		square.graphics.drawRect(0,0,100,100);
		square.graphics.endFill();
		this.addChild(square);
		//增加圆形的触摸监听
		circle.touchEnabled = true;
		circle.addEventListener(egret.TouchEvent.TOUCH_BEGIN,startMove,this);
		circle.addEventListener(egret.TouchEvent.TOUCH_END,stopMove,this);
		//增加正方形的触摸监听
		square.touchEnabled = true;
		square.addEventListener(egret.TouchEvent.TOUCH_BEGIN,startMove,this);
		square.addEventListener(egret.TouchEvent.TOUCH_END,stopMove,this);
		function startMove(e:egret.TouchEvent):void{
			//把手指按到的对象记录下来
			draggedObject = e.currentTarget;
			//计算手指和要拖动的对象的距离
			offsetX = e.stageX - draggedObject.x;
			offsetY = e.stageY - draggedObject.y;
			//把触摸的对象放在显示列表的顶层
			this.addChild(draggedObject);
			//手指在屏幕上移动，会触发 onMove 方法
			this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,onMove,this);
		}
		function stopMove(e:egret.TouchEvent) {console.log(22);
			//手指离开屏幕，移除手指移动的监听
			this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,onMove,this);
		}
		function onMove(e:egret.TouchEvent):void{
			//通过计算手指在屏幕上的位置，计算当前对象的坐标，达到跟随手指移动的效果
			draggedObject.x = e.stageX - offsetX;
			draggedObject.y = e.stageY - offsetY;
		}
	}
	//设定2个偏移量
	// private offsetX:number;
	// private offsetY:number;
	// private onMove(e:egret.TouchEvent):void{
	// 		let circle:egret.Shape = e.currentTarget;
	// 		//通过计算手指在屏幕上的位置，计算当前对象的坐标，达到跟随手指移动的效果
	// 		circle.x = e.stageX - this.offsetX;
	// 		circle.y = e.stageY - this.offsetY;
	// 	}
}