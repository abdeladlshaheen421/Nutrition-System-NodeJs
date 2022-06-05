import { body, CustomValidator, param } from 'express-validator';
import Clinic from '../models/clinic.model';
import ClinicAdmin from '../models/clinicadmin.model';
import mongoose from 'mongoose';

const isValidClinicEmail: CustomValidator = (value) => {
  return Clinic.findOne({ email: value }).then((clinic) => {
    if (clinic) {
      return Promise.reject('This email already exist');
    }
  });
};

const isValidClinicAdmin: CustomValidator = (id: string) => {
  const adminId = new mongoose.Types.ObjectId(id);
  return ClinicAdmin.findById(adminId).then((user) => {
    if (!user) {
      return Promise.reject('Enter a valid System Admin');
    }
  });
};

const isValidStartDate: CustomValidator = (val: Number, { req }) => {
  if (val >= <Number>req.body.closesAt)
    return Promise.reject('start date must be before close date');
};

const isValidImage: CustomValidator = (value: string) => {
  const ext: string = value.split('.')[1];
  const extentions: string[] = ['png', 'jpg', 'jpeg'];
  if (!extentions.includes(ext))
    return Promise.reject('please enter a valid image');
};

export const validateCreation = [
  body('name').isAlpha().withMessage('name must be alphabetic'),
  body('email')
    .isEmail()
    .withMessage('email must be a valid email')
    .custom(isValidClinicEmail),
  body('location.city').isAlpha().withMessage('city must be string'),
  body('location.street').isAlpha().withMessage('street must be a string'),
  body('location.building')
    .isNumeric()
    .withMessage('building must be a number'),
  body('waitingTime').isNumeric().withMessage('waiting time must be a number'),
  body('opensAt')
    .isInt({ max: 24, min: 0 })
    .withMessage('start at must be a valid date')
    // .custom(isValidStartDate)
    ,
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
