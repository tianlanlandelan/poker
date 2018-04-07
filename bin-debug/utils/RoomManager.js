var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var RoomManager = (function () {
    function RoomManager() {
    }
    return RoomManager;
}());
/**
 * Client请求进入房间
 */
RoomManager.Request_oRoom = 1001;
/**
 * Client准备就绪
 */
RoomManager.Request_BeReady = 1002;
/**
 * Client叫/抢地主
 */
RoomManager.Request_CallTheLandlord = 1003;
/**
 * Client出牌
 */
RoomManager.Request_Discard = 1004;
/**
 * Server返回房间和房间里的其他玩家信息
 */
RoomManager.Response_RoomInfo = 2001;
/**
 * Server通知客户端准备
 */
RoomManager.Response_Reday = 2002;
/**
 * Server发牌
 */
RoomManager.Response_DealPoker = 2003;
/**
 * Server通知玩家叫/抢地主
 */
RoomManager.Response_ToCallTheLandlord = 2005;
/**
 * Server通知玩家地主归属和底牌
 */
RoomManager.Response_LandlordAndLastCard = 2006;
/**
 * Server通知玩家出牌
 */
RoomManager.Response_Discard = 2007;
__reflect(RoomManager.prototype, "RoomManager");
//# sourceMappingURL=RoomManager.js.map