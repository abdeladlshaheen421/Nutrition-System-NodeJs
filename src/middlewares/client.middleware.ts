import { body } from 'express-validator';
import Client from '../models/client.model';

export const validateCreation = [
  // first name
  body('firstName')
    .isAlpha('en-US', { ignore: ' ' })
    .withMessage('Name must be alphabets only.')
    .isLength({ max: 30 })
    .withMessage('Name must be 30 letters max.'),
  // last name
  body('lastName')
    .isAlpha('en-US', { ignore: ' ' })
    .withMessage('Name must be alphabets only.')
    .isLength({ max: 30 })
    .withMessage('Name must be 30 letters max.'),
  // password
  body('password')
    .isStrongPassword()
    .withMessage(
      'Password must be combination of one uppercase, one lower case, one special char and one digit.'
    ),
  // email
  body('email')
    .isEmail()
    .withMessage('Invalid email.')
    .custom(async (value) => {
      const client = await Client.findOne({ email: value });
      if (client) {
        return Promise.reject('E-mail already in use');
      }
    }),
  // phone number
  body('phone')
    .matches(/^01[0125][0-9]{8}$/, 'i')
    .withMessage('Invalid phone number.'),
];
