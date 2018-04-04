
/**
 * Created by Bob Jiang on 2015/4/23.
 */

declare class Pomelo {
    public init(params: any, wss:boolean,succCb: (response: any) => void, errorCb: (response: any) => void, closeCb: (response: any) => void,thisArgs): void;
    public request(route: string, msg: any, cb: (response: any) => void): void;
    public notify(route: string, msg: any): void;
    public on(route: string, cb: (response: any) => void): void;
    public off(route: string): void;
    public disconnect();

}