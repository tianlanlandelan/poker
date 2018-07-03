class ShopContainer extends egret.DisplayObjectContainer{
	/**
	 * 商品规则
	 * 商品名不能超过4个字符
	 * 商品描述不能超过26个字符
	 */
	private gameShop:Array<any> = [
		{name:"记牌器",imgUrl:"shop_ssb_png",price:10,initNumber:1,minNumber:1,describe:"可以记录对手所剩的牌，有效期一天"},
		{name:"保险箱",imgUrl:"shop_nest_png",price:10,initNumber:1,minNumber:1,describe:"可以存放一部分贝壳，存放的贝壳不参与结算，有效期一天"},
		{name:"超级加倍",imgUrl:"shop_milk_png",price:100,initNumber:1,minNumber:1,describe:"使用后可以使当局倍数乘以4，使用一次后失效"},
		{name:"先手卡",imgUrl:"shop_egg_png",price:100,initNumber:1,minNumber:1,describe:"使用后可以在不明牌的情况下先手叫地主"}
		];
	private petShop:Array<any> = [
		{name:"包子",imgUrl:"shop_ssb_png",price:10,initNumber:10,minNumber:10,describe:"宠物幼年时食用包子成长，宠物长大后不再需要"},
		{name:"牛奶",imgUrl:"shop_milk_png",price:10,initNumber:10,minNumber:10,describe:"宠物消耗的能量只能通过喝牛奶恢复"},
		{name:"宠物蛋",imgUrl:"shop_egg_png",price:100,initNumber:1,minNumber:1,describe:"宠物蛋会孵化出一个随机宠物，不同的宠物拥有不同的技能"},
		{name:"宠物窝",imgUrl:"shop_nest_png",price:100,initNumber:1,minNumber:1,describe:"宠物窝用来孵化宠物蛋，一个宠物窝只能孵化一个宠物蛋"}
		];
	private initX:number = 100;
	private initY:number = 150;
	private initW:number = 360;
	private spaceX:number = 100;

	/**
	 * 显示商品的容器 
	 * type 商品类型 0:游戏道具  1:宠物道具
	 */
	public constructor(type:number) {
		super();
		this.x = 0 ;
		this.y = 0 ;
		this.width = 1920;
		this.height = 1080;
		this.type = type;
		this.show();
		
	}
	private type:number;
	private containerName:string = "commodity_";
	private show(){
		let gameButton = new HallMenus("shop_name_bgImg_png",100,50,200,50);
		gameButton.touchEnabled = true;
		gameButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.gameButtonClick,this);
		this.addChild(gameButton);
		this.showName();
		let petButton = new HallMenus("shop_button_buy_png",400,50,200,50);
		petButton.touchEnabled = true;
		petButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.petButtonClick,this);
		this.addChild(petButton);

		this.showCommodity();
	}
	private showName(){
		var label:egret.TextField = new egret.TextField(); 
		let name:string = "宠物道具";
		if(name.length > 4){
			name = name.substr(0,4);
		}
    	label.text = name; 
		label.textColor = 0x595757;
		label.size = 48;
		label.fontFamily = "KaiTi";
		/**
		 * 设置文字居中对齐
		 */
		label.x = 180 - label.size * label.text.length / 2;
		label.y = 50;
		label.width = 300;
    	this.addChild( label );
	}
	/**
	 * 显示游戏道具
	 */
	private gameButtonClick(){
		if(this.type != 0 ){
			this.type = 0;
			this.showCommodity();
		}
	}
	/**
	 * 显示宠物道具
	 */
	private petButtonClick(){
		if(this.type != 1 ){
			this.type = 1;
			this.showCommodity();
		}
	}
	/**
	 * 显示道具
	 */
	private showCommodity(){
		let commoditys:Array<string> = this.gameShop;
		let cleanLength:number = this.petShop.length;
		if(this.type === 1 ){
			commoditys = this.petShop;
			cleanLength = this.gameShop.length;
		}
		//先清理界面上已经存在的道具
		for(let i = 0 ; i < cleanLength ; i ++){
			let name = this.containerName + i;
			if(this.getChildByName(name) != null){
				this.removeChild(this.getChildByName(name));
			}
		}
		/**
		 * 显示道具
		 */
		for(let i = 0 ; i < commoditys.length ; i ++){
			//只能显示4种道具，超出的不显示
			if(i >= 4){
				break;
			}
			let x = this.initX + i * this.initW + i * this.spaceX;
			let y = this.initY;
			let commodity:CommodityContainer = new CommodityContainer(commoditys[i],x,y);
			commodity.name = this.containerName + i;
			this.addChild(commodity);
		}
	}
	



}