var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 牌型对象类
 * 该类定义一个牌型对象，对象属性包含牌型、牌型大小排序值
 */
var PukerType = (function () {
    /**
     * type 牌型
     * sort 牌型大小排序值
     */
    function PukerType(type, sort) {
        this.type = type;
        this.sort = sort;
    }
    PukerType.prototype.getType = function () {
        return this.type;
    };
    PukerType.prototype.getSort = function () {
        return this.sort;
    };
    return PukerType;
}());
__reflect(PukerType.prototype, "PukerType");
//# sourceMappingURL=PukerType.js.map