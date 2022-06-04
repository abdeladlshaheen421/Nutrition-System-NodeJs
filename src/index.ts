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
import clinicRouter from './routers/clinic.router';
import clientRouter from './routers/client.router';
dotenv.config();
const { SERVER_PORT } = process.env;

const app: express.Application = express();
const PORT = SERVER_PORT || 8080;

mongoose
  .connect(
    'mongodb+srv://admin:admin@nutritionsystem.rdmpf.mongodb.net/final?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('Connecting to DB ...');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} ...`);
    });
  })
  .catch((error) => {
    console.log(error + '');
  });

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

// home page
app.get('/', (req: express.Request, res: express.Response): void => {
  res.status(200).json({ welcomeMessage: 'Welcome To Our Nutrition System' });
});

// clinic routers
clinicRouter(app);

// client routers
clientRouter(app);

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
    // return res.status(500).json({ error: 'Internal server error' });
  }
);

export default app;
