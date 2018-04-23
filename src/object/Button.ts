class Button extends egret.Bitmap {
  /**
   * 创建一个标准的按钮对象
   * 
   * x 按钮的x坐标
   * y 按钮的y坐标
   * w 按钮的宽
   * h 按钮的高
   */
	public constructor(type:string,x,y,w,h) {
		let buttonName:string = "button_" + type + "_png";
		super(RES.getRes(buttonName));
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;
		this.name = type + x;
		//设置九宫格
		// var rect:egret.Rectangle = new egret.Rectangle(60,30,80,20);
		// this.scale9Grid =rect;
	}
}