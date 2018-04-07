var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HallMenuContainer = (function (_super) {
    __extends(HallMenuContainer, _super);
    function HallMenuContainer(user, gameHall) {
        var _this = _super.call(this) || this;
        _this.show(user, gameHall);
        return _this;
    }
    HallMenuContainer.prototype.show = function (user, gameHall) {
        var menuSetting = new HallMenus("menu_setting_png", 40, 40, 160, 160);
        menuSetting.touchEnabled = true;
        menuSetting.addEventListener(egret.TouchEvent.TOUCH_TAP, this.menuSettingClick, gameHall);
        this.addChild(menuSetting);
        var menuActivity = new HallMenus("menu_activity_png", 40, 220, 160, 160);
        menuActivity.touchEnabled = true;
        menuActivity.addEventListener(egret.TouchEvent.TOUCH_TAP, this.menuActivityClick, gameHall);
        this.addChild(menuActivity);
        var menuCustomerServer = new HallMenus("menu_customerServer_png", 40, 400, 160, 160);
        menuCustomerServer.touchEnabled = true;
        menuCustomerServer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.menuCustomerServerClick, gameHall);
        this.addChild(menuCustomerServer);
        var menuHome = new HallMenus("menu_home_png", 1720, 40, 160, 160);
        menuHome.touchEnabled = true;
        menuHome.addEventListener(egret.TouchEvent.TOUCH_TAP, this.menuHomeClick, gameHall);
        this.addChild(menuHome);
        var menuMessages = new HallMenus("menu_messages_png", 1720, 220, 160, 160);
        menuMessages.touchEnabled = true;
        menuMessages.addEventListener(egret.TouchEvent.TOUCH_TAP, this.menuMessagesClick, gameHall);
        this.addChild(menuMessages);
        var menuFriends = new HallMenus("menu_friends_png", 1720, 400, 160, 160);
        menuFriends.touchEnabled = true;
        menuFriends.addEventListener(egret.TouchEvent.TOUCH_TAP, this.menuFriendsClick, gameHall);
        this.addChild(menuFriends);
        var menuShop = new HallMenus("menu_shop_png", 1280, 900, 160, 160);
        menuShop.touchEnabled = true;
        menuShop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.menuShopClick, gameHall);
        this.addChild(menuShop);
        var menuPackage = new HallMenus("menu_package_png", 1500, 900, 160, 160);
        menuPackage.touchEnabled = true;
        menuPackage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.menuPackageClick, gameHall);
        this.addChild(menuPackage);
        var menuPet = new HallMenus("menu_pet_png", 1720, 900, 160, 160);
        menuPet.touchEnabled = true;
        menuPet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.menuPetClick, gameHall);
        this.addChild(menuPet);
        var menuOfflineMode = new HallMenus("menu_offlineMode_png", 400, 200, 300, 520);
        menuOfflineMode.touchEnabled = true;
        menuOfflineMode.addEventListener(egret.TouchEvent.TOUCH_TAP, gameHall.menuOfflineModeClick, gameHall);
        this.addChild(menuOfflineMode);
        var menuClassicMode = new HallMenus("menu_classicMode_png", 810, 200, 300, 520);
        menuClassicMode.touchEnabled = true;
        menuClassicMode.addEventListener(egret.TouchEvent.TOUCH_TAP, gameHall.menuClassicModeClick, gameHall);
        this.addChild(menuClassicMode);
        var menuFriendMode = new HallMenus("menu_friendMode_png", 1210, 200, 300, 520);
        menuFriendMode.touchEnabled = true;
        menuFriendMode.addEventListener(egret.TouchEvent.TOUCH_TAP, gameHall.menuFriendModeClick, gameHall);
        this.addChild(menuFriendMode);
    };
    HallMenuContainer.prototype.menuSettingClick = function () {
        console.log("menuSettingClick---");
    };
    HallMenuContainer.prototype.menuActivityClick = function () {
        console.log("menuActivityClick---");
    };
    HallMenuContainer.prototype.menuCustomerServerClick = function () {
        console.log("menuCustomerServerClick---");
    };
    HallMenuContainer.prototype.menuHomeClick = function () {
        console.log("menuHomeClick---");
    };
    HallMenuContainer.prototype.menuMessagesClick = function () {
        console.log("menuMessagesClick---");
    };
    HallMenuContainer.prototype.menuFriendsClick = function () {
        console.log("menuFriendsClick---");
    };
    HallMenuContainer.prototype.menuShopClick = function () {
        console.log("menuShopClick---");
        var shop = new Shop();
        this.parent.addChild(shop);
        this.parent.removeChild(this);
    };
    HallMenuContainer.prototype.menuPackageClick = function () {
        console.log("menuPackageClick---");
    };
    HallMenuContainer.prototype.menuPetClick = function () {
        console.log("menuPetClick---");
    };
    return HallMenuContainer;
}(egret.DisplayObjectContainer));
__reflect(HallMenuContainer.prototype, "HallMenuContainer");
//# sourceMappingURL=HallMenuContainer.js.map