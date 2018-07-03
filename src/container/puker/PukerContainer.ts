class PukerContainer extends egret.DisplayObjectContainer{
	/**
	 * 标准扑克容器，控制自己的牌
	 * 这个容器支持点击选牌操作，可以用来做斗地主、跑得快等
	 * player 场景，当场景加载该容器时，传入该场景，该场景必须实现pukerClick（evt:egret.TouchEvent）方法，用来处理点击扑克后执行的处理流程
	 * arrays 扑克id的数组
	 * x 扑克的x坐标
	 */
	public constructor(player,arrays:Array<Poker>) {
		super();
		let pc = RES.getRes("layout_json").pukerContainer;
		
		this.x = pc.x;
		this.y = pc.y;
		this.width = pc.width;
		this.height = pc.height;
		
		//添加bg是为了在开发时观察Container的范围
		// let bg:egret.Shape = new egret.Shape();
		// bg.graphics.beginFill( 0xffffff);
    	// bg.graphics.drawRect( 0, 0, this.width, this.height ); 
    	// bg.graphics.endFill();
		// bg.alpha = 0.3;
		// this.addChild(bg);

		this.show(player,arrays);
    
	}
	
  	private show(player,arrays:Array<Poker>){
		let p = RES.getRes("layout_json").puker;
		let x = (20 - arrays.length) * 0.5 * p.pukerSpace;//居中排列
		
		for(var i = 0; i < arrays.length;i++){
			let puker:Puker = new Puker(arrays[i],
			x + i * p.pukerSpace,p.pukerUpMove,
			p.pukerWidth,
			p.pukerHeight);
			puker.touchEnabled = true;
			puker.addEventListener(egret.TouchEvent.TOUCH_TAP,player.pukerClick,player);
			this.addChild(puker);
		}
	  	
	}
	public removePukerByNames(name:Array<number>){
		for(var i = 0 ; i < name.length ; i ++){
			if(this.getChildByName(name[i] + "") != null){
				this.removeChild(this.getChildByName(name[i] + ""));
			}
		}
		
	}
	// private draggedObject:egret.Bitmap;
	
	

	/**
	 * 点击扑克
	 * 点击扑克，点击到的扑克向上移动20PX,
	 * 再次点击，扑克回到原位
	 */
// 	private pukerClick(evt:egret.TouchEvent):void{
//       let p = RES.getRes("layout_json").puker;
//       let y = p.pukerUpMove;
// 	  let draggedObject:egret.Bitmap = evt.currentTarget;
// 	  //显示扑克的y坐标和扑克的名称
// 	  console.log("pukerClick: y:",draggedObject.y,draggedObject.name);
//       if(draggedObject.y == y){
//         draggedObject.y = 0;
//       }else{
//         draggedObject.y = y;                
//       }
//   }

}