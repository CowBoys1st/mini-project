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

export interface DiscountCoupon {
    id: number;
    userId: number;
    code: string;
    discountValue: number;
    expiresAt: string; // Could also be Date if parsing the string
  }
  
export interface User {
    id: number;
    name: string;
    email: string;
    discountCoupons: DiscountCoupon[];
  }
  
export  interface ApiResponse {
    status: string;
    user: User;
  }