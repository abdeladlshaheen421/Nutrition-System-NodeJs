import express, { Request, Response, NextFunction } from 'express';
import clinicController, { ClinicType } from '../controllers/clinic.controller';
import { validateCreation,isValidIdParam } from '../middlewares/clinic.middleware';
import { validate } from './client.router';

// get all clinics
const index = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const clinics: ClinicType[] = <ClinicType[]>await clinicController.index();
    res.status(200).json(clinics);
  } catch (error) {
    next(error);
  }
};

const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    validate(req);
    const newClinic: ClinicType = <ClinicType>(
      await clinicController.create(req.body)
    );
    res.status(201).json(newClinic);
  } catch (error) {
    next(error);
  }
};

const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    validate(req);
    const clinic: ClinicType = <ClinicType>(
      await clinicController.show(req.params.id)
    );
    res.status(200).json(clinic);
  } catch (error) {
    next(error);
  }
};

const clinicRouter = (app: express.Application): void => {
  app
    .route('/clinics')
    .get(index) // get all clinics in our system
    .post(validateCreation, create); // This will create a clinic for Admin

  app.get('/clinic/:id', isValidIdParam ,show); // get specific clinic details

  app.get('/clinics/search', clinicController.search); // using query param

  app.get('/clinic/:id/doctors', clinicController.clinicDoctors); // get clinic doctors

  app.get('/clinic/:id/assistants', clinicController.clinicAssistants); // get clinic assistants

  app.get('/clinic/:id/patients', clinicController.clinicPatients); //get clinic patients
};

export default clinicRouter;
