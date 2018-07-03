class CommodityContainer extends egret.DisplayObjectContainer{

	public constructor(commodity:any,x:number,y:number) {
		super();
		this.x = x ;
		this.y = y ;
		this.width = 360;
		this.height = 600;
		this.commodityNumber = commodity.initNumber;
		this.minNumber = commodity.minNumber;
		this.price = commodity.price;
		this.commodityName = commodity.name;
		this.commodityDescribe = commodity.describe;
		this.totalCurrency = this.commodityNumber * this.price;
		this.show(commodity.imgUrl);
	}
	private commodityDescribe:string;
	private commodityName:string ;
	private price:number;
	private commodityNumber:number ;
	private minNumber:number;
	private totalCurrency:number;
	private show(name:string){
		let bg = new HallMenus("shop_bgImg_png",0,0,this.width,this.height);
		this.addChild(bg);

		let commodity = new HallMenus(name,130,50,100,100);
		this.addChild(commodity);

		let nameBgImg = new HallMenus("shop_name_bgImg_png",70,170,220,60);
		this.addChild(nameBgImg);
		this.showName();
		this.showDescribe();
		/*
		 *  购买数量控制模块开始
		 */
		//减少
		let subtractButton = new HallMenus("shop_button_subtract_png",50,402,36,36);
		subtractButton.touchEnabled = true;
		subtractButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.subtractButtonClick,this);
		this.addChild(subtractButton);

		//购买数量的背景框
		let inputBgImg = new HallMenus("shop_input_bgImg_png",108,400,144,40);
		this.addChild(inputBgImg);

		//显示购买数量
		this.showNumber();

		//增加
		let addButton = new HallMenus("shop_button_add_png",270,402,36,36);
		addButton.touchEnabled = true;
		addButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.addButtonClick,this);
		this.addChild(addButton);
		/*
		 * 购买数量控制模块结束
		 */
		

		let buyButton = new HallMenus("shop_button_buy_png",80,495,200,50);
		buyButton.touchEnabled = true;
		buyButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.buyButtonClick,this);
		this.addChild(buyButton);

		let currency = new HallMenus("currency_copper_png",90,500,40,40);
		this.addChild(currency);
		this.showTotal();
		
		
		
		
	}
	private buyButtonClick(){
		console.log("商品名",this.commodityName,"单价",this.price,"购买数量",this.commodityNumber,"总价",this.totalCurrency,"描述",this.commodityDescribe,"描述文字长度",this.commodityDescribe.length);
	}
	private showDescribe(){
		
		if(this.getChildByName("commodityDescribe") != null){
			this.removeChild(this.getChildByName("commodityDescribe"));
		}
		var label:egret.TextField = new egret.TextField(); 
		label.name = "commodityDescribe";
		let text:string = this.commodityDescribe;
		if(text.length > 26){
			text = text.substr(0,26) + "..."
		}

    	label.text = "  " + text; 
		label.textColor = 0x231815;
		label.size = 32;
		label.fontFamily = "KaiTi";
		label.x = 30;
		label.y = 250;
		label.width = 300;
    	this.addChild( label );
	}
	private showName(){
		if(this.getChildByName("commodityName") != null){
			this.removeChild(this.getChildByName("commodityName"));
		}
		var label:egret.TextField = new egret.TextField(); 
		label.name = "commodityName";
		let name:string = this.commodityName;
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
		label.y = 176;
		label.width = 300;
    	this.addChild( label );
	}
	private showNumber(){
		if(this.getChildByName("commodityNumber") != null){
			this.removeChild(this.getChildByName("commodityNumber"));
		}
		var label:egret.TextField = new egret.TextField(); 
		label.name = "commodityNumber";
    	label.text = this.commodityNumber + ""; 
		label.textColor = 0xffffff;
		label.size = 32;
		/**
		 * 设置字体大小为32，但文本是数字，实际宽度只有16，所以原来的居中对齐公式失效，需要再除一个2才可以
		 */
		// label.x = 180 - label.size * label.text.length / 2;
		label.x = 180 - label.size * label.text.length / 4;
		label.y = 404;
    	this.addChild( label );
	}
	private showTotal(){
		if(this.getChildByName("totalCurrency") != null){
			this.removeChild(this.getChildByName("totalCurrency"));
		}
		var label:egret.TextField = new egret.TextField(); 
		label.name = "totalCurrency";
		label.text = this.totalCurrency + ""; 
		label.textColor = 0xffffff;
		label.size = 32;
		label.x = 180 - label.size * label.text.length / 4;
		label.y = 504;
    	this.addChild( label );
	}
	private subtractButtonClick(){
		
		this.commodityNumber = this.commodityNumber - this.minNumber;
		if(this.commodityNumber < this.minNumber){
			this.commodityNumber = this.minNumber;
		}
		this.totalCurrency = this.commodityNumber * this.price;
		this.showNumber();
		this.showTotal();
	}
	private addButtonClick(){
		this.commodityNumber = this.commodityNumber + this.minNumber;
		this.totalCurrency = this.commodityNumber * this.price;
		this.showNumber();
		this.showTotal();
	}
	
	//TODO  显示商品详情页，移除商品列表页
	private removeAll(){
		console.log(this.name);
		this.parent.parent.removeChild(this.parent);
	}


}