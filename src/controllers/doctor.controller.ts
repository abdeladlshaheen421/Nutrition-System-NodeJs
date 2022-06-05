import { ObjectId } from 'mongoose';
import Doctor from './../models/doctor.model';

export type DoctorType = {
  name: string;
  email: string;
  password: string;
  phone: string;
  startTime: string;
  endTime: string;
  gender?: string;
  clinic: ObjectId;
  image?: string;
};

export class DoctorController {
  public static async create(doctor: DoctorType): Promise<DoctorType> {
    try {
      console.log(doctor);
      return await Doctor.create(doctor);
    } catch (error) {
      throw new Error(error as string);
    }
  }

  public static async getAll(): Promise<DoctorType[]> {
    try {
      return await Doctor.find();
    } catch (error) {
      throw new Error(error as string);
    }
  }

  public static async getOne(id: string): Promise<DoctorType | null> {
    try {
      return await Doctor.findById(id);
    } catch (error) {
      throw new Error(error as string);
    }
  }

  public static async update(
    id: string,
    doctor: DoctorType
  ): Promise<DoctorType | null> {
    try {
      return await Doctor.findByIdAndUpdate(id, doctor);
    } catch (error) {
      throw new Error(error as string);
    }
  }

  public static async delete(id: string): Promise<DoctorType | null> {
    try {
      return await Doctor.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
