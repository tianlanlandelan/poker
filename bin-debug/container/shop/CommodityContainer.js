var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CommodityContainer = (function (_super) {
    __extends(CommodityContainer, _super);
    function CommodityContainer(commodity, x, y) {
        var _this = _super.call(this) || this;
        _this.x = x;
        _this.y = y;
        _this.width = 360;
        _this.height = 600;
        _this.commodityNumber = commodity.initNumber;
        _this.minNumber = commodity.minNumber;
        _this.price = commodity.price;
        _this.commodityName = commodity.name;
        _this.commodityDescribe = commodity.describe;
        _this.totalCurrency = _this.commodityNumber * _this.price;
        _this.show(commodity.imgUrl);
        return _this;
    }
    CommodityContainer.prototype.show = function (name) {
        var bg = new HallMenus("shop_bgImg_png", 0, 0, this.width, this.height);
        this.addChild(bg);
        var commodity = new HallMenus(name, 130, 50, 100, 100);
        this.addChild(commodity);
        var nameBgImg = new HallMenus("shop_name_bgImg_png", 70, 170, 220, 60);
        this.addChild(nameBgImg);
        this.showName();
        this.showDescribe();
        /*
         *  购买数量控制模块开始
         */
        //减少
        var subtractButton = new HallMenus("shop_button_subtract_png", 50, 402, 36, 36);
        subtractButton.touchEnabled = true;
        subtractButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.subtractButtonClick, this);
        this.addChild(subtractButton);
        //购买数量的背景框
        var inputBgImg = new HallMenus("shop_input_bgImg_png", 108, 400, 144, 40);
        this.addChild(inputBgImg);
        //显示购买数量
        this.showNumber();
        //增加
        var addButton = new HallMenus("shop_button_add_png", 270, 402, 36, 36);
        addButton.touchEnabled = true;
        addButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addButtonClick, this);
        this.addChild(addButton);
        /*
         * 购买数量控制模块结束
         */
        var buyButton = new HallMenus("shop_button_buy_png", 80, 495, 200, 50);
        buyButton.touchEnabled = true;
        buyButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buyButtonClick, this);
        this.addChild(buyButton);
        var currency = new HallMenus("currency_copper_png", 90, 500, 40, 40);
        this.addChild(currency);
        this.showTotal();
    };
    CommodityContainer.prototype.buyButtonClick = function () {
        console.log("商品名", this.commodityName, "单价", this.price, "购买数量", this.commodityNumber, "总价", this.totalCurrency, "描述", this.commodityDescribe, "描述文字长度", this.commodityDescribe.length);
    };
    CommodityContainer.prototype.showDescribe = function () {
        if (this.getChildByName("commodityDescribe") != null) {
            this.removeChild(this.getChildByName("commodityDescribe"));
        }
        var label = new egret.TextField();
        label.name = "commodityDescribe";
        var text = this.commodityDescribe;
        if (text.length > 26) {
            text = text.substr(0, 26) + "...";
        }
        label.text = "  " + text;
        label.textColor = 0x231815;
        label.size = 32;
        label.fontFamily = "KaiTi";
        label.x = 30;
        label.y = 250;
        label.width = 300;
        this.addChild(label);
    };
    CommodityContainer.prototype.showName = function () {
        if (this.getChildByName("commodityName") != null) {
            this.removeChild(this.getChildByName("commodityName"));
        }
        var label = new egret.TextField();
        label.name = "commodityName";
        var name = this.commodityName;
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
        label.y = 176;
        label.width = 300;
        this.addChild(label);
    };
    CommodityContainer.prototype.showNumber = function () {
        if (this.getChildByName("commodityNumber") != null) {
            this.removeChild(this.getChildByName("commodityNumber"));
        }
        var label = new egret.TextField();
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
        this.addChild(label);
    };
    CommodityContainer.prototype.showTotal = function () {
        if (this.getChildByName("totalCurrency") != null) {
            this.removeChild(this.getChildByName("totalCurrency"));
        }
        var label = new egret.TextField();
        label.name = "totalCurrency";
        label.text = this.totalCurrency + "";
        label.textColor = 0xffffff;
        label.size = 32;
        label.x = 180 - label.size * label.text.length / 4;
        label.y = 504;
        this.addChild(label);
    };
    CommodityContainer.prototype.subtractButtonClick = function () {
        this.commodityNumber = this.commodityNumber - this.minNumber;
        if (this.commodityNumber < this.minNumber) {
            this.commodityNumber = this.minNumber;
        }
        this.totalCurrency = this.commodityNumber * this.price;
        this.showNumber();
        this.showTotal();
    };
    CommodityContainer.prototype.addButtonClick = function () {
        this.commodityNumber = this.commodityNumber + this.minNumber;
        this.totalCurrency = this.commodityNumber * this.price;
        this.showNumber();
        this.showTotal();
    };
    //TODO  显示商品详情页，移除商品列表页
    CommodityContainer.prototype.removeAll = function () {
        console.log(this.name);
        this.parent.parent.removeChild(this.parent);
    };
    return CommodityContainer;
}(egret.DisplayObjectContainer));
__reflect(CommodityContainer.prototype, "CommodityContainer");
//# sourceMappingURL=CommodityContainer.js.map