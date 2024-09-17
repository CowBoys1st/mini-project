import { Request, Response } from 'express';
import prisma from '@/prisma';

export class TransactionController {
  async getTransaction(req: Request, res: Response) {
    const transaction = await prisma.eventTransaction.findMany();

    return res.status(200).send({
      status: 'ok',
      transaction,
    });
  }

  async checkTransaction(req: Request, res: Response) {
    const userId = req.user?.userId;
    const eventId = +req.params.id;

    try {
      const sample = await prisma.eventTransaction.findFirst({
        where: {
          userId: Number(userId),
          eventId: eventId,
          isPaid: false,
        },
      });

      if (!sample) {
        return res.status(200).send({ status: 'ok', transanstion: sample });
      }

      return res.status(200).send(sample);
    } catch (error) {
      return res
        .status(500)
        .send({ status: 'error', message: 'Something went wrong', error });
    }
  }

  async updateTransaction(req: Request, res: Response) {
    const id = +req.params.id;

    try {
      const transaction = await prisma.eventTransaction.findUnique({
        where: {
          id: id,
        },
      });

      if (!transaction) {
        return res
          .status(404)
          .send({ status: 'error', message: 'Transaction not found' });
      }

      const updatedTransaction = await prisma.eventTransaction.update({
        where: {
          id: id,
        },
        data: {
          isPaid: true,
        },
      });

      const newTicket = await prisma.ticket.create({
        data: {
          userId: updatedTransaction.userId,
          eventId: updatedTransaction.eventId,
        },
      });

      return res.status(200).send({
        status: 'ok',
        transaction: updatedTransaction,
        ticket: newTicket,
      });
    } catch (error) {
      return res
        .status(500)
        .send({ status: 'error', message: 'Something went wrong', error });
    }
  }

  async getTransactionById(req: Request, res: Response) {
    const { id } = req.params;

    const sample = await prisma.sample.findUnique({
      where: { id: Number(id) },
    });

    if (!sample) {
      return res.status(400).send({ status: 'ok', sample });
    }

    return res.status(200).send(sample);
  }

  async createTransaction(req: Request, res: Response) {
    const { eventId, price, discountCode } = req.body;

    try {
      let finalPrice = price;

      if (discountCode) {
        const discountCoupon = await prisma.discountCoupon.findUnique({
          where: { code: discountCode },
        });

        if (!discountCoupon) {
          return res.status(400).send({
            status: 'error',
            message: 'Invalid discount code',
          });
        }

        const currentDate = new Date();
        if (discountCoupon.expiresAt < currentDate) {
          return res.status(400).send({
            status: 'error',
            message: 'Discount code has expired',
          });
        }

        if (discountCoupon.used) {
          return res.status(400).send({
            status: 'error',
            message: 'Discount code has already been used',
          });
        }

        const potongan = price * (discountCoupon.discountValue/100);
        finalPrice = price - potongan
      }

      const transaction = await prisma.eventTransaction.create({
        data: {
          eventId: Number(eventId),
          userId: Number(req.user?.userId),
          price: finalPrice,
        },
      });

      if (discountCode) {
        await prisma.discountCoupon.update({
          where: { code: discountCode },
          data: { used: true },
        });
      }

      return res.status(201).send({
        status: 'ok',
        transaction,
      });
    } catch (error) {
      return res.status(500).send({
        status: 'error',
        message: 'An error occurred while creating the transaction',
      });
    }
  }
}
