class Poker {
	public constructor(id:number,orderString:string) {
        this.id = id;
        this.orderString = orderString;
        this.sort = PukerTypeUtils.orderString.indexOf(orderString)
    }

    /**
     * 牌面ID
     */
    private id:number;
    /**
     * 牌大小字符表示
     */
    private orderString:string;
    /**
     * 牌大小排序值 0-14  数值越小，表示牌越大
     */
    private sort:number;
}