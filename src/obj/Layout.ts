class Layout extends egret.Bitmap{
	/**
	 * 背景布局
	 * width 背景的宽
	 * height 背景的高
	 * 
	 */
	public constructor(width,height) {
		super(RES.getRes("gameBgImg_png"));
        this.width = width;
		this.height = height;
		// this.alpha = 0.3;
	}
}