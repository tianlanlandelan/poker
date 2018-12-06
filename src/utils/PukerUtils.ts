class PukerUtils {
	public constructor() {
	}

	/**
	 * TODO 去掉pukerIds，而将该数组的下标作为牌的id
	 * 牌大小
	 */
	private static pukerSortValues:Array<number> =  [ 
		12,12,12,12,//A
		13,13,13,13,//2
		1,1,1,1,//3
		2,2,2,2,//4
		3,3,3,3,//5
		4,4,4,4,//6
		5,5,5,5,//7
		6,6,6,6,//8
		7,7,7,7,//9
		8,8,8,8,//10
		9,9,9,9,//J
		10,10,10,10,//Q
		11,11,11,11,//K
		14,15//King
	];

	/**
	 * A的大小值
	 */
	public static AValue:number = 12;
	public static BigKingValue:number = 15;
	public static SmallKingValue:number = 14;


    /**
	 * 牌面的id
	 */
	private static pukerIds:Array<number> = [
					1,2,3,4,//A
					5,6,7,8,//2
					9,10,11,12,//3
					13,14,15,16,//4
					17,18,19,20,//5
					21,22,23,24,//6
					25,26,27,28,//7
					29,30,31,32,//8
					33,34,35,36,//9
					37,38,39,40,//10
					41,42,43,44,//J
					45,46,47,48,//Q
					49,50,51,52,//K
					53,54];//King


	/**
	 * 随机生成一副牌
	 */
	public static getRandomPokers():Array<Poker>{
		//定义Poker数组，这是最终要生成的一副扑克牌
		let pokers:Array<Poker> =new Array<Poker>();
		//选中的牌的下标
		let index:number;
		//将pukerIds重新复制一份作为选牌期间要处理的数组
		let newArray:Array<number> = this.pukerIds.slice();
		//选中的牌的id
		let pukerIndex:number;
		//选中的牌的id组成的数组
		let array:Array<number> = [];
		//遍历扑克牌Id数组
		for(let i = 0 ; i < this.pukerIds.length ; i ++){
			//随机生成一个小于要处理的数组长度的整数，作为选中的牌的下标
			index = Math.floor(Math.random() * newArray.length);
			//取数选中的id
			pukerIndex = newArray[index];
			//将选中的id放入数组
			array.push(pukerIndex);
			//将选剩下的牌重新组成一个数组
			newArray = ArrayUtils.slice(newArray,0,index).concat(ArrayUtils.slice(newArray,index + 1,newArray.length));
		}	
		//遍历选中的扑克id
		for(let j = 0 ; j < array.length ; j ++){
			//从pukerIds和pukerSortValues中取出对应的属性值组成一幅扑克牌
			let poker:Poker = new Poker(this.pukerIds[array[j] - 1],this.pukerSortValues[array[j] -1])
			pokers.push(poker);
		}
		console.log("已随机生成一副牌",pokers.toString());
		return pokers;
	}

	public static sortDescPokers(pokers:Array<Poker>):Array<Poker>{
		return pokers.sort(this.sortDesc);
	}

	/**
	 * 从一个数组中移除一些元素
	 * 使用 ArrayUtils.removeElements时发现，其对对象数组无效，自己写了一个
	 */
	public static removePokers(array:Array<Poker>,elements:Array<Poker>):Array<Poker>{
		let result:Array<Poker> = new Array<Poker>();
		for(let i = 0 ; i < array.length ; i ++){
			let falg:boolean = false;
			for(let j = 0 ; j < elements.length ; j ++){
				if(array[i].getId() == elements[j].getId()){
					falg = true;
				}
			}
			if(!falg){
				result.push(array[i]);
			}
		}
		return result;
	}

	/**
	 * 倒序排列的排序条件
	 */
	public static sortDesc(a:Poker,b:Poker):number{
			if(a.getOrderValue() < b .getOrderValue()) return 1;
			else if(a .getOrderValue() > b.getOrderValue()) return -1;
            else return 0;    
    }

	public static randomUsers:Array<any> = [
        {uid:"1001",name:"大可",sex:"man"},
        {uid:"1002",name:"Tiger",sex:"lady"},
        {uid:"1003",name:"翔",sex:"man"},
        {uid:"1004",name:"傻源源",sex:"man"},
        {uid:"1005",name:"傻乐乐",sex:"man"},
        {uid:"1006",name:"小巴西",sex:"lady"},
        {uid:"1007",name:"油烟机",sex:"man"},
        {uid:"1008",name:"可乐鸡翅",sex:"lady"},
        {uid:"1009",name:"酸辣土豆丝",sex:"lady"},
        {uid:"1010",name:"糖拌西红柿",sex:"man"},
        {uid:"1011",name:"拍黄瓜",sex:"man"},
        {uid:"1012",name:"空调没有遥控器",sex:"man"},
        {uid:"1013",name:"这么晚了还不回家",sex:"lady"},
        {uid:"1014",name:"程咬金",sex:"man"},
        {uid:"1015",name:"猫砂不会盖",sex:"man"},
        {uid:"1016",name:"风扇不摇头",sex:"man"},
        {uid:"1017",name:"油炸花生米",sex:"man"},
        {uid:"1018",name:"电视不能看",sex:"man"},
        {uid:"1019",name:"绿萝",sex:"lady"},
        {uid:"1020",name:"薄荷糖不麻",sex:"lady"},
        {uid:"1021",name:"翔的小姐姐",sex:"lady"},
        {uid:"1022",name:"孤单想吃西瓜",sex:"man"},
        {uid:"1023",name:"一个人看烟花",sex:"lady"},
        {uid:"1024",name:"大海啊你全是水",sex:"man"},
        {uid:"1025",name:"骏马啊你四条腿",sex:"man"}
        ];

	public static getRandomUser():User{
		let user = this.randomUsers[Math.floor(Math.random() * this.randomUsers.length)];
		return new User(user.name,user.sex);
	}
	public static textTip:Array<string> = [
		"不要","没你的大","要不起","你厉害","我认怂","你牛","过","GO","PASS","0.0"
	];
	public static getRandomTextTip():string{
		return this.textTip[Math.floor(Math.random() * this.textTip.length)];
	}
}