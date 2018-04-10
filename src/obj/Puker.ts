class Puker extends egret.Bitmap {
  /**
   * 创建一个标准的扑克牌对象
   * index 扑克index
   * x 扑克的x坐标
   * y 扑克的y坐标
   * w 扑克的宽
   * h 扑克的高
   */
	public constructor(index:number,x:number,y:number,w:number,h:number) {
		var pukerName:string = index + "_png";
    super(RES.getRes(pukerName));
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.name = index + "";
	}
}