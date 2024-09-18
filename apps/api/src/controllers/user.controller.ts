import { PrismaClient, User, DiscountCoupon } from '@prisma/client';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserWithDiscountCoupons } from '@/types/user.types';


const prisma = new PrismaClient();

export class UserController {
  async getUser(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany();

      res.status(200).send({
        status: 'ok',
        users,
      });
    } catch (error) {
      return res.status(400).send({
        message: 'Error get user',
        error,
      });
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const id = +req.params.id;
      const users = await prisma.user.findUnique({
        where: {
          id: id,
        },
        include: {
          referredUsers: true,
        },
      });

      res.status(200).send({
        status: 'ok',
        users,
      });
    } catch (error) {
      return res.status(400).send({
        message: 'Error get user',
        error,
      });
    }
  }

  async getUserbyToken (req:Request, res:Response) {
    try {
      const id = req.user?.userId
      const user = await prisma.user.findUnique({
        where:{id:Number(id)}
      })

      return res.status(200).send({user})
    } catch (err) {
      return res.status(400).send({status:"err", msg:err})
    }
  }

  async getUserDiscountCoupons(req: Request, res: Response) {
    const userId = parseInt(req.params.id)
    console.log(userId);
    
  
    try {
      const user:UserWithDiscountCoupons | null = await prisma.user.findUnique({
        where: { id: req.user?.userId },
        include: {
          discountCoupons: true,
        },
      });
  
      if (!user) {
        return res.status(404).send({
          status: 'error',
          message: 'User not found',
        });
      }

      res.status(200).send({
        status: 'ok',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          discountCoupons: user.discountCoupons,
        },
      })

    } catch (error) {
      res.status(500).send({
        status: 'error',
        message: 'Error retrieving discount coupons',
        error,
      });
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      const { email, name, password, roleId, referral } = req.body;

      const existingEmail: User | null = await prisma.user.findUnique({
        where: { email },
      });

      if (existingEmail) {
        throw 'email already used';
      }

      const hashedPassword: string = await bcrypt.hash(password, 10);

      const newUser: User = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          roleId:+roleId,
        },
      });

      if (referral) {
        const user: { id: number } | null = await prisma.user.findUnique({
          where: { referralNumber: referral },
          select: { id: true },
        });

        if (!user) throw 'referral number error';
        await prisma.referral.create({
          data: {
            referralNumber: referral,
            userId: newUser.id,
            referredUserId: user.id,
            expiresAt: new Date(
              new Date().setFullYear(new Date().getFullYear() + 1),
            ),
          },
        });

        const discountCoupons: DiscountCoupon =
          await prisma.discountCoupon.create({
            data: {
              userId: newUser.id,
              expiresAt: new Date(
                new Date().setFullYear(new Date().getFullYear() + 1),
              ),
            },
          });

        console.log(discountCoupons);
      }

      return res.status(201).send({
        status: 'ok',
        newUser,
      });
    } catch (error) {
      return res.status(500).send({
        message: 'Error creating user',
        error,
      });
    }
  }

  async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({
        where: { email },
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
        { expiresIn: '1h' },
      );

      console.log(token);

      return res.status(200).send({
        status: 'ok',
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          roleId: user.roleId,
        },
      });
    } catch (error) {
      return res.status(500).send({
        message: 'Error logging in',
        error: error instanceof Error ? error.message : error,
      });
    }
  }

  async getUserPoints(req: Request, res: Response) {
    try {
      const id = req.user?.userId;
      
      const currentDate = new Date();

      await prisma.referral.deleteMany({
        where: {
          expiresAt: {
            lt: currentDate,  // 'lt' stands for 'less than', meaning expired referrals
          },
        },
      });

      const userWithReferredUsers = await prisma.user.findUnique({
        where: { id: id },
        include: {
          referredUsers: true, 
        },
      })

  
      if (!userWithReferredUsers) {
        return res.status(200).send({ points: 0 })
      }
  
      const totalPoints = userWithReferredUsers.referredUsers.length * 10000
  
      return res.status(200).send({ points: totalPoints });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Something went wrong" })
    }
  }

  async deleteUserPoints (req:Request, res:Response) {
    try {
      const id = req.user?.userId

      await prisma.referral.deleteMany({
        where:{referredUserId:id}
      })

      return res.status(200).send({status:"ok", msg:"delete Points success"})
    } catch (err) {
      console.log(err);
      return res.status(500).send({message:"error deleting points"})
    }
  }
  
}
