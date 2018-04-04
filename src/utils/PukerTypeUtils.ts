/**
 * 牌型工具类
 * 该类负责定义牌型及判断牌型
 */
class PukerTypeUtils {
	public constructor() {
	}
	/**
	 * 牌面从大到小的排序规则
	 */
	public static orderString = "ABCDEFGHIJKLMNO";//King,king,2,A,K,Q,J,10,9,8,7,6,5,4,3
	public static typeBoom:string 			= "typeBoom";
	public static typeKingBoom:string 		= "typeKingBoom";
	public static typeSingle:string 		= "typeSingle";
	public static typePair:string 			= "typePair";
	public static typeThree:string 			= "typeThree";
	public static typeThreeSingle:string 	= "typeThreeSingle";
	public static typeThreePair:string 		= "typeThreePair";
	public static typeStraight:string 		= "typeStraight";
	public static typeStraightPairs:string 	= "typeStraightPairs";
	public static typePlane:string 			= "typePlane";
	public static typePlane2Single:string 	= "typePlane2Single";
	public static typePlane2Pairs:string 	= "typePlane2Pairs";
	public static typeFour2Single:string 	= "typeFour2Single";
	public static typeFour2Pairs:string 	= "typeFour2Pairs";
	/**
	 * 获取一手牌的类型
	 */
	public static getType(array:Array<number>):PukerType{
		let a:Array<string> = PukerUtils.casePukers(array).sort(PukerUtils.sortASC);
		if(this.isBoom(a) != -1) 			return new PukerType(this.typeBoom,this.isBoom(a));
		if(this.isKingBoom(a) != -1) 		return new PukerType(this.typeKingBoom, this.isKingBoom(a));
		if(this.isSingle(a) != -1) 			return new PukerType(this.typeSingle, this.isSingle(a));
		if(this.isPair(a) != -1) 			return new PukerType(this.typePair, this.isPair(a));
		if(this.isThree(a) != -1) 			return new PukerType(this.typeThree, this.isThree(a));
		if(this.isThreeSingle(a) != -1) 	return new PukerType(this.typeThreeSingle, this.isThreeSingle(a));
		if(this.isThreePairs(a) != -1) 		return new PukerType(this.typeThreePair, this.isThreePairs(a));
		if(this.isStraight(a) != -1) 		return new PukerType(this.typeStraight, this.isStraight(a));
		if(this.isStraightPairs(a) != -1) 	return new PukerType(this.typeStraightPairs, this.isStraightPairs(a));
		if(this.isPlane(a) != -1) 			return new PukerType(this.typePlane, this.isPlane(a));
		if(this.isPlane2Single(a) != -1) 	return new PukerType(this.typePlane2Single, this.isPlane2Single(a));
		if(this.isPlane2pairs(a) != -1) 	return new PukerType(this.typePlane2Pairs, this.isPlane2pairs(a));
		if(this.isFour2Single(a) != -1) 	return new PukerType(this.typeFour2Single, this.isFour2Single(a));
		if(this.isFour2Pairs(a) != -1) 		return new PukerType(this.typeFour2Pairs, this.isFour2Pairs(a));
		return null;
	}
	/**
	 * 判断一手牌是否是炸弹（不含王炸）
	 * 如果不是，返回-1; 如果是，返回该牌型的大小排序值
	 */
    public static isBoom(array:Array<string>):number{
		if(array.length == 4 && array[1] === array[0] && array[2] ===array[0] && array[3] === array[0]){
			return this.orderString.indexOf(array[0]);
		}else{
			return -1;
		}
	}
	/**
	 * 判断一手牌是否是王炸
	 * 如果不是，返回-1; 如果是，返回该牌型的大小排序值
	 */
	public static isKingBoom(array:Array<string>):number{
		if(array.length == 2 && array[0] === "A" && array[1] === "B"){
			return 0;
		}else{
			return -1;
		}
	}
	/**
	 * 判断一手牌是否是单张
	 * 如果不是，返回-1; 如果是，返回该牌型的大小排序值
	 */
	public static isSingle(array:Array<string>):number{
		if(array.length == 1)  return this.orderString.indexOf(array[0]);
		return -1;
	}

