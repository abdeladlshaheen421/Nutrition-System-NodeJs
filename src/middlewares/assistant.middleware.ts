import { body } from 'express-validator';
import Assistant from '../models/assistant.model';
import Clinic from '../models/clinic.model';

export const validateCreation = [
  // Name
  body('name')
    .trim()
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
    .trim()
    .isEmail()
    .withMessage('Invalid email.')
    .custom(async (value) => {
      const assistant = await Assistant.findOne({ email: value });
      if (assistant) {
        return Promise.reject('E-mail already in use');
      }
    }),
  // Clinic
  body('clinic')
    .not()
    .isEmpty()
    .withMessage('You should enter value for the clinic')
    .isMongoId()
    .withMessage('Not valid Object ID')
    .custom(async (value) => {
      const clinic = await Clinic.findOne({ _id: value });
      if (!clinic) {
        return Promise.reject(
          'Assistant must have a clinic that he belongs to..'
        );
      }
    }),

  //image
  body('image')
    .optional({ nullable: true })
    .custom(async (value, { req }) => {
      const imageFile = req.files && req.files.image;
      if (!imageFile) {
        return true;
      } else if (Array.isArray(imageFile)) {
        throw new Error('Only one Image file is allowed.');
      }
      if (
        imageFile.mimetype !== 'image/png' &&
        imageFile.mimetype !== 'image/jpg' &&
        imageFile.mimetype !== 'image/jpeg'
      ) {
        throw new Error(
          'Only .png, .jpg and .jpeg image formats are allowed for Image file.'
        );
      }
    }),
];
