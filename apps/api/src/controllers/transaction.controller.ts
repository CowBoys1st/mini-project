import { Request, Response } from 'express';
import prisma from '@/prisma';


export class TransactionController {
  async getTransaction(req: Request, res: Response) {
    const transaction = await prisma.eventTransaction.findMany();

    return res.status(200).send({
        status:"ok",
        transaction
    });
  }

  async getTransactionById(req: Request, res: Response) {
    const { id } = req.params;

    const sample = await prisma.sample.findUnique({
      where: { id: Number(id) },
    });

    if (!sample) {
      return res.status(400).send({status:"ok", sample});
    }

    return res.status(200).send(sample);
  }

  async createTransaction(req: Request, res: Response) {
    const { eventId, userId, price, ticketType, discountCode } = req.body;

    try {
      let finalPrice = price;

      if (discountCode) {
        const discountCoupon = await prisma.discountCoupon.findUnique({
          where: { code: discountCode },
        });

        if (!discountCoupon) {
          return res.status(400).send({
            status: "error",
            message: "Invalid discount code",
          });
        }

        const currentDate = new Date();
        if (discountCoupon.expiresAt < currentDate) {
          return res.status(400).send({
            status: "error",
            message: "Discount code has expired",
          });
        }

        if (discountCoupon.used) {
          return res.status(400).send({
            status: "error",
            message: "Discount code has already been used",
          });
        }
        finalPrice = price - discountCoupon.discountValue;
      }

      const transaction = await prisma.eventTransaction.create({
        data: {
          eventId: Number(eventId),
          userId: Number(userId),
          price: finalPrice, 
          ticketType,
        },
      });

      if (discountCode) {
        await prisma.discountCoupon.update({
          where: { code: discountCode },
          data: { used: true },
        });
      }

      return res.status(201).send({
        status: "ok",
        transaction,
      });

    } catch (error) {
      return res.status(500).send({
        status: "error",
        message: "An error occurred while creating the transaction",
      });
    }
  }
}
