var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 数组操作工具类
 */
var ArrayUtils = (function () {
    function ArrayUtils() {
    }
    /**
 * 从一个数组中移除部分数组元素
 * array 要操作的数组
 * elements 要移除的数组元素
 */
    ArrayUtils.removeElements = function (array, elements) {
        for (var i = 0; i < elements.length; i++) {
            for (var j = 0; j < array.length; j++) {
                if (elements[i] == array[j]) {
                    array = this.slice(array, 0, j).concat(this.slice(array, j + 1, array.length));
                    break;
                }
            }
        }
        return array;
    };
    ArrayUtils.slice = function (array, i, j) {
        if (i < 0 || j < 0 || i > array.length || j > array.length) {
            return [];
        }
        else {
            return array.slice(i, j);
        }
    };
    return ArrayUtils;
}());
__reflect(ArrayUtils.prototype, "ArrayUtils");
