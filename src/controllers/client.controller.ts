import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

import Client from '../models/client.model';

dotenv.config();

export enum Role {
  ADMIN = 'admin',
  CLIENT = 'client',
  DOCTOR = 'doctor',
  ASSISTANT = 'assistant',
  CLINIC_ADMIN = 'clinicAdmin', 
};

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
const secretKey = process.env.TOKEN_SECRET as jwt.Secret;

export type ClientType = {
  _id?: string;
  firstName: string;
  lastName: string;
  username?: string;
  email: string;
  password?: string;
  phone: string;
  gender?: string;
  image?: string;
  birthDate?: string;
  lastVisit?: string;
};

export class ClientModel {
  async setPassword(password: string): Promise<string> {
    const hashedPassword = bcrypt.hashSync(
      password + BCRYPT_PASSWORD,
      parseInt(SALT_ROUNDS as string)
    );
    return hashedPassword;
  }

  async validPassword(
    password: string,
    clientPassword: string
  ): Promise<boolean> {
    return bcrypt.compareSync(password + BCRYPT_PASSWORD, clientPassword);
  }

  async generateJWT(client: ClientType): Promise<string> {
    return jwt.sign(
      {
        id: client._id,
        email: client.email,
        role: Role.CLIENT,
      },
      secretKey,
      { expiresIn: '24h' }
    );
  }

  async login(email: string, password: string): Promise<ClientType | null> {
    try {
      const client = await Client.findOne({ email: email });
      if (client) {
        if (await this.validPassword(password, client.password)) {
          return client;
        } else {
          return null;
        }
      } else {
        return null;
      }
    } catch (err) {
      throw new Error(`Could not find this user ${email} => ${err}`);
    }
  }

  async index(): Promise<ClientType[]> {
    try {
      const clients = await Client.find({},{password:0});
      return clients;
    } catch (err) {
      throw new Error(`Could not find any clients => ${err}`);
    }
  }

  async create(client: ClientType): Promise<ClientType> {
    try {
      const newClient = new Client(client);
      newClient.password = await this.setPassword(client.password as string);
      return await newClient.save();
    } catch (err) {
      throw new Error(`Could not create this client => ${err}`);
    }
  }

  async update(id: string, client: ClientType): Promise<ClientType> {
    try {
      const updatedClient = await Client.findByIdAndUpdate(id, client, {
        new: true,
      });
      return updatedClient;
    } catch (err) {
      throw new Error(`Could not update this client => ${err}`);
    }
  }

  async show(id: string): Promise<ClientType | null> {
    try {
      const clientToShow = await Client.findById(id);
      return clientToShow;
    } catch (err) {
      throw new Error(`Could not show this client => ${err}`);
    }
  }

  async delete(id: string): Promise<ClientType | null> {
    try {
      const deletedClient = await Client.findByIdAndDelete(id);
      return deletedClient;
    } catch (err) {
      throw new Error(`Could not delete this client => ${err}`);
    }
  }

  async findByPassword(
    id: string,
    password: string
  ): Promise<ClientType | null> {
    try {
      const client = await Client.findOne({
        _id: id,
        password: await this.setPassword(password),
      });
      return client;
    } catch (err) {
      throw new Error(`Could not find this client => ${err}`);
    }
  }

  async updatePassword(id: string, password: string): Promise<ClientType> {
    try {
      const updatedClient = await Client.findByIdAndUpdate(
        id,
        { password: await this.setPassword(password) },
        { new: true }
      );
      return updatedClient;
    } catch (err) {
      throw new Error(`Could not update this client => ${err}`);
    }
  }
}
