import { body, CustomValidator, param } from 'express-validator';
import Clinic from '../models/clinic.model';
import ClinicAdmin from '../models/clinicadmin.model';
import mongoose from 'mongoose';

// validate unique email for every Clinic
const isValidClinicEmail: CustomValidator = (value) => {
  return Clinic.findOne({ email: value }).then((clinic) => {
    if (clinic) {
      return Promise.reject('This email already exist');
    }
  });
};

// validate function if clinic exists
const isClinic: CustomValidator = (clinicId: string) => {
  return Clinic.findById(clinicId).then((clinic) => {
    if (!clinic) {
      return Promise.reject("This Clinic doesn't exist");
    }
  });
};

// validate param id
export const isValidIdParam = param('id')
  .isMongoId()
  .withMessage('Not Valid Id');
export const isValidClinic = param('id').custom(isClinic);

// to validate adminId if found
const isValidClinicAdmin: CustomValidator = (id: string) => {
  const adminId = new mongoose.Types.ObjectId(id);
  return ClinicAdmin.findById(adminId).then((user) => {
    if (!user) {
      return Promise.reject('Enter a valid System Admin');
    }
  });
};

// to validate start and end date to be not overlaps
const isValidStartDate: CustomValidator = (val: Number, { req }) => {
  if (val >= <Number>req.body.closesAt)
    return Promise.reject('start date must be before close date');
};

// to validate image from user
const isValidImage: CustomValidator = (value: string) => {
  const ext: string = value.split('.')[1];
  const extentions: string[] = ['png', 'jpg', 'jpeg'];
  if (!extentions.includes(ext))
    return Promise.reject('please enter a valid image');
};

// validate request to body to create new Clinic
export const validateCreation = [
  body('name')
    .isAlpha('en-US', { ignore: ' ' })
    .withMessage('name must be alphabetic'),
  body('email')
    .isEmail()
    .withMessage('email must be a valid email')
    .custom(isValidClinicEmail),
  body('location.city')
    .isAlpha('en-US', { ignore: ' ' })
    .withMessage('city must be string'),
  body('location.street')
    .isAlpha('en-US', { ignore: ' ' })
    .withMessage('street must be a string'),
  body('location.building')
    .isNumeric()
    .withMessage('building must be a number'),
  body('waitingTime').isNumeric().withMessage('waiting time must be a number'),
  body('opensAt')
    .isInt({ max: 24, min: 0 })
    .withMessage('start at must be a valid date')
    .custom(isValidStartDate),
  body('closesAt')
    .isInt({ max: 24, min: 0 })
    .withMessage('close at must be a valid close hour'),
  body('phone')
    .matches(/^01[0125][0-9]{8}$/, 'i')
    .withMessage('phone must be a valid egyptian phone number'),
  body('price').isFloat().withMessage('price must be a number'),
  body('clinicAdmin')
    .isMongoId()
    .withMessage('please enter a valid admin id')
    .custom(isValidClinicAdmin),
  body('image').optional().custom(isValidImage),
];

export const validateUpdate = [
  body('name')
    .optional()
    .isAlpha('en-US', { ignore: ' ' })
    .withMessage('name must be alphabetic'),
  body('location.city')
    .optional()
    .isAlpha('en-US', { ignore: ' ' })
    .withMessage('city must be string'),
  body('location.street')
    .optional()
    .isAlpha('en-US', { ignore: ' ' })
    .withMessage('street must be a string'),
  body('location.building')
    .optional()
    .isNumeric()
    .withMessage('building must be a number'),
  body('waitingTime')
    .optional()
    .isNumeric()
    .withMessage('waiting time must be a number'),
  body('opensAt')
    .optional()
    .isInt({ max: 24, min: 0 })
    .withMessage('start at must be a valid date'),
  // .custom(isValidStartDate)
  body('closesAt')
    .optional()
    .isInt({ max: 24, min: 0 })
    .withMessage('close at must be a valid close hour'),
  body('phone')
    .optional()
    .matches(/^01[0125][0-9]{8}$/, 'i')
    .withMessage('phone must be a valid egyptian phone number'),
  body('price').optional().isFloat().withMessage('price must be a number'),
  body('image').optional().custom(isValidImage),
];
