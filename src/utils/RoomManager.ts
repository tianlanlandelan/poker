class RoomManager {
	public constructor() {
	}

    /**
     * Client请求进入房间
     */
    public static  Request_onRoom = 1001;
    /**
     * Client准备就绪
     */
    public static  Request_BeReady = 1002;
    /**
     * Client叫/抢地主
     */
    public static  Request_CallTheLandlord = 1003;
    /**
     * Client出牌
     */
    public static  Request_Discard = 1004;

    /**
     * Server返回Socket连接成功建立
     */
    public static Response_SocketCreateOK = 2000;

    /**
     * Server返回房间和房间里的其他玩家信息
     */
    public static  Response_RoomInfo = 2001;
    /**
     * Server通知客户端准备
     */
    public static  Response_Reday = 2002;
    /**
     * Server发牌
     */
    public static  Response_DealPoker = 2003;
    /**
     * Server通知玩家叫/抢地主
     */
    public static  Response_ToCallTheLandlord = 2005;
    /**
     * Server通知玩家地主归属和底牌
     */
    public static  Response_LandlordAndLastCard = 2006;
    /**
     * Server通知玩家出牌
     */
    public static  Response_Discard = 2007;

    /**
     * 叫地主按钮组类型
     */
    public static ButtonsCallTheLandlord = 0;
    /**
     * 抢地主按钮组
     */
    public static ButtonsFight4TheLandlord = 1;
    /**
     * 出牌按钮组
     */
    public static ButtonsDiscard = 2;
    /**
     * 游戏结束按钮组
     */
    public static ButtonsGameOver = 3;

}