class SocketMiddWare {
	public route:string;
	public cb:(data:any)=>void;

	public constructor(route:string) {
		this.route = route;

	}
	
	public middWare(data:any):void{
		console.log("data:",data);
		this.cb(data);
	}
	public setCb(cb:(data:any)=>void){
		this.cb = cb;
	}
}