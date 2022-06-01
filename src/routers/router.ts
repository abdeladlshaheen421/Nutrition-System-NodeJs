// all routes will be import here and aded in this array then server can read it
import express from 'express';
import {UsersRoutes} from './users'
const root = express.Router();

root.get('/', (req: express.Request, res: express.Response): void => {
  res.status(200).send('Hello World');
});

const router: express.Router[] = [root];

export default router;
