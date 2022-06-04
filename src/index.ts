import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import clinicRouter from './routers/clinics';
dotenv.config();
const { SERVER_PORT } = process.env;

const app: express.Application = express();

mongoose
  .connect('mongodb://localhost:27017/dbname')
  .then((): void => {
    console.log('connected to mongodb');
    app.listen(SERVER_PORT || 8080, (): void => {
      console.log(`Server is running ... http://localhost:${SERVER_PORT}`);
    });
  })
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
// home page

app.get('/', (req: express.Request, res: express.Response): void => {
  res.status(200).json({ welcomeMessage: 'Welcome To Our Nutrition System' });
});
// clinic routers
clinicRouter(app);

// Not Found Handler
app.use((req: Request, res: Response, next: NextFunction): Response => {
  return res.status(404).json({ error: 'Route is Not Found' });
});

// Error Handler
app.use(
  (
    error: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
  ): Response => {
    return res.status(500).json({ error: error + ' ' });
  }
);

export default app;
