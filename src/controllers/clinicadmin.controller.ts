import ClinicAdminModel from './../models/clinicadmin.model';

export type ClinicAdminType = {
  name: string;
  email: string;
  password: string;
  phone: number;
  birthDate: Date;
  nationalId: number;
  image: string;
};

export class ClinicAdminController {
  public static async create(
    clinicAdmin: ClinicAdminType
  ): Promise<ClinicAdminType> {
    return await ClinicAdminModel.create(clinicAdmin);
  }

  public static async getAll(): Promise<ClinicAdminType[]> {
    return await ClinicAdminModel.find();
  }

  public static async getOne(id: string): Promise<ClinicAdminType | null> {
    return await ClinicAdminModel.findById(id);
  }

  public static async update(
    id: string,
    clinicAdmin: ClinicAdminType
  ): Promise<ClinicAdminType | null> {
    return await ClinicAdminModel.findByIdAndUpdate(id, clinicAdmin);
  }

  public static async delete(id: string): Promise<ClinicAdminType | null> {
    return await ClinicAdminModel.findByIdAndDelete(id);
  }
}
