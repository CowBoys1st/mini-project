import { SampleController } from '@/controllers/sample.controller';
import { TransactionController } from '@/controllers/transaction.controller';
import { verifyToken } from '@/middlewares/token';
import { Router } from 'express';


export class TransactionRouter {
  private router: Router;
  private transactionController: TransactionController;

  constructor() {
    this.transactionController = new TransactionController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.transactionController.getTransaction);
    this.router.get('/:id', this.transactionController.getTransactionById);
    this.router.post('/', verifyToken, this.transactionController.createTransaction);
    this.router.get('/find/:id', verifyToken, this.transactionController.checkTransaction)
    this.router.patch('/:id', verifyToken, this.transactionController.updateTransaction)
  }

  getRouter(): Router {
    return this.router;
  }
}
