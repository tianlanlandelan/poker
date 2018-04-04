class DefaultPortrait extends egret.Bitmap {
  /**
   * 创建一个默认的头像
   * index 头像index
   * x 头像的x坐标
   * y 头像的y坐标
   * w 头像的宽
   * h 头像的高
   */
	public constructor(sex:string,index:number,x,y,w,h) {
    if(sex !== "man"){
        sex = "lady"
    }
	var portraitName:string =sex  +  "_" + index + "_png";
    super(RES.getRes(portraitName));
	//设置九宫格
	// var rect:egret.Rectangle = new egret.Rectangle(30,30,40,40);
    // this.scale9Grid =rect;
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.name = index + "";
	}
}