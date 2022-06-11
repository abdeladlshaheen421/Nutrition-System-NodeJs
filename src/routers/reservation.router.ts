import { Application, NextFunction, Request, Response } from 'express';
import {
  validateCreation,
  validateUpdate,
} from '../middlewares/reservation.middleware';
import { Status } from '../models/reservation.model';
import { ReservationController } from './../controllers/reservation.controller';
import { isValidIdParam } from './../middlewares/clinic.middleware';

const reserveFromClinic = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const reservation = await ReservationController.create({
      ...req.body,
      status: Status.APPROVED,
    });
    res.status(201).json({ reservation });
  } catch (error) {
    next(error);
  }
};

const reserveFromAPI = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const reservation = await ReservationController.create({
      ...req.body,
      status: Status.PENDING,
    });
    res.status(201).json({ reservation });
  } catch (error) {
    next(error);
  }
};

const replyToReservationRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const reservationId = req.body.reservationId;
    const status = req.body.status;
    const updatedReservation = ReservationController.update(
      reservationId,
      status
    );
    res.status(200).json({ updatedReservation });
  } catch (error) {
    next(error);
  }
};

const attend = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reservationId = req.body.reservationId;
    const status = Status.COMPLETED;
    const updatedReservation = ReservationController.update(
      reservationId,
      status
    );
    res.status(200).json({ updatedReservation });
  } catch (error) {
    next(error);
  }
};

const getClinicReservations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reservations = await ReservationController.getClinicReservations(
      req.params.id
    );
    res.status(200).json({ reservations });
  } catch (error) {
    next(error);
  }
};

const getReservationById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reservation = await ReservationController.getOne(req.params.id);
    res.status(200).json({ reservation });
  } catch (error) {
    next(error);
  }
};

const reservationRouter = (app: Application) => {
  app.get('/reservations/clinic/:id', isValidIdParam, getClinicReservations);
  app.get('/reservations/:id', isValidIdParam, getReservationById);
  app.post('/reservations/clinic', validateCreation, reserveFromClinic);
  app.post('/reservations/api', validateCreation, reserveFromAPI);
  app.post('/reservations/reply', validateUpdate, replyToReservationRequest);
  app.post('/reservations/attend', validateUpdate, attend);
};

export default reservationRouter;
