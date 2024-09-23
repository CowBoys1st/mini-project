import { Router } from 'express';
import { ReviewController } from '@/controllers/review.controller'; 
import { verifyToken } from '@/middlewares/token'; 

export class ReviewRouter {
  private router: Router;
  private reviewController: ReviewController;

  constructor() {
    this.reviewController = new ReviewController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/', verifyToken, this.reviewController.createReview);
    this.router.get('/', verifyToken, this.reviewController.getReviewsByEventId);
  }

  public getRouter(): Router {
    return this.router;
  }
}
