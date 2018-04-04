/**
 * 出牌选择类
 * 该类负责系统自动出牌、用户点击“提示”按钮后提示选择的牌等
 */
class PukerSeekUtils {
	public constructor() {
	}
	/**
	 * 从一副牌里按照规则挑选出一手牌
	 * a 规则
	 * b 一副牌
	 * 
	 * 将要比对的牌转成排序值
	 * 比较排序值，取出牌
	 */
	public static seekPuker(a:Array<string>,b:Array<number>):Array<number>{
		let bString:Array<string> = PukerUtils.casePukers(b);
		let puker:Array<number> = [];
		for(let i = 0 ; i < a.length; i ++){
			for(let j = 0 ; j < bString.length ; j ++){
				if(a[i] === bString[j]){
					puker.push(b[j]);
					bString[j] = "Z";
					break;
				}
			}
		}
		return puker;
	} 
	/**
	 * TODO
	 * 从一手牌中判断有没有比指定牌大的牌
	 * 这个方法是单机游戏的核心
	 * 需要持续优化
	 * aHandPuker 一手牌
	 * b 指定的牌形
	 */
	public static seekRight(aHandPuker:Array<number>,pukerType:Array<number>):Array<number>{
		let myPuker:Array<string> = PukerUtils.casePukers(aHandPuker).sort(PukerUtils.sortASC);
		let puker:Array<string> = PukerUtils.casePukers(pukerType).sort(PukerUtils.sortASC);
		let bType = PukerTypeUtils.getType(pukerType);
		let mask:number = 0;
		let rightPuker:Array<string> = null;
		if(bType.getType() === PukerTypeUtils.typeKingBoom) 			rightPuker =  null;
		else if(bType.getType() === PukerTypeUtils.typeSingle) 			rightPuker =  this.seekSingle(myPuker,bType.getSort());
		else if(bType.getType() === PukerTypeUtils.typePair) 			rightPuker =  this.seekPairs(myPuker,bType.getSort());
		else if(bType.getType() === PukerTypeUtils.typeThree) 			rightPuker =  this.seekThree(myPuker,bType.getSort());
		else if(bType.getType() === PukerTypeUtils.typeThreeSingle) 	rightPuker =  this.seekThreeSingle(myPuker,bType.getSort());
		else if(bType.getType() === PukerTypeUtils.typeThreePair) 		rightPuker =  this.seekThreePair(myPuker,bType.getSort());
		else if(bType.getType() === PukerTypeUtils.typeStraight) 		rightPuker =  this.seekStraight(myPuker,bType.getSort());
		else if(bType.getType() === PukerTypeUtils.typeStraightPairs) 	rightPuker =  this.seekStraightPairs(myPuker,bType.getSort());
		else if(bType.getType() === PukerTypeUtils.typePlane) 			rightPuker =  this.seekPlane(myPuker,bType.getSort());
		else if(bType.getType() === PukerTypeUtils.typePlane2Single) 	rightPuker =  this.seekPlane2Single(myPuker,bType.getSort());
		else if(bType.getType() === PukerTypeUtils.typePlane2Pairs) 	rightPuker =  this.seekPlane2Pairs(myPuker,bType.getSort());
		else if(bType.getType() === PukerTypeUtils.typeFour2Single) 	rightPuker =  this.seekFour2Single(myPuker,bType.getSort());
		else if(bType.getType() === PukerTypeUtils.typeFour2Pairs) 		rightPuker =  this.seekFour2Pairs(myPuker,bType.getSort());


		if(rightPuker != null && rightPuker.length > 0){
			return this.seekPuker(rightPuker,aHandPuker);
		}else{
			return [];
		}
		
	}

