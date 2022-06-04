import { Application, Request, Response } from 'express';
import { ClinicAdminController } from '../controllers/clinicadmin.controller';
import { validate } from './../middlewares/clinicadmin.middleware';

const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const clinicAdmins = await ClinicAdminController.getAll();
    res.status(200).json({ clinicAdmins });
  } catch (err) {
    throw new Error(`Could not get clinic admins => ${err}`);
  }
};

const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const clinicAdmin = await ClinicAdminController.getOne(req.params.id);
    res.status(200).json({ clinicAdmin });
  } catch (err) {
    throw new Error(`Could not show this clinic admin => ${err}`);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const clinicAdmin = await ClinicAdminController.create(req.body);
    res.status(200).json({ clinicAdmin });
  } catch (err) {
    throw new Error(`Could not create this clinic admin => ${err}`);
  }
};

const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const clinicAdmin = await ClinicAdminController.update(
      req.params.id,
      req.body
    );
    res.status(200).json({ clinicAdmin });
  } catch (err) {
    throw new Error(`Could not edit this clinic admin => ${err}`);
  }
};

const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const clinicAdmin = await ClinicAdminController.delete(req.params.id);
    res.status(200).json({ clinicAdmin });
  } catch (err) {
    throw new Error(`Could not delete this clinic admin => ${err}`);
  }
};

const clinicAdminRouter = (app: Application) => {
  app.get('/clinic-admins', index);
  app.get('/clinic-admins/:id', show);
  app.post('/clinic-admins', validate, create);
  app.put('/clinic-admins/:id', validate, update);
  app.delete('/clinic-admins/:id', remove);
  // app.get('/clinic-admins/:id/clinics', getAllClinics);
  // app.get('/clinic-admins/:id/clinics/:id', getOneClinic);
};

export default clinicAdminRouter;
