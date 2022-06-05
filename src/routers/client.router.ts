import { NextFunction, Request, Response, Application } from 'express';
import { ClientModel } from '../controllers/client.controller';
import { validateCreation , validateUpdate} from './../middlewares/client.middleware';
import { validationResult } from 'express-validator';
import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.TOKEN_SECRET as jwt.Secret;
const clientInstance = new ClientModel();

export function validate(req: Request): void {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error();
    console.log(errors);
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + ' ', '');
    throw error;
  }
}

export const verifyAuthToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const header = req.headers.authorization as unknown as string;
    const jwtToken = header.split(' ')[1];
    const decoded = jwt.verify(jwtToken, secretKey);
    //sending data of logged in user to the next middleware
    res.locals.authUser = decoded;
    next();
  } catch (error) {
    res.status(401);
    res.send('Unauthorized');
  }
};

const createClient = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    validate(req);
    const client = await clientInstance.create(req.body);
    res.status(201).json({ client });
  } catch (error) {
    next(error);
  }
};

const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const client = await clientInstance.login(req.body.email, req.body.password);
    if (client) {
      const token = await clientInstance.generateJWT(client);
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    next(error);
  }
};

const getAllClients = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if(res.locals.authUser.role === 'admin'){
    const clients = await clientInstance.index();
    res.status(200).json({ clients });
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (error) {
    next(error);
  }
};

const showClient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const clients = await clientInstance.show(req.params.id);
    res.status(200).json({ clients });
  } catch (error) {
    next(error);
  }
};

const updatedClient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    validate(req);
    const clientId = res.locals.authUser.id;
    console.log(clientId);
    delete req.body.password;
    const client = await clientInstance.update(req.params.id, req.body);
    res.status(200).json({ client });
  } catch (error) {
    next(error);
  }
};

const deleteClient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const clientId = res.locals.authUser.id;
    await clientInstance.delete(req.params.id);
    res.status(200).json({ message:"client deleted successfully" });
  } catch (error) {
    next(error);
  }
};


const clientRouter = (app: Application) => {
  app.get('/clients', verifyAuthToken,getAllClients);
  app.get('/clients/:id', verifyAuthToken, showClient);
  app.post('/clients/register', validateCreation, createClient);
  app.post('/clients/login', login);
  app.patch('/clients/update/:id', validateUpdate,verifyAuthToken,updatedClient);
  app.delete('/clients/:id', verifyAuthToken, deleteClient);
};

export default clientRouter;
