class HallMenus extends egret.Bitmap{
	public constructor(name:string,x:number,y:number,w:number,h:number) {
		super(RES.getRes(name));
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;
		this.name = name + x +"_"+ y;
	}
}