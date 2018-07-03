/**
 * 
 * module 模块名，实现了此接口后要在类中定义一个module,module要唯一
 */
interface SocketReceive{
    module:string;
    receive(code:number,data:any);
}