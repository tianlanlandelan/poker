class HallMenuContainer extends egret.DisplayObjectContainer{
	public constructor(user:User,gameHall) {
		super();
		this.show(user,gameHall);
	}
	private show(user:User,gameHall){
		let menuSetting:HallMenus = new HallMenus("menu_setting_png",40,40,160,160);
		menuSetting.touchEnabled = true;
		menuSetting.addEventListener(egret.TouchEvent.TOUCH_TAP,this.menuSettingClick,gameHall);
		this.addChild(menuSetting);

		let menuActivity:HallMenus = new HallMenus("menu_activity_png",40,220,160,160);
		menuActivity.touchEnabled = true;
		menuActivity.addEventListener(egret.TouchEvent.TOUCH_TAP,this.menuActivityClick,gameHall);
		this.addChild(menuActivity);

		let menuCustomerServer:HallMenus = new HallMenus("menu_customerServer_png",40,400,160,160);
		menuCustomerServer.touchEnabled = true;
		menuCustomerServer.addEventListener(egret.TouchEvent.TOUCH_TAP,this.menuCustomerServerClick,gameHall);
		this.addChild(menuCustomerServer);

		let menuHome:HallMenus = new HallMenus("menu_home_png",1720,40,160,160);
		menuHome.touchEnabled = true;
		menuHome.addEventListener(egret.TouchEvent.TOUCH_TAP,this.menuHomeClick,gameHall);
		this.addChild(menuHome);

		let menuMessages:HallMenus = new HallMenus("menu_messages_png",1720,220,160,160);
		menuMessages.touchEnabled = true;
		menuMessages.addEventListener(egret.TouchEvent.TOUCH_TAP,this.menuMessagesClick,gameHall);
		this.addChild(menuMessages);

		let menuFriends:HallMenus = new HallMenus("menu_friends_png",1720,400,160,160);
		menuFriends.touchEnabled = true;
		menuFriends.addEventListener(egret.TouchEvent.TOUCH_TAP,this.menuFriendsClick,gameHall);
		this.addChild(menuFriends);

		let menuShop:HallMenus = new HallMenus("menu_shop_png",1280,900,160,160);
		menuShop.touchEnabled = true;
		menuShop.addEventListener(egret.TouchEvent.TOUCH_TAP,this.menuShopClick,gameHall);
		this.addChild(menuShop);

		let menuPackage:HallMenus = new HallMenus("menu_package_png",1500,900,160,160);
		menuPackage.touchEnabled = true;
		menuPackage.addEventListener(egret.TouchEvent.TOUCH_TAP,this.menuPackageClick,gameHall);
		this.addChild(menuPackage);

		let menuPet:HallMenus = new HallMenus("menu_pet_png",1720,900,160,160);
		menuPet.touchEnabled = true;
		menuPet.addEventListener(egret.TouchEvent.TOUCH_TAP,this.menuPetClick,gameHall);
		this.addChild(menuPet);

		
		let menuOfflineMode = new HallMenus("menu_offlineMode_png",400,200,300,520);
		menuOfflineMode.touchEnabled = true;
		menuOfflineMode.addEventListener(egret.TouchEvent.TOUCH_TAP,gameHall.menuOfflineModeClick,gameHall);
		this.addChild(menuOfflineMode);

		let menuClassicMode = new HallMenus("menu_classicMode_png",810,200,300,520);
		menuClassicMode.touchEnabled = true;
		menuClassicMode.addEventListener(egret.TouchEvent.TOUCH_TAP,gameHall.menuClassicModeClick,gameHall);
		this.addChild(menuClassicMode);

		let menuFriendMode = new HallMenus("menu_friendMode_png",1210,200,300,520);
		menuFriendMode.touchEnabled = true;
		menuFriendMode.addEventListener(egret.TouchEvent.TOUCH_TAP,gameHall.menuFriendModeClick,gameHall);
		this.addChild(menuFriendMode);
	}
	private menuSettingClick(){
		console.log("menuSettingClick---");
	}
	private menuActivityClick(){
		console.log("menuActivityClick---");
	}
	private menuCustomerServerClick(){
		console.log("menuCustomerServerClick---");
	}
	private menuHomeClick(){
		console.log("menuHomeClick---");
	}
	private menuMessagesClick(){
		console.log("menuMessagesClick---");
	}
	private menuFriendsClick(){
		console.log("menuFriendsClick---");
	}
	private menuShopClick(){
		console.log("menuShopClick---");
		let shop:Shop = new Shop();
        this.parent.addChild(shop);
		this.parent.removeChild(this);
	}
	private menuPackageClick(){
		console.log("menuPackageClick---");
	}
	private menuPetClick(){
		console.log("menuPetClick---");
	}

}