/**
 * 牌型大小比较工具类
 */
class PukerCompareUtils {
	public constructor() {
	}
	
	/**
	 * 比较两手牌的大小
	 * a b ,当a大于b时返回true
	 * 王炸通吃
	 * 炸弹仅次于王炸
	 * 其他牌必须牌型相等才能比较
	 */
	public static comparePukers(a:Array<Poker>,b:Array<Poker>):boolean{
		let aSort:Array<Poker> = PukerUtils.sortDescPokers(a);
		let bSort:Array<Poker> = PukerUtils.sortDescPokers(b);
		if(aSort.length < 1 || bSort.length < 1) return false;//空
		if(PukerTypeUtils.isKingBoom(bSort) != -1) return false;//b是王炸
		if(PukerTypeUtils.isKingBoom(aSort) != -1) return true;//a是王炸
		if(PukerTypeUtils.isBoom(bSort) != -1){//b是炸弹
			if(PukerTypeUtils.isBoom(aSort) != -1) return this.compareOne(aSort[0],bSort[0]);//a 也是炸弹
			return false;//a 不是炸弹
		}
		if(PukerTypeUtils.isBoom(aSort) != -1) return true;//a 是炸弹
		if(a.length != b.length) return false;//已经排除了炸弹的可能，长度不相等,不能比较

		let aType:PukerType = PukerTypeUtils.getType(aSort);
		let bType:PukerType = PukerTypeUtils.getType(bSort);
		if(aType == null || bType == null || aType.getType() != bType.getType()) return false;//牌型3不相等
		return aType.getSort() > bType.getSort();
	}
	/**
	 * 比较单牌的大小
	 */
	private static compareOne(a:Poker,b:Poker):boolean{
		if(a.getOrderValue() > b.getOrderValue()){
			return true;
		}else{
			return false;
		}
	}
}