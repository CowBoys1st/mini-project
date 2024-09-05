
import { EventController } from '@/controllers/event.controller';
import { uploader } from '@/middlewares/upload';
import { Router } from 'express';

export class EventRouter {
  private router: Router;
  private eventController: EventController;

  constructor() {
    this.eventController = new EventController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/', this.eventController.createEvents);
    this.router.post('/images', uploader("avatar", "/avatar").single("avatar"), this.eventController.CreateImage );
  }

  getRouter(): Router {
    return this.router;
  }
}
