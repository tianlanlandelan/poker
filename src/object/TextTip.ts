class TextTip extends egret.TextField {
	/**
	 * 文字提示
	 */
	public constructor(text:string,x:number,y:number,size:number) {
		super();
		this.x = x;
		this.y = y;
		this.textColor = 0x778899;
		this.size = size;
		this.fontFamily = "KaiTi";
		this.textAlign = egret.HorizontalAlign.CENTER;
		this.text = text;
	}
}