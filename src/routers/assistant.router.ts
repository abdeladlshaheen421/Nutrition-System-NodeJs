import { NextFunction, Request, Response, Application } from 'express';
import { AssistantController } from '../controllers/assistant.controller';
import {validateCreation, validateUpdate}  from './../middlewares/assistant.middleware';
import { validationResult } from 'express-validator';
import {isValidIdParam } from '../middlewares/clinic.middleware';

const assistantInstance = new AssistantController();

function validate(req: Request): void {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error();
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + ' ', '');
    throw error;
  }
}

const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    validate(req);
    const assistant = await assistantInstance.create(req.body);
    res.status(201).json({ assistant });
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
    const assistant = await assistantInstance.login(req.body.email, req.body.password);
    if (assistant) {
      const token = await assistantInstance.generateJWT(assistant);
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    next(error);
  }
};

const index = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      validate(req);
      const assistants = await assistantInstance.index();
      res.status(200).json({ assistants });
    } catch (error) {
      next(error);
    }
  };
  
  const show = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      validate(req);
      const assistant = await assistantInstance.show(req.params.id);
      res.status(200).json({ assistant });
    } catch (error) {
      next(error)
    }
  };
  
  const update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      validate(req);
      delete req.body.password;
      const assistant = await assistantInstance.update(
        req.params.id,
        req.body
      );
      res.status(200).json({ assistant });
    } catch (error) {
      next(error)
    }
  };
  
  const remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      validate(req);
      const assistant = await assistantInstance.delete(req.params.id);
      res.status(200).json({ assistant });
    } catch (error) {
      next(error)
    }
  };

const assistantRouter = (app: Application) => {
    app.get('/assistants', index);
    app.get('/assistants/:id',isValidIdParam, show);
    app.post('/assistants', validateCreation, create);
    app.post('/assistants/login', login);
    app.patch('/assistants/:id',isValidIdParam, validateUpdate, update);
    app.delete('/assistants/:id',isValidIdParam, remove);
  };

export default assistantRouter;
