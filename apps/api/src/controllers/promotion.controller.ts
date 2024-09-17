import { Request, Response } from 'express';
import prisma from '@/prisma';
import { Promotion } from '@prisma/client';


export class PromotionController {
  async getPromotion(req: Request, res: Response) {
    const promotions:Promotion[] = await prisma.promotion.findMany();

    return res.status(200).send(promotions);
  }

  async getPromotionByEventId(req: Request, res: Response) {
    const { id } = req.params;

    const promotion = await prisma.sample.findUnique({
      where: { id: +id },
    });

    if (!promotion) {
      return res.send(404);
    }

    return res.status(200).send({
        status:"ok",
        promotion
    });
  }

  async createPromotion(req: Request, res: Response) {
    const {
      eventId,
      discountValue,
      PromotionCode,
      maxUsage,
      expiresAt,
    } = req.body;

    try {
      if (!eventId || !discountValue || !PromotionCode || !maxUsage || !expiresAt) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const newPromotion = await prisma.promotion.create({
        data: {
          eventId: +eventId,
          discountValue: +discountValue,
          PromotionCode,
          maxUsage: +maxUsage,
          expiresAt: new Date(expiresAt), 
        },
      });

      return res.status(201).json({
        status: 'ok',
        message: 'Promotion created successfully',
        promotion: newPromotion,
      });
    } catch (error) {
      console.error('Error creating promotion:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  
}

