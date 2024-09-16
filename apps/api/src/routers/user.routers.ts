import { UserController } from '@/controllers/user.controller';
import { isCostumer, isEO, verifyToken } from '@/middlewares/token';
import { Request, Response, Router } from 'express';

export class UserRouter {
  private router: Router;
  private userController: UserController;

  constructor() {
    this.userController = new UserController;
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.userController.getUser)
    this.router.get('/:id', this.userController.getUserById)
    this.router.get('/:id/discount-coupons',verifyToken, this.userController.getUserDiscountCoupons)
    this.router.patch('/point',verifyToken, this.userController.getUserPoints)
    this.router.post('/register', this.userController.createUser)
    this.router.post('/login', this.userController.loginUser)
    this.router.delete('/point', verifyToken, this.userController.deleteUserPoints)
    this.router.get('/get/token', verifyToken, this.userController.getUserbyToken)


    this.router.get('/costumer',verifyToken, isCostumer, (req:Request, res:Response) => {
      res.status(200).send({msg:"hello costumer"})
    })
    this.router.get('/eo',verifyToken, isEO, (req:Request, res:Response) => {
      res.status(200).send({msg:"hello event organizer"})
    })
  }

  getRouter(): Router {
    return this.router;
  }
}
