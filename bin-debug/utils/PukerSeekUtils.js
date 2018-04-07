var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 出牌选择类
 * 该类负责系统自动出牌、用户点击“提示”按钮后提示选择的牌等
 */
var PukerSeekUtils = (function () {
    function PukerSeekUtils() {
    }
    /**
     * 从一副牌里按照规则挑选出一手牌
     * a 规则
     * b 一副牌
     *
     * 将要比对的牌转成排序值
     * 比较排序值，取出牌
     */
    PukerSeekUtils.seekPuker = function (a, b) {
        var bString = PukerUtils.casePukers(b);
        var puker = [];
        for (var i = 0; i < a.length; i++) {
            for (var j = 0; j < bString.length; j++) {
                if (a[i] === bString[j]) {
                    puker.push(b[j]);
                    bString[j] = "Z";
                    break;
                }
            }
        }
        return puker;
    };
    /**
     * TODO
     * 从一手牌中判断有没有比指定牌大的牌
     * 这个方法是单机游戏的核心
     * 需要持续优化
     * aHandPuker 一手牌
     * b 指定的牌形
     */
    PukerSeekUtils.seekRight = function (aHandPuker, pukerType) {
        var myPuker = PukerUtils.casePukers(aHandPuker).sort(PukerUtils.sortASC);
        var puker = PukerUtils.casePukers(pukerType).sort(PukerUtils.sortASC);
        console.log("seekRight", myPuker, puker);
        var bType = PukerTypeUtils.getType(pukerType);
        var mask = 0;
        var rightPuker = null;
        if (bType.getType() === PukerTypeUtils.typeKingBoom)
            rightPuker = null;
        else if (bType.getType() === PukerTypeUtils.typeSingle)
            rightPuker = this.seekSingle(myPuker, bType.getSort());
        else if (bType.getType() === PukerTypeUtils.typePair)
            rightPuker = this.seekPairs(myPuker, bType.getSort());
        else if (bType.getType() === PukerTypeUtils.typeThree)
            rightPuker = this.seekThree(myPuker, bType.getSort());
        else if (bType.getType() === PukerTypeUtils.typeThreeSingle)
            rightPuker = this.seekThreeSingle(myPuker, bType.getSort());
        else if (bType.getType() === PukerTypeUtils.typeThreePair)
            rightPuker = this.seekThreePair(myPuker, bType.getSort());
        else if (bType.getType() === PukerTypeUtils.typeStraight)
            rightPuker = this.seekStraight(myPuker, bType.getSort(), puker.length);
        else if (bType.getType() === PukerTypeUtils.typeStraightPairs)
            rightPuker = this.seekStraightPairs(myPuker, bType.getSort(), puker.length);
        else if (bType.getType() === PukerTypeUtils.typePlane)
            rightPuker = this.seekPlane(myPuker, bType.getSort());
        else if (bType.getType() === PukerTypeUtils.typePlane2Single)
            rightPuker = this.seekPlane2Single(myPuker, bType.getSort());
        else if (bType.getType() === PukerTypeUtils.typePlane2Pairs)
            rightPuker = this.seekPlane2Pairs(myPuker, bType.getSort());
        else if (bType.getType() === PukerTypeUtils.typeFour2Single)
            rightPuker = this.seekFour2Single(myPuker, bType.getSort());
        else if (bType.getType() === PukerTypeUtils.typeFour2Pairs)
            rightPuker = this.seekFour2Pairs(myPuker, bType.getSort());
        //TODO 当玩家没有同类型的可出的牌时，在适当的时机判断是否有炸弹、王炸可以出
        //选好可出的牌型后，从玩家的牌中按照牌形挑选牌面
        if (rightPuker != null && rightPuker.length > 0) {
            return this.seekPuker(rightPuker, aHandPuker);
        }
        else {
            return [];
        }
    };
    /**
     * 查找能压炸弹的牌形算法
     * aHandPukerString 从大到小排列的一手牌
     * typeSort 要压住的牌的排序值，牌越大，排序值越小
     */
    PukerSeekUtils.seekBoom = function (aHandPukerString, typeSort) {
        return [];
    };
    /**
     * 查找能压单张牌的牌型算法：从小到大遍历自己牌的排序数组，找出比所出牌大的牌
     * aHandPukerString 从大到小排列的一手牌
     * typeSort 要压住的牌的排序值，牌越大，排序值越小
     * TODO 是否拆牌
     */
    PukerSeekUtils.seekSingle = function (aHandPukerString, typeSort) {
        //从小到大查找能压住的牌
        for (var j = aHandPukerString.length - 1; j >= 0; j--) {
            if (PukerTypeUtils.orderString.indexOf(aHandPukerString[j]) < typeSort) {
                return [aHandPukerString[j]];
            }
        }
        return [];
    };
    /**
     * 查找能压对子的牌形算法：从小到大遍历自己的牌，找出比所出的牌大的牌
     * aHandPukerString 一手牌
     * typeSort 要压住的牌的排序值
     */
    PukerSeekUtils.seekPairs = function (aHandPukerString, typeSort) {
        //从小到大查找能压住的牌
        for (var j = aHandPukerString.length - 1; j >= 1; j--) {
            if (aHandPukerString[j] === aHandPukerString[j - 1] && PukerTypeUtils.orderString.indexOf(aHandPukerString[j]) < typeSort)
                return [aHandPukerString[j], aHandPukerString[j - 1]];
        }
        return [];
    };
    /**
     * 查找能压三张的牌形算法：从小到大遍历自己的牌，找出比所出的牌大的牌
     * aHandPukerString 一手牌
     * typeSort 要压住的牌的排序值
     */
    PukerSeekUtils.seekThree = function (aHandPukerString, typeSort) {
        for (var j = aHandPukerString.length - 1; j >= 2; j--) {
            if (aHandPukerString[j] === aHandPukerString[j - 1] && aHandPukerString[j] === aHandPukerString[j - 2] && PukerTypeUtils.orderString.indexOf(aHandPukerString[j]) < typeSort)
                return [aHandPukerString[j], aHandPukerString[j - 1], aHandPukerString[j - 2]];
        }
        return [];
    };
    /**
     * 查找能压三带一的牌形算法：从小到大遍历自己的牌，找出比所出的牌大的牌
     * aHandPukerString 一手牌
     * typeSort 要压住的牌的排序值
     */
    PukerSeekUtils.seekThreeSingle = function (aHandPukerString, typeSort) {
        var index = 0;
        var result = new Array();
        for (var j = aHandPukerString.length - 1; j >= 2; j--) {
            if (aHandPukerString[j] === aHandPukerString[j - 1] && aHandPukerString[j] === aHandPukerString[j - 2] && PukerTypeUtils.orderString.indexOf(aHandPukerString[j]) < typeSort) {
                index = j;
                result.push(aHandPukerString[j], aHandPukerString[j - 1], aHandPukerString[j - 2]);
                break;
            }
        }
        if (index === 0) {
            return [];
        }
        else if (index === aHandPukerString.length - 1) {
            result.push(aHandPukerString[index - 3]);
        }
        else {
            result.push(aHandPukerString[aHandPukerString.length - 1]);
        }
        return result;
    };
    /**
     * 查找能压三带一对的牌形算法：从小到大遍历自己的牌，找出比所出的牌大的牌
     * aHandPukerString 一手牌
     * typeSort 要压住的牌的排序值
     */
    PukerSeekUtils.seekThreePair = function (aHandPukerString, typeSort) {
        var index = 0;
        var result = new Array();
        //找三张
        for (var j = aHandPukerString.length - 1; j >= 2; j--) {
            if (aHandPukerString[j] === aHandPukerString[j - 1] && aHandPukerString[j] === aHandPukerString[j - 2] && PukerTypeUtils.orderString.indexOf(aHandPukerString[j]) < typeSort) {
                index = j;
                result.push(aHandPukerString[j], aHandPukerString[j - 1], aHandPukerString[j - 2]);
                break;
            }
        }
        //找到三张了，找对子
        if (index != 0) {
            var index1 = 0;
            for (var j = aHandPukerString.length - 1; j >= 2; j--) {
                if (aHandPukerString[j] === aHandPukerString[j - 1]) {
                    if (j == index || j == index - 1 || j == index - 2)
                        continue;
                    index1 = j;
                    result.push(aHandPukerString[j], aHandPukerString[j - 1]);
                    break;
                }
            }
        }
        if (result != null && result.length === 5) {
            return result;
        }
        else {
            return [];
        }
    };
    PukerSeekUtils.seekStraight = function (aHandPukerString, typeSort, length) {
        var index = 0;
        var result = new Array();
        var count = 0;
        var puker = null;
        /*
        1.从大到小遍历手中的牌
        2.如果当前的牌比要压的牌大，且不大于A(小王、大王和2不能组成顺子)，则将当前牌保存，并判断下一张牌是否比当前牌大（进入小循环遍历）
        3.当下一张牌与当前牌相等，则继续比较下一张
        4.当下一张牌比当前牌排序值大1（连续），则将下一张牌保存，当保存的牌数量等于要压的牌数量时，表示找到了要出的牌，返回保存的牌
        5.当下一张牌比当前牌排序值大的超过1（不连续），则清空保存的牌，退出小循环，继续大循坏
        */
        for (var j = 0; j < aHandPukerString.length; j++) {
            if (PukerTypeUtils.orderString.indexOf(aHandPukerString[j]) < typeSort && PukerTypeUtils.orderString.indexOf(aHandPukerString[j]) >= 3) {
                puker = aHandPukerString[j];
                result.push(aHandPukerString[j]);
                for (var k = j + 1; k < aHandPukerString.length - 1; k++) {
                    //如果剩余的牌还没有要压的牌多，直接返回空
                    if (aHandPukerString.length - j < length) {
                        return [];
                    }
                    var indexK = PukerTypeUtils.orderString.indexOf(aHandPukerString[k]);
                    var indexPuker = PukerTypeUtils.orderString.indexOf(puker);
                    if (indexK == indexPuker) {
                        continue;
                    }
                    if (indexK == indexPuker + 1) {
                        puker = aHandPukerString[k];
                        result.push(aHandPukerString[k]);
                        console.log("seekStraight", result);
                        if (result.length == length) {
                            return result;
                        }
                    }
                    if (indexK > indexPuker + 1) {
                        result = new Array();
                        break;
                    }
                }
                result = new Array();
            }
        }
        //找不着，返回空
        return [];
    };
    PukerSeekUtils.seekStraightPairs = function (aHandPukerString, typeSort, length) {
        return [];
    };
    PukerSeekUtils.seekPlane = function (aHandPukerString, typeSort) {
        return [];
    };
    PukerSeekUtils.seekPlane2Single = function (aHandPukerString, typeSort) {
        return [];
    };
    PukerSeekUtils.seekPlane2Pairs = function (aHandPukerString, typeSort) {
        return [];
    };
    PukerSeekUtils.seekFour2Single = function (aHandPukerString, typeSort) {
        return [];
    };
    PukerSeekUtils.seekFour2Pairs = function (aHandPukerString, typeSort) {
        return [];
    };
    /**
     * TODO
     * 随机出牌
     */
    PukerSeekUtils.randomPlay = function (myPuker) {
        return [myPuker[myPuker.length - 1]];
    };
    /**
 * myPuker 我的牌
 * mySeat 我的座位号
 * landlordSeat 地主座位号
 * puker 玩家出的一手牌（我要压的牌）
 * seat 出牌玩家的座位号
 */
    PukerSeekUtils.autoPlay = function (myPuker, mySeat, landlordSeat, puker, seat) {
        console.log("轮到我出牌了，座位号：", mySeat, "上家出牌，座位号：", seat, "地主座位号：", landlordSeat);
        if (myPuker == null || myPuker.length == 0) {
            console.log("没牌了");
            return [];
        }
        if (puker == null || puker.length == 0) {
            return this.randomPlay(myPuker);
        }
        if (mySeat === landlordSeat) {
            if (seat === mySeat) {
                return this.randomPlay(myPuker);
            }
            else {
                return this.seekRight(myPuker, puker);
            }
        }
        else {
            if (seat === mySeat) {
                return this.randomPlay(myPuker);
            }
            if (seat != landlordSeat) {
                return [];
            }
            else {
                return this.seekRight(myPuker, puker);
            }
        }
    };
    return PukerSeekUtils;
}());
__reflect(PukerSeekUtils.prototype, "PukerSeekUtils");
//# sourceMappingURL=PukerSeekUtils.js.map