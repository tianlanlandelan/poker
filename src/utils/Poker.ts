class Poker {
	public constructor(id:number,orderValue:number) {
        this.id = id;
        this.orderValue = orderValue;
    }

    /**
     * 牌面ID
     */
    private id:number;
   
    /**
     * 牌大小排序值 0-14  数值越小，表示牌越大
     */
    private orderValue:number;
    /**
     * 获取牌面ID
     * 用于在界面展示该牌
     */
    public getId():number{
        return this.id;
    }
    /**
     * 
     * 获取该牌的大小值
     */
    public getOrderValue():number{
        return this.orderValue;
    }
    public toString(){
        return "[" + this.id +","+ this.orderValue + "]";
    }
}