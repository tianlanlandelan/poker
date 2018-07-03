/**
 * 牌型对象类
 * 该类定义一个牌型对象，对象属性包含牌型、牌型大小排序值
 */
class PukerType {
	/**
	 * 牌型
	 */
	private type:string;
	/**
	 * 牌型大小排序值
	 */
	private sort:number;
	/**
	 * type 牌型
	 * sort 牌型大小排序值
	 */
	public constructor(type:string,sort:number) {
		this.type = type;
		this.sort = sort;
	}
	public getType():string{
		return this.type;
	}
	public getSort():number{
		return this.sort;
	}
}