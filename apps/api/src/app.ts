import express, {
  json,
  urlencoded,
  Express,
  Request,
  Response,
  NextFunction,
  Router,
} from 'express';
import cors from 'cors';
import { PORT } from './config';
import { SampleRouter } from './routers/sample.router';
import { UserRouter } from './routers/user.routers';
import { EventRouter } from './routers/event.router';
import { PromotionRouter } from './routers/promotion.router';
import { TransactionRouter } from './routers/transaction';
import path from 'path'; 

export default class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    this.app.use(cors());
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
    this.app.use('/public', express.static(path.join(__dirname, '../public')));
  }

  private handleError(): void {
    // not found
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.path.includes('/api/')) {
        res.status(404).send('Not found !');
      } else {
        next();
      }
    });

    // error
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (req.path.includes('/api/')) {
          console.error('Error : ', err.stack);
          res.status(500).send('Error !');
        } else {
          next();
        }
      },
    );
  }

  private routes(): void {
    const sampleRouter = new SampleRouter();
    const userRouter = new UserRouter();
    const eventRouter = new EventRouter()
    const promotionRouter = new PromotionRouter();
    const transactionRouter = new TransactionRouter()

    this.app.get('/api', (req: Request, res: Response) => {
      res.send(`Hello, Purwadhika Student API!`);
    });
    this.app.use('/api/promotions', promotionRouter.getRouter())
    this.app.use('/api/events', eventRouter.getRouter())
    this.app.use('/api/samples', sampleRouter.getRouter());
    this.app.use('/api/users', userRouter.getRouter())
    this.app.use('/api/transaction', transactionRouter.getRouter())
    this.app.use('/api/events', eventRouter.getRouter());
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
    });
  }
}
