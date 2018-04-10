/**
 * 出牌选择类
 * 该类负责系统自动出牌、用户点击“提示”按钮后提示选择的牌等
 */
class PukerSeekUtils {
	public constructor() {
	}

	/**
	 * TODO
	 * 从一手牌中判断有没有比指定牌大的牌
	 * 这个方法是单机游戏的核心
	 * 需要持续优化
	 * aHandPuker 一手牌
	 * b 指定的牌形
	 */
	public static seekRight(aHandPuker:Array<Poker>,pukerType:Array<Poker>):Array<Poker>{
		let myPuker:Array<Poker> = PukerUtils.sortDescPokers(aHandPuker);
		let puker:Array<Poker> = PukerUtils.sortDescPokers(pukerType);
		console.log("seekRight",myPuker,puker);
		let bType = PukerTypeUtils.getType(pukerType);
		let mask:number = 0;
		let rightPuker:Array<Poker> = null;
		if(bType.getType() === PukerTypeUtils.typeKingBoom) 			rightPuker =  null;
		else if(bType.getType() === PukerTypeUtils.typeSingle) 			rightPuker =  this.seekSingle(myPuker,bType.getSort());
		else if(bType.getType() === PukerTypeUtils.typePair) 			rightPuker =  this.seekPairs(myPuker,bType.getSort());
		else if(bType.getType() === PukerTypeUtils.typeThree) 			rightPuker =  this.seekThree(myPuker,bType.getSort());
		else if(bType.getType() === PukerTypeUtils.typeThreeSingle) 	rightPuker =  this.seekThreeSingle(myPuker,bType.getSort());
		else if(bType.getType() === PukerTypeUtils.typeThreePair) 		rightPuker =  this.seekThreePair(myPuker,bType.getSort());
		else if(bType.getType() === PukerTypeUtils.typeStraight) 		rightPuker =  this.seekStraight(myPuker,bType.getSort(),puker.length);
		else if(bType.getType() === PukerTypeUtils.typeStraightPairs) 	rightPuker =  this.seekStraightPairs(myPuker,bType.getSort(),puker.length);
		else if(bType.getType() === PukerTypeUtils.typePlane) 			rightPuker =  this.seekPlane(myPuker,bType.getSort());
		else if(bType.getType() === PukerTypeUtils.typePlane2Single) 	rightPuker =  this.seekPlane2Single(myPuker,bType.getSort());
		else if(bType.getType() === PukerTypeUtils.typePlane2Pairs) 	rightPuker =  this.seekPlane2Pairs(myPuker,bType.getSort());
		else if(bType.getType() === PukerTypeUtils.typeFour2Single) 	rightPuker =  this.seekFour2Single(myPuker,bType.getSort());
		else if(bType.getType() === PukerTypeUtils.typeFour2Pairs) 		rightPuker =  this.seekFour2Pairs(myPuker,bType.getSort());

		//TODO 当玩家没有同类型的可出的牌时，在适当的时机判断是否有炸弹、王炸可以出

		//选好可出的牌型后，从玩家的牌中按照牌形挑选牌面
		if(rightPuker != null && rightPuker.length > 0){
			return rightPuker
		}else{
			return [];
		}
		
	}

	/**
	 * 查找能压炸弹的牌形算法
	 * aHandPukerString 从大到小排列的一手牌
	 * typeSort 要压住的牌的排序值，牌越大，排序值越小
	 */
	private static seekBoom(aHandPukerString:Array<string>,typeSort:number):Array<string>{
		return [];
	}

	/** 
	 * 查找能压单张牌的牌型算法：从小到大遍历自己牌的排序数组，找出比所出牌大的牌
	 * aHandPukerString 从大到小排列的一手牌
	 * typeSort 要压住的牌的排序值，牌越大，排序值越小
	 * TODO 是否拆牌
	 */
	private static seekSingle(aHandPukerString:Array<Poker>,typeSort:number):Array<Poker>{
		//从小到大查找能压住的牌
		for(let j = aHandPukerString.length -1 ; j >= 0; j--){
			if(aHandPukerString[j].getOrderValue() > typeSort){
				return [aHandPukerString[j]];
			}
		}
		return [];
	}