	private static seekBoom(aHandPukerString:Array<string>,typeSort:number):Array<string>{
		return [];
	}
	/** 查找能压单张牌的牌型算法：从小到大遍历自己牌的排序数组，找出比所出牌大的牌
	 * TODO 是否拆牌
	 */
	private static seekSingle(aHandPukerString:Array<string>,typeSort:number):Array<string>{
		for(let j = aHandPukerString.length -1 ; j >= 0; j--){
			if(PukerTypeUtils.orderString.indexOf(aHandPukerString[j]) < typeSort){
				return [aHandPukerString[j]];
			}
		}
		return [];
	}
	/**
	 * 查找能压对子的牌形算法：从小到大遍历自己的牌，找出比所出的牌大的牌
	 *  TODO 
	 */
	private static seekPairs(aHandPukerString:Array<string>,typeSort:number):Array<string>{
		for(let j = aHandPukerString.length -1 ; j >= 1 ; j--){
			if(aHandPukerString[j] === aHandPukerString[j-1] && PukerTypeUtils.orderString.indexOf(aHandPukerString[j]) < typeSort)
			return [aHandPukerString[j],aHandPukerString[j-1]];
		}
		return [];
	}
	private static seekThree(aHandPukerString:Array<string>,typeSort:number):Array<string>{
		for(let j = aHandPukerString.length -1 ; j >= 2 ; j--){
			if(aHandPukerString[j] === aHandPukerString[j-1] && aHandPukerString[j] === aHandPukerString[j-2] && PukerTypeUtils.orderString.indexOf(aHandPukerString[j]) < typeSort)
			return [aHandPukerString[j],aHandPukerString[j-1],aHandPukerString[j-2]];
		}
		return [];
	}
	private static seekThreeSingle(aHandPukerString:Array<string>,typeSort:number):Array<string>{
		let index = 0;
		let result:Array<string> = new Array<string>();
		for(let j = aHandPukerString.length -1 ; j >= 2 ; j--){
			if(aHandPukerString[j] === aHandPukerString[j-1] && aHandPukerString[j] === aHandPukerString[j-2] && PukerTypeUtils.orderString.indexOf(aHandPukerString[j]) < typeSort)
			{
				index = j;
				result.push(aHandPukerString[j],aHandPukerString[j-1],aHandPukerString[j-2]);
				break;
			}
		}
		if(index === 0){
			return [];
		}else if(index === aHandPukerString.length -1){
			result.push(aHandPukerString[index-3]);
		}else{
			result.push(aHandPukerString[aHandPukerString.length -1]);
		}
		return result;
	}
	private static seekThreePair(aHandPukerString:Array<string>,typeSort:number):Array<string>{
		let index = 0;
		let result:Array<string> = new Array<string>();
		//找三张
		for(let j = aHandPukerString.length -1 ; j >= 2 ; j--){
			if(aHandPukerString[j] === aHandPukerString[j-1] && aHandPukerString[j] === aHandPukerString[j-2] && PukerTypeUtils.orderString.indexOf(aHandPukerString[j]) < typeSort)
			{
				index = j;
				result.push(aHandPukerString[j],aHandPukerString[j-1],aHandPukerString[j-2]);
				break;
			}
		}
		//找到三张了，找对子
		if(index != 0){
			let index1 = 0;
			for(let j = aHandPukerString.length -1 ; j >= 2 ; j--){
				if(aHandPukerString[j] === aHandPukerString[j-1])
				{
					if(j == index || j == index -1  || j == index -2)
					continue;
					index1 = j;
					result.push(aHandPukerString[j],aHandPukerString[j-1]);
					break;
				}
			}
		
		}
		if(result != null && result.length === 5){
			return result;
		}else{
			return [];
		}
	}
	private static seekStraight(aHandPukerString:Array<string>,typeSort:number):Array<string>{
		return [];
	}
	private static seekStraightPairs(aHandPukerString:Array<string>,typeSort:number):Array<string>{
		return [];
	}
	private static seekPlane(aHandPukerString:Array<string>,typeSort:number):Array<string>{
		return [];
	}
	private static seekPlane2Single(aHandPukerString:Array<string>,typeSort:number):Array<string>{
		return [];
	}
	private static seekPlane2Pairs(aHandPukerString:Array<string>,typeSort:number):Array<string>{
		return [];
	}
	private static seekFour2Single(aHandPukerString:Array<string>,typeSort:number):Array<string>{
		return [];
	}

	private static seekFour2Pairs(aHandPukerString:Array<string>,typeSort:number):Array<string>{
		return [];
	}
	/**
	 * TODO 
	 * 随机出牌
	 */
	public static randomPlay(myPuker:Array<number>):Array<number>{

		return [myPuker[myPuker.length-1]];
	}
		/**
	 * myPuker 我的牌
	 * mySeat 我的座位号
	 * landlordSeat 地主座位号
	 * puker 玩家出的一手牌（我要压的牌）
	 * seat 出牌玩家的座位号
	 */
	public static autoPlay(myPuker:Array<number>,mySeat:number,landlordSeat:number,puker:Array<number>,seat:number):Array<number>{
		console.log("轮到我出牌了，座位号：",mySeat,"上家出牌，座位号：",seat,"地主座位号：",landlordSeat);
		if(myPuker == null || myPuker.length == 0){
			console.log("没牌了");
			return [];
		}
		if(puker == null || puker.length == 0){
			return this.randomPlay(myPuker);
		}
		if(mySeat === landlordSeat){//我是地主
			if(seat === mySeat){//当前一手牌是我出的
				return this.randomPlay(myPuker);
			}else{//当前一手牌是农民出的
				return this.seekRight(myPuker,puker);
			}
		}else{//我不是地主
			if(seat === mySeat){//当前一手牌是我出的
				return this.randomPlay(myPuker);
			}
			if(seat != landlordSeat){//队友出的牌
				return [];
			}else{//地主出的牌
				return this.seekRight(myPuker,puker);
			}
		}
	}
}