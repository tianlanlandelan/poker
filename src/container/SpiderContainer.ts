class SpiderContainer extends egret.DisplayObjectContainer{
	/**
	 * 标准扑克容器，控制自己的牌
	 * 这个容器支持移动牌的操作，可以用来做蜘蛛纸牌
	 * arrays 扑克id的数组
	 * x 扑克的x坐标
	 */
	public constructor(arrays:Array<Poker>,x) {
		super();
		//加载配置参数
		this.layout = RES.getRes("layout_json").layout;

		this.x = 0;
		this.y = 100;
		this.width = 900;
		this.height = 400;
		
		//添加bg是为了在开发时观察Container的范围
		// let bg:egret.Shape = new egret.Shape();
		// bg.graphics.beginFill( 0x778899);
    	// bg.graphics.drawRect( 0, 0, this.width, this.height ); 
    	// bg.graphics.endFill();
		// bg.alpha = 0.3;
		// this.addChild(bg);

		this.show(arrays,x);
    
	}
	/**
	 * 配置参数
	 */
	private layout ;
  	private show(arrays:Array<Poker>,x){
		for(var i = 0; i < arrays.length;i++){
			let puker:Puker = new Puker(arrays[i],
			x + (i+1) * this.layout.pukerBigSpace,20,
			this.layout.pukerBigWidth,this.layout.pukerBigHeight);
			puker.touchEnabled = true;
			//显示对象的TOUCH_TAP事件和TOUCH_MOVE事件会冲突
			// puker.addEventListener(egret.TouchEvent.TOUCH_TAP,this.pukerClick,this);
			puker.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.pukerStartMove,this);
			puker.addEventListener(egret.TouchEvent.TOUCH_END,this.pukerStopMove,this);
			this.addChild(puker);
		}
	  	
	}
	private draggedObject:egret.Bitmap;
	private offsetX:number;
	private offsetY:number;

  /**
   * 开始移动扑克
   * 计算手指的位置，将要移动的扑克放在最前面
   */
  private pukerStartMove(evt:egret.TouchEvent):void{
      this.draggedObject = evt.currentTarget;
      this.offsetX = evt.stageX - this.draggedObject.x;
      this.offsetY = evt.stageY - this.draggedObject.y;
	  this.addChild(this.draggedObject);
	  console.log("dd:",super.getChildIndex( this.draggedObject ));
      this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.pukerMove,this);
  }
  /**
   * 移动扑克
   * 跟随手指的移动移动扑克位置
   */
  private pukerMove(evt:egret.TouchEvent):void{
      this.draggedObject.x = evt.stageX - this.offsetX;
      this.draggedObject.y = evt.stageY - this.offsetY;
  }
  /**
   * 结束移动扑克
   * 移除掉扑克的TOUCH_MOVE监听
   */
  private pukerStopMove(evt:egret.TouchEvent):void{
	  //显示扑克的y坐标和扑克的名称
	  console.log("pukerClick: y:",this.draggedObject.y,this.draggedObject.name);
      this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.pukerMove,this);
  }
}