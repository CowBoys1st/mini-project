import { EventController } from "@/controllers/event.controller";
import { uploader } from '@/middlewares/upload';                             
import { isEO, verifyToken } from "@/middlewares/token";
import { Router } from "express";

export class EventRouter {
    private router: Router;
    private eventController: EventController;

    constructor() {
        this.eventController = new EventController();
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get("/", this.eventController.getEvents);
        this.router.post("/", this.eventController.createEvent);
        this.router.post('/images', uploader("avatar", "/avatar").single("image"), this.eventController.CreateImage );
        this.router.get("/:id", this.eventController.getEventById)
    }

    getRouter(): Router {
        return this.router;
    }
}