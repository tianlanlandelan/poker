var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 牌型大小比较工具类
 */
var PukerCompareUtils = (function () {
    function PukerCompareUtils() {
    }
    /**
     * 比较两手牌的大小
     * a b ,当a大于b时返回true
     * 王炸通吃
     * 炸弹仅次于王炸
     * 其他牌必须牌型相等才能比较
     */
    PukerCompareUtils.comparePukers = function (a, b) {
        var aSort = PukerUtils.casePukers(a).sort(PukerUtils.sortASC);
        var bSort = PukerUtils.casePukers(b).sort(PukerUtils.sortASC);
        if (aSort.length < 1 || bSort.length < 1)
            return false; //空
        if (PukerTypeUtils.isKingBoom(bSort) != -1)
            return false; //b是王炸
        if (PukerTypeUtils.isKingBoom(aSort) != -1)
            return true; //a是王炸
        if (PukerTypeUtils.isBoom(bSort) != -1) {
            if (PukerTypeUtils.isBoom(aSort) != -1)
                return this.compareOne(aSort[0], bSort[0]); //a 也是炸弹
            return false; //a 不是炸弹
        }
        if (PukerTypeUtils.isBoom(aSort) != -1)
            return true; //a 是炸弹
        if (a.length != b.length)
            return false; //已经排除了炸弹的可能，长度不相等
        var aType = PukerTypeUtils.getType(a);
        var bType = PukerTypeUtils.getType(b);
        if (aType == null || bType == null || aType.getType() != bType.getType())
            return false; //牌型3不相等
        return aType.getSort() < bType.getSort();
    };
    /**
     * 比较单牌的大小
     */
    PukerCompareUtils.compareOne = function (a, b) {
        var order = PukerTypeUtils.orderString;
        if (order.indexOf(a) > -1 && order.indexOf(b) > -1 && order.indexOf(a) < order.indexOf(b)) {
            return true;
        }
        else {
            return false;
        }
    };
    return PukerCompareUtils;
}());
__reflect(PukerCompareUtils.prototype, "PukerCompareUtils");
//# sourceMappingURL=PukerCompareUtils.js.map