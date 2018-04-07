var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ShopContainer = (function (_super) {
    __extends(ShopContainer, _super);
    /**
     * 显示商品的容器
     * type 商品类型 0:游戏道具  1:宠物道具
     */
    function ShopContainer(type) {
        var _this = _super.call(this) || this;
        /**
         * 商品规则
         * 商品名不能超过4个字符
         * 商品描述不能超过26个字符
         */
        _this.gameShop = [
            { name: "记牌器", imgUrl: "shop_ssb_png", price: 10, initNumber: 1, minNumber: 1, describe: "可以记录对手所剩的牌，有效期一天" },
            { name: "保险箱", imgUrl: "shop_nest_png", price: 10, initNumber: 1, minNumber: 1, describe: "可以存放一部分贝壳，存放的贝壳不参与结算，有效期一天" },
            { name: "超级加倍", imgUrl: "shop_milk_png", price: 100, initNumber: 1, minNumber: 1, describe: "使用后可以使当局倍数乘以4，使用一次后失效" },
            { name: "先手卡", imgUrl: "shop_egg_png", price: 100, initNumber: 1, minNumber: 1, describe: "使用后可以在不明牌的情况下先手叫地主" }
        ];
        _this.petShop = [
            { name: "包子", imgUrl: "shop_ssb_png", price: 10, initNumber: 10, minNumber: 10, describe: "宠物幼年时食用包子成长，宠物长大后不再需要" },
            { name: "牛奶", imgUrl: "shop_milk_png", price: 10, initNumber: 10, minNumber: 10, describe: "宠物消耗的能量只能通过喝牛奶恢复" },
            { name: "宠物蛋", imgUrl: "shop_egg_png", price: 100, initNumber: 1, minNumber: 1, describe: "宠物蛋会孵化出一个随机宠物，不同的宠物拥有不同的技能" },
            { name: "宠物窝", imgUrl: "shop_nest_png", price: 100, initNumber: 1, minNumber: 1, describe: "宠物窝用来孵化宠物蛋，一个宠物窝只能孵化一个宠物蛋" }
        ];
        _this.initX = 100;
        _this.initY = 150;
        _this.initW = 360;
        _this.spaceX = 100;
        _this.containerName = "commodity_";
        _this.x = 0;
        _this.y = 0;
        _this.width = 1920;
        _this.height = 1080;
        _this.type = type;
        _this.show();
        return _this;
    }
    ShopContainer.prototype.show = function () {
        var gameButton = new HallMenus("shop_name_bgImg_png", 100, 50, 200, 50);
        gameButton.touchEnabled = true;
        gameButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gameButtonClick, this);
        this.addChild(gameButton);
        this.showName();
        var petButton = new HallMenus("shop_button_buy_png", 400, 50, 200, 50);
        petButton.touchEnabled = true;
        petButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.petButtonClick, this);
        this.addChild(petButton);
        this.showCommodity();
    };
    ShopContainer.prototype.showName = function () {
        var label = new egret.TextField();
        var name = "宠物道具";
        if (name.length > 4) {
            name = name.substr(0, 4);
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
        this.addChild(label);
    };
    /**
     * 显示游戏道具
     */
    ShopContainer.prototype.gameButtonClick = function () {
        if (this.type != 0) {
            this.type = 0;
            this.showCommodity();
        }
    };
    /**
     * 显示宠物道具
     */
    ShopContainer.prototype.petButtonClick = function () {
        if (this.type != 1) {
            this.type = 1;
            this.showCommodity();
        }
    };
    /**
     * 显示道具
     */
    ShopContainer.prototype.showCommodity = function () {
        var commoditys = this.gameShop;
        var cleanLength = this.petShop.length;
        if (this.type === 1) {
            commoditys = this.petShop;
            cleanLength = this.gameShop.length;
        }
        //先清理界面上已经存在的道具
        for (var i = 0; i < cleanLength; i++) {
            var name_1 = this.containerName + i;
            if (this.getChildByName(name_1) != null) {
                this.removeChild(this.getChildByName(name_1));
            }
        }
        /**
         * 显示道具
         */
        for (var i = 0; i < commoditys.length; i++) {
            //只能显示4种道具，超出的不显示
            if (i >= 4) {
                break;
            }
            var x = this.initX + i * this.initW + i * this.spaceX;
            var y = this.initY;
            var commodity = new CommodityContainer(commoditys[i], x, y);
            commodity.name = this.containerName + i;
            this.addChild(commodity);
        }
    };
    return ShopContainer;
}(egret.DisplayObjectContainer));
__reflect(ShopContainer.prototype, "ShopContainer");
//# sourceMappingURL=ShopContainer.js.map