import { NextFunction, Request, Response, Application } from 'express';
import { AssistantModel } from '../controllers/assistant.controller';
import { validateCreation } from './../middlewares/assistant.middleware';
import { validationResult } from 'express-validator';

const assistantInstance = new AssistantModel();

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

const assistantRouter = (app: Application) => {
  // create assistants  '/assistants' [POST]
  app.post('/assistants', validateCreation, create);
};



export default assistantRouter;
