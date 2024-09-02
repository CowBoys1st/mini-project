type AUser = {
    userId: number;
    email: string;
    roleId: number;
}

declare namespace Express {
    export interface Request {
        user?:AUser
    }
}