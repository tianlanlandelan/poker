var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PukerUtils = (function () {
    function PukerUtils() {
        this.pukerValues = [1, 1, 1, 1,
            2, 2, 2, 2,
            3, 3, 3, 3,
            4, 4, 4, 4,
            5, 5, 5, 5,
            6, 6, 6, 6,
            7, 7, 7, 7,
            8, 8, 8, 8,
            9, 9, 9, 9,
            10, 10, 10, 10,
            11, 11, 11, 11,
            12, 12, 12, 12,
            13, 13, 13, 13,
            14, 14];
    }
    /**
     * 将一手牌的牌面id的表现形式转化为排序规则的表现形式
     */
    PukerUtils.casePukers = function (a) {
        var aSort = [];
        for (var i = 0; i < a.length; i++) {
            for (var j = 0; j < this.pukerIds.length; j++) {
                if (a[i] == this.pukerIds[j]) {
                    aSort.push(this.pukerOrderValues[j]);
                }
            }
        }
        return aSort;
    };
    /**
     * 正序排列的排序条件
     */
    PukerUtils.sortASC = function (a, b) {
        if (a > b)
            return 1;
        else if (a < b)
            return -1;
        else
            return 0;
    };
    /**
     * 倒序排列的排序条件
     */
    PukerUtils.sortDESC = function (a, b) {
        if (a > b)
            return -1;
        else if (a < b)
            return 1;
        else
            return 0;
    };
    /**
     * 随机生成一副扑克
     */
    PukerUtils.init = function () {
        var length = this.pukerIds.length;
        var index;
        var newArray = this.pukerIds.slice();
        var pukerIndex;
        var array = [];
        for (var i = 0; i < this.pukerIds.length; i++) {
            index = Math.floor(Math.random() * newArray.length);
            pukerIndex = newArray[index];
            array.push(pukerIndex);
            // console.log("value:",newArray[index]);
            // this.slice(newArray,0,index);
            // this.slice(newArray,index + 1,newArray.length);
            newArray = ArrayUtils.slice(newArray, 0, index).concat(ArrayUtils.slice(newArray, index + 1, newArray.length));
            // console.log("newArray:",newArray.toString());
            length--;
        }
        console.log(array.toString());
        return array;
    };
    /**
     * 从一副牌中判断有没有符合条件的顺子
     *
     */
    PukerUtils.findStraight = function () {
        var pattern = /5+6+7+8+9+/;
        var str = "34456667889";
        console.log("test:", pattern.test(str) ? pattern.exec(str) : "没有匹配项");
    };
    /**
     * 从一副牌中判断有没有符合条件的三带
     */
    PukerUtils.findThree = function () {
        var pattern = /7{3,}/;
        var str = "34577789";
        console.log("test:", pattern.test(str) ? pattern.exec(str) : "没有匹配项");
    };
    /**
     * 从一副牌中判断有没有符合条件的对子
     */
    PukerUtils.findPair = function () {
        var pattern = /7{2,}/;
        var str = "34577789";
        console.log("test:", pattern.test(str) ? pattern.exec(str) : "没有匹配项");
    };
    PukerUtils.getRandomUser = function () {
        return this.randomUsers[Math.floor(Math.random() * this.randomUsers.length)];
    };
    PukerUtils.getRandomTextTip = function () {
        return this.textTip[Math.floor(Math.random() * this.textTip.length)];
    };
    return PukerUtils;
}());
/**
 * 牌面对应的牌的大小
 */
PukerUtils.pukerOrderValues = ["D", "D", "D", "D",
    "C", "C", "C", "C",
    "O", "O", "O", "O",
    "N", "N", "N", "N",
    "M", "M", "M", "M",
    "L", "L", "L", "L",
    "K", "K", "K", "K",
    "J", "J", "J", "J",
    "I", "I", "I", "I",
    "H", "H", "H", "H",
    "G", "G", "G", "G",
    "F", "F", "F", "F",
    "E", "E", "E", "E",
    "B", "A" //King
];
/**
 * 牌面的id
 */
PukerUtils.pukerIds = [
    1, 2, 3, 4,
    5, 6, 7, 8,
    9, 10, 11, 12,
    13, 14, 15, 16,
    17, 18, 19, 20,
    21, 22, 23, 24,
    25, 26, 27, 28,
    29, 30, 31, 32,
    33, 34, 35, 36,
    37, 38, 39, 40,
    41, 42, 43, 44,
    45, 46, 47, 48,
    49, 50, 51, 52,
    53, 54
]; //King
PukerUtils.randomUsers = [
    { uid: "1001", name: "大可", sex: "man" },
    { uid: "1002", name: "Tiger", sex: "lady" },
    { uid: "1003", name: "翔", sex: "man" },
    { uid: "1004", name: "傻源源", sex: "man" },
    { uid: "1005", name: "傻乐乐", sex: "man" },
    { uid: "1006", name: "小巴西", sex: "lady" },
    { uid: "1007", name: "油烟机", sex: "man" },
    { uid: "1008", name: "可乐鸡翅", sex: "lady" },
    { uid: "1009", name: "酸辣土豆丝", sex: "lady" },
    { uid: "1010", name: "糖拌西红柿", sex: "man" },
    { uid: "1011", name: "拍黄瓜", sex: "man" },
    { uid: "1012", name: "空调没有遥控器", sex: "man" },
    { uid: "1013", name: "这么晚了还不回家", sex: "lady" },
    { uid: "1014", name: "程咬金", sex: "man" },
    { uid: "1015", name: "猫砂不会盖", sex: "man" },
    { uid: "1016", name: "风扇不摇头", sex: "man" },
    { uid: "1017", name: "油炸花生米", sex: "man" },
    { uid: "1018", name: "电视不能看", sex: "man" },
    { uid: "1019", name: "绿萝", sex: "lady" },
    { uid: "1020", name: "薄荷糖不麻", sex: "lady" },
    { uid: "1021", name: "翔的小姐姐", sex: "lady" },
    { uid: "1022", name: "孤单想吃西瓜", sex: "man" },
    { uid: "1023", name: "一个人看烟花", sex: "lady" },
    { uid: "1024", name: "大海啊你全是水", sex: "man" },
    { uid: "1025", name: "骏马啊你四条腿", sex: "man" }
];
PukerUtils.textTip = [
    "不要", "没你的大", "要不起", "你厉害", "我认怂", "你牛", "过", "GO", "PASS", "0.0"
];
__reflect(PukerUtils.prototype, "PukerUtils");
//# sourceMappingURL=PukerUtils.js.map