	/**
	 * 判断一手牌是否是对子
	 * 如果不是，返回-1; 如果是，返回该牌型的大小排序值
	 */
	public static isPair(array:Array<string>):number{
		if(array.length == 2 && array[0] === array[1]) return this.orderString.indexOf(array[0]);
		return -1;
		
	}

	/**
	 * 判断一手牌是否是顺子
	 * 如果不是，返回-1; 如果是，返回该牌型的大小排序值
	 */
	public static isStraight(array:Array<string>):number{
		if(array.length < 5 || array.length >12) return -1;//少于5张或多余12张，牌形不正确
		if(this.orderString.indexOf(array[0]) < 3) return -1;//如果最大的牌大于A，牌形不正确
		for(let i = 0 ; i < array.length - 1; i ++){
			if(this.orderString.indexOf(array[i]) + 1 != this.orderString.indexOf(array[i+1])) return -1;//后一张牌不比前一张牌递次小1，牌形不正确
		}
		return this.orderString.indexOf(array[0]);
	}

	/**
	 * 判断一手牌是否是三不带
	 * 如果不是，返回-1; 如果是，返回该牌型的大小排序值
	 */
	public static isThree(array:Array<string>):number{
		if(array.length != 3) return -1;//不是三张
		if(array[1] === array[0] && array[2] === array[0]) return  this.orderString.indexOf(array[0]);//三张一样的牌
		return -1;
	}
	/**
	 * 判断一手牌是否是三带一
	 * 如果不是，返回-1; 如果是，返回该牌型的大小排序值
	 */
	public static isThreeSingle(array:Array<string>):number{
		if(array.length != 4) return -1;//不是三张也不是四张，不是三带
		if(array[1] === array[0] && array[2] === array[0] && array[3] != array[0]) 
			return this.orderString.indexOf(array[0]);//前三张一样后一张不一样 
		if(array[1] === array[3] && array[2] === array[3] && array[0] != array[3]) 
			return this.orderString.indexOf(array[1]);//前一张不一样后三张一样
		return -1;
	}
	/**
	 * 判断一手牌是否是三带二
	 * 如果不是，返回-1; 如果是，返回该牌型的大小排序值
	 */
	public static isThreePairs(array:Array<string>):number{
		if(array.length != 5) return -1;//不是三张也不是四张，不是三带
		if(array[1] === array[0] && array[2] === array[0] && 
			array[3] != array[0] && array[3] === array[4]) 
			return this.orderString.indexOf(array[0]);//前三张一样后一张不一样   //前三张一样，后两张一样
		if(array[0] === array[1] && array[2] === array[3] && 
			array[3] === array[4] && array[0] != array[2]) 
			return this.orderString.indexOf(array[2]);;//前两张一样，后三张一样
		return -1;
	}
	/**
	 * 判断一手牌是否是连对
	 * 如果不是，返回-1; 如果是，返回该牌型的大小排序值
	 */
	public static isStraightPairs(array:Array<string>):number{
		if(array.length < 6 || array.length > 20 || array.length % 2 != 0) return -1;
		if(this.orderString.indexOf(array[0]) < 3) return -1;//如果最大的牌大于A，牌形不正确

		for(let i = 0 ; i < array.length - 1 ; i += 2){
			if(this.orderString.indexOf(array[i]) != this.orderString.indexOf(array[i+1])) return -1;
		}
		for(let i = 0 ; i < array.length - 2; i += 2){
			if(this.orderString.indexOf(array[i]) + 1 != this.orderString.indexOf(array[i+2])) return -1;
		}
		return this.orderString.indexOf(array[0]);
	}
	/**
	 * 判断一手牌是否是飞机不带翅膀
	 * 如果不是，返回-1; 如果是，返回该牌型的大小排序值
	 */
	public static isPlane(array:Array<string>):number{
		if(array.length != 6) return -1;
		if(this.orderString.indexOf(array[0]) < 3) return -1;//如果最大的牌大于A，牌形不正确(不能三个2 三个A)
		if(array[0] === array[1] && array[1] === array[2] &&
		 	array[3] === array[4] && array[4] === array[5] && 
		 	this.orderString.indexOf(array[0]) +1 === this.orderString.indexOf(array[3])) 
		 	return this.orderString.indexOf(array[0]);
		return -1; 
	}
	/**
	 * 判断一手牌是否是飞机带两张单牌
	 * 如果不是，返回-1; 如果是，返回该牌型的大小排序值
	 */
	public static isPlane2Single(array:Array<string>):number{
		let a:Array<string> = [];
		if(array.length != 8) return -1;
		for(let i = 0; i < array.length -2; i++){
			if(array[i] === array[i+1] && array[i] == array[i+2]){
				a.push(array[i]);
			}
		}
		if(a.length != 2) return -1;
		if(this.orderString.indexOf(a[0]) < 3) return -1;//如果最大的牌大于A，牌形不正确(不能三个2 三个A)
		if(this.orderString.indexOf(a[0]) + 1 === this.orderString.indexOf(a[1])) return this.orderString.indexOf(a[0]);
		return -1;
	}
	/**
	 * 判断一手牌是否是飞机带两对
	 * 如果不是，返回-1; 如果是，返回该牌型的大小排序值
	 */
	public static isPlane2pairs(array:Array<string>):number{
		let newArray:Array<number> = [];
		let three:Array<string> = [];
		if(array.length != 10) return -1;
		for(let i = 0; i < array.length -2; i++){
			if(array[i] === array[i+1] && array[i] == array[i+2]){
				three.push(array[i]);
			}
			newArray = newArray.concat(ArrayUtils.removeElements(array,[array[i],array[i+1],array[i+2]]));
		}
		if(three.length != 2) return -1;
		newArray = ArrayUtils.removeElements(array,newArray);
		for(let i = 0 ; i < newArray.length -1; i += 2){
			if(newArray[i] !== newArray[i+1]) return -1;
		}
		if(this.orderString.indexOf(three[0]) < 3) return -1;//如果最大的牌大于A，牌形不正确(不能三个2 三个A)
		if(this.orderString.indexOf(three[0]) + 1 === this.orderString.indexOf(three[1])) return this.orderString.indexOf(three[0]);
		return -1;
	}
	/**
	 * 判断一手牌是否是四带二
	 * 如果不是，返回-1; 如果是，返回该牌型的大小排序值
	 */
	public static isFour2Single(array:Array<string>):number{
		if(array.length != 6) return -1;
		for(let i = 0 ; i < array.length - 3 ; i ++){
			if(array[i] === array[i+1] && array[i] ===array[i+2] && array[i] === array[i+3]) return this.orderString.indexOf(array[i]); 
		}
		return -1;
	}
	/**
	 * 判断一手牌是否是四带两对
	 * 如果不是，返回-1; 如果是，返回该牌型的大小排序值
	 */
	public static isFour2Pairs(array:Array<string>):number{
		let newArray:Array<string> = [];
		let four:string;
		if(array.length != 8) return -1;
		for(let i = 0 ; i < array.length -3 ; i ++){
			if(array[i] === array[i+1] && array[i] ===array[i+2] && array[i] === array[i+3]){
				newArray = newArray.concat(ArrayUtils.removeElements(array,[array[i],array[i+1],array[i+2],array[i+3]]));
				four = array[i];
			}
				
		}
		for(let i = 0 ; i < newArray.length -1; i += 2){
			if(newArray[i] !== newArray[i+1]) return -1;
		}
		return this.orderString.indexOf(four);
	}
}