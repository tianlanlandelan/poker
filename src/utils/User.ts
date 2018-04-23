class User {
    public constructor(id:number,name:string,sex:string){
        this.id = id;
        this.name = name;
        this.sex = sex;
    }
    private id:number;
    private name:string;
    private sex:string;

    public getId():number{
        return this.id;
    }
    public getName():string{
        return this.name;
    }
    public getSex():string{
        return this.sex;
    }
}