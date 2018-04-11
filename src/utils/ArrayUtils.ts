/**
 * 数组操作工具类
 */
class ArrayUtils {
	public constructor() {
	}
		/**
	 * 从一个数组中移除部分数组元素
	 * array 要操作的数组
	 * elements 要移除的数组元素
	 */
	public static  removeElements(array:Array<any>,elements:Array<any>):Array<any>{
		for(let i = 0 ; i < elements.length ; i ++){
			for(let j = 0 ; j < array.length ; j ++){
				if(elements[i] == array[j]){
					array = this.slice(array,0,j).concat(this.slice(array,j + 1,array.length));
					break;
				}
			}
		}
		return array;
	}
	public static slice(array:Array<any>,i:number,j:number):Array<any>{
		if(i < 0 || j < 0 || i > array.length || j > array.length){
			return [];
		}else{
			return array.slice(i,j);
		}
	}

}