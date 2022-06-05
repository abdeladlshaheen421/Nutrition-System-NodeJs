import { Application, NextFunction, Request, Response } from 'express';
import { DoctorController } from '../controllers/doctor.controller';
import { validateDoctor } from './../middlewares/doctor.middleware';
import { validate } from './client.router';

const index = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const doctors = await DoctorController.getAll();
    res.status(200).json({ doctors });
  } catch (err) {
    next(err);
  }
};

const show = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const doctor = await DoctorController.getOne(req.params.id);
    res.status(200).json({ doctor });
  } catch (err) {
    next(err);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    validate(req);
    const doctor = await DoctorController.create(req.body);
    res.status(200).json({ doctor });
  } catch (err) {
    next(err);
  }
};

const update = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    validate(req);
    const doctor = await DoctorController.update(req.params.id, req.body);
    res.status(200).json({ doctor });
  } catch (err) {
    next(err);
  }
};

const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const doctor = await DoctorController.delete(req.params.id);
    res.status(200).json({ doctor });
  } catch (err) {
    next(err);
  }
};

const doctorRouter = (app: Application) => {
  app.get('/doctors', index);
  app.get('/doctors/:id', show);
  app.post('/doctors', validateDoctor, create);
  app.put('/doctors/:id', validateDoctor, update);
  app.delete('/doctors/:id', remove);
};

export default doctorRouter;
