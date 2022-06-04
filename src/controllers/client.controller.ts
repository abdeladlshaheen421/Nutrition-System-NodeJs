import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

const Client = require('../models/Client');

dotenv.config();

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
const secretKey = process.env.TOKEN_SECRET as jwt.Secret;

export type client = {
  _id?: string;
  first_name: string;
  last_name: string;
  username?: string;
  email: string;
  password?: string;
  phone?: number;
  gender?: string;
  birth_date?: string;
  last_visit?: string;
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

  async generateJWT(client: client): Promise<string> {
    return jwt.sign(
      {
        id: client._id,
        email: client.email,
      },
      secretKey,
      { expiresIn: '24h' }
    );
  }

  async login(email: string, password: string): Promise<client | null> {
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

  async index(): Promise<client[] | null> {
    try {
      const clients = await Client.find();
      return clients;
    } catch (err) {
      throw new Error(`Could not find any clients => ${err}`);
    }
  }

  async create(client: client): Promise<client | null> {
    try {
      const newClient = new Client(client);
      const savedClient = await newClient.save();
      return savedClient;
    } catch (err) {
      throw new Error(`Could not create this client => ${err}`);
    }
  }

  async update(id: string, client: client): Promise<client | null> {
    try {
      const updatedClient = await Client.findByIdAndUpdate(id, client, {
        new: true,
      });
      return updatedClient;
    } catch (err) {
      throw new Error(`Could not update this client => ${err}`);
    }
  }

  async show(id: string, client: client): Promise<client | null> {
    try {
      const clientToShow = await Client.findById(id);
      return clientToShow;
    } catch (err) {
      throw new Error(`Could not show this client => ${err}`);
    }
  }
  
  async delete(id: string): Promise<client | null> {
    try {
      const deletedClient = await Client.findByIdAndDelete(id);
      return deletedClient;
    } catch (err) {
      throw new Error(`Could not delete this client => ${err}`);
    }
  }
}
