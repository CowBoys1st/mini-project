import { EventController } from '@/controllers/event.controller';
import { isEO, verifyToken } from '@/middlewares/token';
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
    this.router.get('/', this.eventController.getEvents);
    this.router.get('/:id', this.eventController.getEventById);
    this.router.post('/',verifyToken, isEO, this.eventController.createEvents);
    this.router.post('/images', uploader("event", "/events").single("image"), this.eventController.CreateImage );
    this.router.get('/eo/eo', verifyToken, isEO, this.eventController.getEventByEoId )
  }

  getRouter(): Router {
    return this.router;
  }
}