	/**
	 * 查找能压对子的牌形算法：从小到大遍历自己的牌，找出比所出的牌大的牌
	 * aHandPukerString 一手牌
	 * typeSort 要压住的牌的排序值
	 */
	private static seekPairs(aHandPukerString:Array<Poker>,typeSort:number):Array<Poker>{
		//从小到大查找能压住的牌
		for(let j = aHandPukerString.length -1 ; j >= 1 ; j--){
			if(aHandPukerString[j].getOrderValue() === aHandPukerString[j-1].getOrderValue() 
				&& aHandPukerString[j].getOrderValue() > typeSort)
			return [aHandPukerString[j],aHandPukerString[j-1]];
		}
		return [];
	}
	/**
	 * 查找能压三张的牌形算法：从小到大遍历自己的牌，找出比所出的牌大的牌
	 * aHandPukerString 一手牌
	 * typeSort 要压住的牌的排序值
	 */
	private static seekThree(aHandPukerString:Array<Poker>,typeSort:number):Array<Poker>{
		for(let j = aHandPukerString.length -1 ; j >= 2 ; j--){
			if(aHandPukerString[j].getOrderValue() === aHandPukerString[j-1].getOrderValue() 
				&& aHandPukerString[j].getOrderValue() === aHandPukerString[j-2].getOrderValue() 
				&& aHandPukerString[j].getOrderValue() > typeSort)
			return [aHandPukerString[j],aHandPukerString[j-1],aHandPukerString[j-2]];
		}
		return [];
	}
	/**
	 * 查找能压三带一的牌形算法：从小到大遍历自己的牌，找出比所出的牌大的牌
	 * aHandPukerString 一手牌
	 * typeSort 要压住的牌的排序值
	 */
	private static seekThreeSingle(aHandPukerString:Array<Poker>,typeSort:number):Array<Poker>{
		let index = 0;
		let result:Array<Poker> = new Array<Poker>();
		for(let j = aHandPukerString.length -1 ; j >= 2 ; j--){
			if(aHandPukerString[j].getOrderValue() === aHandPukerString[j-1].getOrderValue() 
				&& aHandPukerString[j].getOrderValue() === aHandPukerString[j-2].getOrderValue() 
				&& aHandPukerString[j].getOrderValue() > typeSort){
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
	/**
	 * 查找能压三带一对的牌形算法：从小到大遍历自己的牌，找出比所出的牌大的牌
	 * aHandPukerString 一手牌
	 * typeSort 要压住的牌的排序值
	 */
	private static seekThreePair(aHandPukerString:Array<Poker>,typeSort:number):Array<Poker>{
		let index = 0;
		let result:Array<Poker> = new Array<Poker>();
		//找三张
		for(let j = aHandPukerString.length -1 ; j >= 2 ; j--){
			if(aHandPukerString[j].getOrderValue() === aHandPukerString[j-1].getOrderValue() 
				&& aHandPukerString[j].getOrderValue() === aHandPukerString[j-2].getOrderValue() 
				&& aHandPukerString[j].getOrderValue() > typeSort){
				index = j;
				result.push(aHandPukerString[j],aHandPukerString[j-1],aHandPukerString[j-2]);
				break;
			}
		}
		//找到三张了，找对子
		if(index != 0){
			let index1 = 0;
			for(let j = aHandPukerString.length -1 ; j >= 2 ; j--){
				if(aHandPukerString[j].getOrderValue() === aHandPukerString[j-1].getOrderValue()){
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
	/**
	 * 查找能压顺子的牌形算法：从小到大遍历自己的牌，找出比所出的牌大的牌
	 * aHandPukerString 一手牌
	 * typeSort 要压住的牌的排序值
	 * length 要压住的顺子的长度
	 */
	private static seekStraight(aHandPukerString:Array<Poker>,typeSort:number,length:number):Array<Poker>{
		//天顺，无解
		if(typeSort == 3){
			return [];
		}
		let index = 0;
		let result:Array<Poker> = new Array<Poker>();
		let count = 0;
		let puker:Poker = null;
		/*
		1.从小到大遍历手中的牌（大循环）
		2.如果当前的牌比要压的牌的最小的那张大，且不大于A(小王、大王和2不能组成顺子)，则将当前牌保存，并判断下一张牌是否比当前牌大（小循环）
		3.当下一张牌与当前牌相等，则继续比较下一张
		4.当下一张牌比当前牌大1（连续），则将下一张牌保存，当保存的牌数量等于要压的牌数量时，表示找到了要出的牌，返回保存的牌
		5.当下一张牌比当前牌大的超过1（不连续），则清空保存的牌，退出小循环，继续大循坏
		*/
		for(let j = aHandPukerString.length - 1 ; j >= 0 ;j --){
			if(aHandPukerString[j].getOrderValue() < typeSort + length){
				puker = aHandPukerString[j];
				result.push(aHandPukerString[j]);
				for(let k = j - 1 ; k >= 0 ; k--){
					let indexK = aHandPukerString[k].getOrderValue();
					let indexPuker = puker.getOrderValue();
					//如果当前的牌比A大，返回空(小王、大王和2不能组成顺子)
					if(indexK > PukerUtils.AValue){
						return [];
					}
					//如果剩余的牌还没有要压的牌多，直接返回空
					if( j < length){
						return [];
					}
					
					if(indexK == indexPuker){
						continue;
					}
					if(indexK -1 == indexPuker){
						puker = aHandPukerString[k];
						result.push(aHandPukerString[k]);
						console.log("seekStraight",result);
						if(result.length == length){
							return result;
						}
					}
					if(indexK -1 > indexPuker){
						result = new Array<Poker>();
						break;
					}

				}
				result = new Array<Poker>();
			}
		}
		//找不着，返回空
		return [];
	}
	/**
	 * TODO
	 * 查找能压连对的牌形算法
	 * 1.先取出所有比要压的牌中最小的对子
	 * 2.取出连续对子
	 * 3.判断连续对子长度是否大于length
	 * 4.判断连续对子排序值是否小于typeSort
	 * aHandPukerString 一手牌
	 * typeSort 要压住的牌的排序值
	 * length 要压住的顺子的长度
	 */
	private static seekStraightPairs(aHandPukerString:Array<Poker>,typeSort:number,length:number):Array<Poker>{
		let seek :Array<Poker> = new Array<Poker>();
		let result:Array<Poker> = new Array<Poker>();
		for(let i = 0 ; i < aHandPukerString.length ; i ++){
			if(aHandPukerString[i].getOrderValue() === aHandPukerString[i+1].getOrderValue() 
				&& aHandPukerString[i].getOrderValue() > typeSort - length /2){
				seek.push(aHandPukerString[i],aHandPukerString[i+1]);
				i ++;
			}
		}
		console.log("seekStraightPairs",seek);
		// for(let i =  ; i < seek.length ; i +=2){

		// }
		return [];
	}
	private static seekPlane(aHandPukerString:Array<Poker>,typeSort:number):Array<Poker>{
		return [];
	}
	private static seekPlane2Single(aHandPukerString:Array<Poker>,typeSort:number):Array<Poker>{
		return [];
	}
	private static seekPlane2Pairs(aHandPukerString:Array<Poker>,typeSort:number):Array<Poker>{
		return [];
	}
	private static seekFour2Single(aHandPukerString:Array<Poker>,typeSort:number):Array<Poker>{
		return [];
	}

	private static seekFour2Pairs(aHandPukerString:Array<Poker>,typeSort:number):Array<Poker>{
		return [];
	}
	/**
	 * TODO 
	 * 随机出牌
	 */
	public static randomPlay(myPuker:Array<Poker>):Array<Poker>{

		return [myPuker[myPuker.length-1]];
	}
		/**
	 * myPuker 我的牌
	 * mySeat 我的座位号
	 * landlordSeat 地主座位号
	 * puker 玩家出的一手牌（我要压的牌）
	 * seat 出牌玩家的座位号
	 */
	public static autoPlay(myPuker:Array<Poker>,mySeat:number,landlordSeat:number,puker:Array<Poker>,seat:number):Array<Poker>{
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