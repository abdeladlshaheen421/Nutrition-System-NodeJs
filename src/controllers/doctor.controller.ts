import { ObjectId } from 'mongoose';
import Doctor from './../models/doctor.model';
import { ClientModel } from '../controllers/client.controller';
import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.TOKEN_SECRET as jwt.Secret;

export type DoctorType = {
  _id?: string;
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

const clientInstance = new ClientModel();
export class DoctorController {
  public static async generateJWT(doctor: DoctorType): Promise<string> {
    return jwt.sign(
      {
        id: doctor._id,
        email: doctor.email,
      },
      secretKey,
      { expiresIn: '24h' }
    );
  }

  public static async create(doctor: DoctorType): Promise<DoctorType> {
    try {
      doctor.password = await clientInstance.setPassword(doctor.password);
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
      return await Doctor.findByIdAndUpdate(id, doctor, { new: true });
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

  public static async login(
    email: string,
    password: string
  ): Promise<DoctorType | null> {
    try {
      const doctor = await Doctor.findOne({ email: email });
      if (doctor) {
        if (await clientInstance.validPassword(password, doctor.password)) {
          return doctor;
        } else {
          return null;
        }
      } else {
        return null;
      }
    } catch (err) {
      throw new Error(`Could not find this doctor ${email} => ${err}`);
    }
  }
}
