import { Application, NextFunction, Request, Response } from 'express';
import { matchedData } from 'express-validator';
import { DoctorController, DoctorType } from '../controllers/doctor.controller';
import {
  validateDoctor,
  validateUpdateDoctor,
} from './../middlewares/doctor.middleware';
import { validate, verifyAuthToken } from './client.router';

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
    const matched = matchedData(req, {
      includeOptionals: true,
    });
    const doctor = await DoctorController.update(
      req.params.id,
      <DoctorType>matched
    );
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

const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const doctor = await DoctorController.login(
      req.body.email,
      req.body.password
    );
    if (doctor) {
      const token = await DoctorController.generateJWT(doctor);
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    next(error);
  }
};

const doctorRouter = (app: Application) => {
  app.get('/doctors', verifyAuthToken, index);
  app.get('/doctors/:id', verifyAuthToken, show);
  app.post('/doctors/register', validateDoctor, create);
  app.post('/doctors/login', login);
  app.put('/doctors/:id', validateUpdateDoctor, verifyAuthToken, update);
  app.delete('/doctors/:id', verifyAuthToken, remove);
};

export default doctorRouter;
