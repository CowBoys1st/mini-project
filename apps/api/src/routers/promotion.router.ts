
import { PromotionController } from '@/controllers/promotion.controller';
import { isEO, verifyToken } from '@/middlewares/token';
import { Router } from 'express';

export class PromotionRouter {
  private router: Router;
  private promotionController: PromotionController;

  constructor() {
    this.promotionController = new PromotionController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.promotionController.getPromotion);
    this.router.get('/:id', this.promotionController.getPromotionByEventId);
    this.router.post('/', verifyToken, isEO, this.promotionController.createPromotion)
  }

  getRouter(): Router {
    return this.router;
  }
}
