interface IUser {
    id: number;
    email: string;
    password: string;
    name: string;
    roleId: number;
    referralNumber: string;
    points: number;
    referredUsers: IReferral[];
    discountCoupons: IDiscountCoupon[];
    createdAt: Date;
    updatedAt: Date;
}

interface IReferral {
    id: number;
    referralNumber: string;
    userId: number;
    referredUserId: number;
    pointsGenerated: number;
    expiresAt: Date;
    createdAt: Date;
    referredUser: IUser;
}

interface IDiscountCoupon {
    id: number;
    userId: number;
    code: string;
    discountValue: number;
    expiresAt: Date;
    used: boolean;
    createdAt: Date;
    user: IUser;
}

interface ICreateUserDTO {
    email: string;
    password: string;
    name: string;
    roleId: number;
    referral?: string;
}
interface ICreateReferralDTO {
    referralNumber: string;
    userId: number;
    referredUserId: number;
    pointsGenerated?: number;
    expiresAt: Date;
}
interface IUserResponse {
    status: string;
    newUser?: IUser;
    error?: string;
}
interface IGetUsersResponse {
    status: string;
    users: IUser[];
    error?: string;
}
export type DiscountCoupon = {
    id: number;
    userId: number;
    code: string;
    discountValue: number;
    expiresAt: Date;
    used: boolean;
    createdAt: Date;
  };
  
  
export type UserWithDiscountCoupons = {
    id: number;
    name: string;
    email: string;
    discountCoupons: DiscountCoupon[];
  };
  