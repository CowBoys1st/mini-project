import { PrismaClient, User, DiscountCoupon } from '@prisma/client';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export class UserController {

    async getUser(req:Request, res:Response) {
        try {
            
            const users = await prisma.user.findMany()

            res.status(200).send({
                status:"ok",
                users
            })


        } catch (error) {
            return res.status(400).send({
                message: 'Error get user', 
                error 
               });
        }
    }


    async createUser(req: Request, res: Response) {
        try {
           const {email, name,password, roleId, referral} = req.body

           const existingEmail: User | null = await prisma.user.findUnique({
            where: { email }
            });

           if (existingEmail) {
            throw "email already used"
           }

           const hashedPassword: string = await bcrypt.hash(password, 10);

           const newUser: User = await prisma.user.create({
               data: {
                   email,
                   password: hashedPassword,
                   name,
                   roleId,
               },
           });

           if (referral) {
                const user: { id: number } | null = await prisma.user.findUnique({
                    where: { referralNumber: referral },
                    select: { id: true }
                });
                
                if (!user) throw "referral number error"
                await prisma.referral.create({
                    data:{
                        referralNumber:referral,
                        userId: newUser.id ,
                        referredUserId: user.id,
                        expiresAt: new Date(new Date().setFullYear(new Date().getFullYear() + 1)) 
                    }
                })

                const discountCoupons:DiscountCoupon = await prisma.discountCoupon.create({
                    data:{
                        userId:newUser.id,
                        expiresAt:new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
                    }
                })

                console.log(discountCoupons)
           }

           return res.status(201).send({
            status:"ok",
            newUser
           })


        } catch (error) {
            return res.status(500).send({
                message: 'Error creating user',
                error
            });
        }
    }
    

    async loginUser(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            const user = await prisma.user.findUnique({
                where: { email }
            });
            if (!user) {
                return res.status(404).send({ message: 'User not found' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).send({ message: 'Invalid credentials' });
            }

            
            const token = jwt.sign(
                { userId: user.id, email: user.email, roleId: user.roleId },
                process.env.JWT_SECRET || 'sangat rahasia',
                { expiresIn: '1h' }
            );

            return res.status(200).send({
                status: "ok",
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    roleId: user.roleId
                }
            });
        } catch (error) {
            return res.status(500).send({
                message: 'Error logging in',
                error: error instanceof Error ? error.message : error
            });
        }
    }
}