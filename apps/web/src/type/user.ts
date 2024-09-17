export interface IUserReg{
    name:string,
    email:string,
    password:string,
    roleId:number,
    referral?:string
}

export interface IUserLogin{
    email:string,
    password:string
}