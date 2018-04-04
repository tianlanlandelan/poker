var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SocketMiddWare = (function () {
    function SocketMiddWare(route) {
        this.route = route;
    }
    SocketMiddWare.prototype.middWare = function (data) {
        console.log("data:", data);
        this.cb(data);
    };
    SocketMiddWare.prototype.setCb = function (cb) {
        this.cb = cb;
    };
    return SocketMiddWare;
}());
__reflect(SocketMiddWare.prototype, "SocketMiddWare");
