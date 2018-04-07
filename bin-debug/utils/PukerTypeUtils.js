var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 牌型工具类
 * 该类负责定义牌型及判断牌型
 */
var PukerTypeUtils = (function () {
    function PukerTypeUtils() {
    }
    /**
     * 获取一手牌的类型
     */
    PukerTypeUtils.getType = function (array) {
        var a = PukerUtils.casePukers(array).sort(PukerUtils.sortASC);
        if (this.isBoom(a) != -1)
            return new PukerType(this.typeBoom, this.isBoom(a));
        if (this.isKingBoom(a) != -1)
            return new PukerType(this.typeKingBoom, this.isKingBoom(a));
        if (this.isSingle(a) != -1)
            return new PukerType(this.typeSingle, this.isSingle(a));
        if (this.isPair(a) != -1)
            return new PukerType(this.typePair, this.isPair(a));
        if (this.isThree(a) != -1)
            return new PukerType(this.typeThree, this.isThree(a));
        if (this.isThreeSingle(a) != -1)
            return new PukerType(this.typeThreeSingle, this.isThreeSingle(a));
        if (this.isThreePairs(a) != -1)
            return new PukerType(this.typeThreePair, this.isThreePairs(a));
        if (this.isStraight(a) != -1)
            return new PukerType(this.typeStraight, this.isStraight(a));
        if (this.isStraightPairs(a) != -1)
            return new PukerType(this.typeStraightPairs, this.isStraightPairs(a));
        if (this.isPlane(a) != -1)
            return new PukerType(this.typePlane, this.isPlane(a));
        if (this.isPlane2Single(a) != -1)
            return new PukerType(this.typePlane2Single, this.isPlane2Single(a));
        if (this.isPlane2pairs(a) != -1)
            return new PukerType(this.typePlane2Pairs, this.isPlane2pairs(a));
        if (this.isFour2Single(a) != -1)
            return new PukerType(this.typeFour2Single, this.isFour2Single(a));
        if (this.isFour2Pairs(a) != -1)
            return new PukerType(this.typeFour2Pairs, this.isFour2Pairs(a));
        return null;
    };
    /**
     * 判断一手牌是否是炸弹（不含王炸）
     * 如果不是，返回-1; 如果是，返回该牌型的大小排序值
     */
    PukerTypeUtils.isBoom = function (array) {
        if (array.length == 4 && array[1] === array[0] && array[2] === array[0] && array[3] === array[0]) {
            return this.orderString.indexOf(array[0]);
        }
        else {
            return -1;
        }
    };
    /**
     * 判断一手牌是否是王炸
     * 如果不是，返回-1; 如果是，返回该牌型的大小排序值
     */
    PukerTypeUtils.isKingBoom = function (array) {
        if (array.length == 2 && array[0] === "A" && array[1] === "B") {
            return 0;
        }
        else {
            return -1;
        }
    };
    /**
     * 判断一手牌是否是单张
     * 如果不是，返回-1; 如果是，返回该牌型的大小排序值
     */
    PukerTypeUtils.isSingle = function (array) {
        if (array.length == 1)
            return this.orderString.indexOf(array[0]);
        return -1;
    };
    /**
     * 判断一手牌是否是对子
     * 如果不是，返回-1; 如果是，返回该牌型的大小排序值
     */
    PukerTypeUtils.isPair = function (array) {
        if (array.length == 2 && array[0] === array[1])
            return this.orderString.indexOf(array[0]);
        return -1;
    };
    /**
     * 判断一手牌是否是顺子
     * 如果不是，返回-1; 如果是，返回该牌型的大小排序值
     */
    PukerTypeUtils.isStraight = function (array) {
        if (array.length < 5 || array.length > 12)
            return -1; //少于5张或多余12张，牌形不正确
        if (this.orderString.indexOf(array[0]) < 3)
            return -1; //如果最大的牌大于A，牌形不正确
        for (var i = 0; i < array.length - 1; i++) {
            if (this.orderString.indexOf(array[i]) + 1 != this.orderString.indexOf(array[i + 1]))
                return -1; //后一张牌不比前一张牌递次小1，牌形不正确
        }
        return this.orderString.indexOf(array[0]);
    };
    /**
     * 判断一手牌是否是三不带
     * 如果不是，返回-1; 如果是，返回该牌型的大小排序值
     */
    PukerTypeUtils.isThree = function (array) {
        if (array.length != 3)
            return -1; //不是三张
        if (array[1] === array[0] && array[2] === array[0])
            return this.orderString.indexOf(array[0]); //三张一样的牌
        return -1;
    };
    /**
     * 判断一手牌是否是三带一
     * 如果不是，返回-1; 如果是，返回该牌型的大小排序值
     */
    PukerTypeUtils.isThreeSingle = function (array) {
        if (array.length != 4)
            return -1; //不是三张也不是四张，不是三带
        if (array[1] === array[0] && array[2] === array[0] && array[3] != array[0])
            return this.orderString.indexOf(array[0]); //前三张一样后一张不一样 
        if (array[1] === array[3] && array[2] === array[3] && array[0] != array[3])
            return this.orderString.indexOf(array[1]); //前一张不一样后三张一样
        return -1;
    };
    /**
     * 判断一手牌是否是三带二
     * 如果不是，返回-1; 如果是，返回该牌型的大小排序值
     */
    PukerTypeUtils.isThreePairs = function (array) {
        if (array.length != 5)
            return -1; //不是三张也不是四张，不是三带
        if (array[1] === array[0] && array[2] === array[0] &&
            array[3] != array[0] && array[3] === array[4])
            return this.orderString.indexOf(array[0]); //前三张一样后一张不一样   //前三张一样，后两张一样
        if (array[0] === array[1] && array[2] === array[3] &&
            array[3] === array[4] && array[0] != array[2])
            return this.orderString.indexOf(array[2]);
        ; //前两张一样，后三张一样
        return -1;
    };
    /**
     * 判断一手牌是否是连对
     * 如果不是，返回-1; 如果是，返回该牌型的大小排序值
     */
    PukerTypeUtils.isStraightPairs = function (array) {
        if (array.length < 6 || array.length > 20 || array.length % 2 != 0)
            return -1;
        if (this.orderString.indexOf(array[0]) < 3)
            return -1; //如果最大的牌大于A，牌形不正确
        for (var i = 0; i < array.length - 1; i += 2) {
            if (this.orderString.indexOf(array[i]) != this.orderString.indexOf(array[i + 1]))
                return -1;
        }
        for (var i = 0; i < array.length - 2; i += 2) {
            if (this.orderString.indexOf(array[i]) + 1 != this.orderString.indexOf(array[i + 2]))
                return -1;
        }
        return this.orderString.indexOf(array[0]);
    };
    /**
     * 判断一手牌是否是飞机不带翅膀
     * 如果不是，返回-1; 如果是，返回该牌型的大小排序值
     */
    PukerTypeUtils.isPlane = function (array) {
        if (array.length != 6)
            return -1;
        if (this.orderString.indexOf(array[0]) < 3)
            return -1; //如果最大的牌大于A，牌形不正确(不能三个2 三个A)
        if (array[0] === array[1] && array[1] === array[2] &&
            array[3] === array[4] && array[4] === array[5] &&
            this.orderString.indexOf(array[0]) + 1 === this.orderString.indexOf(array[3]))
            return this.orderString.indexOf(array[0]);
        return -1;
    };
    /**
     * 判断一手牌是否是飞机带两张单牌
     * 如果不是，返回-1; 如果是，返回该牌型的大小排序值
     */
    PukerTypeUtils.isPlane2Single = function (array) {
        var a = [];
        if (array.length != 8)
            return -1;
        for (var i = 0; i < array.length - 2; i++) {
            if (array[i] === array[i + 1] && array[i] == array[i + 2]) {
                a.push(array[i]);
            }
        }
        if (a.length != 2)
            return -1;
        if (this.orderString.indexOf(a[0]) < 3)
            return -1; //如果最大的牌大于A，牌形不正确(不能三个2 三个A)
        if (this.orderString.indexOf(a[0]) + 1 === this.orderString.indexOf(a[1]))
            return this.orderString.indexOf(a[0]);
        return -1;
    };
    /**
     * 判断一手牌是否是飞机带两对
     * 如果不是，返回-1; 如果是，返回该牌型的大小排序值
     */
    PukerTypeUtils.isPlane2pairs = function (array) {
        var newArray = [];
        var three = [];
        if (array.length != 10)
            return -1;
        for (var i = 0; i < array.length - 2; i++) {
            if (array[i] === array[i + 1] && array[i] == array[i + 2]) {
                three.push(array[i]);
            }
            newArray = newArray.concat(ArrayUtils.removeElements(array, [array[i], array[i + 1], array[i + 2]]));
        }
        if (three.length != 2)
            return -1;
        newArray = ArrayUtils.removeElements(array, newArray);
        for (var i = 0; i < newArray.length - 1; i += 2) {
            if (newArray[i] !== newArray[i + 1])
                return -1;
        }
        if (this.orderString.indexOf(three[0]) < 3)
            return -1; //如果最大的牌大于A，牌形不正确(不能三个2 三个A)
        if (this.orderString.indexOf(three[0]) + 1 === this.orderString.indexOf(three[1]))
            return this.orderString.indexOf(three[0]);
        return -1;
    };
    /**
     * 判断一手牌是否是四带二
     * 如果不是，返回-1; 如果是，返回该牌型的大小排序值
     */
    PukerTypeUtils.isFour2Single = function (array) {
        if (array.length != 6)
            return -1;
        for (var i = 0; i < array.length - 3; i++) {
            if (array[i] === array[i + 1] && array[i] === array[i + 2] && array[i] === array[i + 3])
                return this.orderString.indexOf(array[i]);
        }
        return -1;
    };
    /**
     * 判断一手牌是否是四带两对
     * 如果不是，返回-1; 如果是，返回该牌型的大小排序值
     */
    PukerTypeUtils.isFour2Pairs = function (array) {
        var newArray = [];
        var four;
        if (array.length != 8)
            return -1;
        for (var i = 0; i < array.length - 3; i++) {
            if (array[i] === array[i + 1] && array[i] === array[i + 2] && array[i] === array[i + 3]) {
                newArray = newArray.concat(ArrayUtils.removeElements(array, [array[i], array[i + 1], array[i + 2], array[i + 3]]));
                four = array[i];
            }
        }
        for (var i = 0; i < newArray.length - 1; i += 2) {
            if (newArray[i] !== newArray[i + 1])
                return -1;
        }
        return this.orderString.indexOf(four);
    };
    return PukerTypeUtils;
}());
/**
 * 牌面从大到小的排序规则
 */
PukerTypeUtils.orderString = "ABCDEFGHIJKLMNO"; //King,king,2,A,K,Q,J,10,9,8,7,6,5,4,3
PukerTypeUtils.typeBoom = "typeBoom";
PukerTypeUtils.typeKingBoom = "typeKingBoom";
PukerTypeUtils.typeSingle = "typeSingle";
PukerTypeUtils.typePair = "typePair";
PukerTypeUtils.typeThree = "typeThree";
PukerTypeUtils.typeThreeSingle = "typeThreeSingle";
PukerTypeUtils.typeThreePair = "typeThreePair";
PukerTypeUtils.typeStraight = "typeStraight";
PukerTypeUtils.typeStraightPairs = "typeStraightPairs";
PukerTypeUtils.typePlane = "typePlane";
PukerTypeUtils.typePlane2Single = "typePlane2Single";
PukerTypeUtils.typePlane2Pairs = "typePlane2Pairs";
PukerTypeUtils.typeFour2Single = "typeFour2Single";
PukerTypeUtils.typeFour2Pairs = "typeFour2Pairs";
__reflect(PukerTypeUtils.prototype, "PukerTypeUtils");
//# sourceMappingURL=PukerTypeUtils.js.map