import { Request, Response } from 'express';
import prisma from '@/prisma';

export class ReviewController {
  async createReview(req: Request, res: Response) {
    const { eventId, rating, comment } = req.body;

    const userId = req.user?.userId;

    if (!userId) {
      return res.status(400).send({
        status: 'error',
        message: 'User ID is missing or invalid',
      });
    }
    if (!rating) {
      return res.status(400).send({
        status: 'error',
        message: 'Rating is required',
      });
    }
    
    try {
      const review = await prisma.review.create({
        data: {
          eventId: +eventId,
          userId: +userId, 
          rating: +rating,
          comment,
        },
      });
      res.status(200).send({ status: 'ok', review });
    } catch (err) {
      res.status(400).send({
        status: 'error',
        message: 'Failed to create review',
      });
    }
  }
}
