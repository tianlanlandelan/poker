class User {
    public constructor(name:string,sex:string){
        this.name = name;
        this.sex = sex;
    }
    private id:string;
    private name:string;
    private sex:string;
    private seat:number = 1;
    private isLandlord:boolean = false;


    public getId():string{
        return this.id;
    }
    public getName():string{
        return this.name;
    }
    public getSex():string{
        return this.sex;
    }
    public getSeat():number{
        return this.seat;
    }
    public getILandlord():boolean{
        return this.isLandlord;
    }
    public setSeat(seat:number){
        this.seat = seat;
    }
    public setId(id:string){
        this.id = id;
    }
    public setName(name:string){
        this.name = name;
    }
    public setLandlord(isLandlord:boolean){
        this.isLandlord = isLandlord;
    }
}