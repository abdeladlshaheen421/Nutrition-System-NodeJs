import { NextFunction, Request, Response, Application } from 'express';
import { ClientModel } from '../controllers/client.controller';
import { validateCreation } from './../middlewares/client.middleware';
import { validationResult } from 'express-validator';

const clientInstance = new ClientModel();

export function validate(req: Request): void {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error();
    console.log(errors);
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + ' ', '');
    throw error;
  }
}

const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    validate(req);
    const client = await clientInstance.create(req.body);
    res.status(201).json({ client });
  } catch (error) {
    next(error);
  }
};

const clientRouter = (app: Application) => {
  // create clients (book reservation), '/clients' [POST]
  app.post('/clients', validateCreation, create);
};

// export const verifyAuthToken = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const header = req.headers.authorization as unknown as string;
//     const jwtToken = header.split(' ')[1];
//     const decoded = jwt.verify(jwtToken, secretKey);
//     //sending data of logged in user to the next middleware
//     res.locals.authUser = decoded;
//     next();
//   } catch (error) {
//     res.status(401);
//     res.send('Unauthorized');
//   }
// };
// //GET /api/user
// router.get(
//   '/user',
//   authentication.required,
//   (req: Request, res: Response, next: NextFunction) => {
//     //res.send(req.payload!);
//     //res.send(typeof(req.payload!));
//     User.findById(req.payload!.id)
//       .then((user: UserModel | null) => {
//         res.status(200).json({ user: user!.authJSON() });
//       })
//       .catch(next);
//   }
// );

//POST /api/users/login

// router.post(
//   '/users/login',
//   (req: Request, res: Response, next: NextFunction) => {
//     if (!req.body.user.email) {
//       return res
//         .status(422)
//         .json({ errors: { email: 'You have to enter email' } });
//     }

//     if (!req.body.user.password) {
//       return res
//         .status(422)
//         .json({ errors: { password: 'You have to enter password' } });
//     }

//     passport.authenticate('local', { session: false }, (err, user, info) => {
//       if (err) {
//         return next(err);
//       }
//       if (user) {
//         user.token = user.generateJWT();
//         return res.json({ user: user.authJSON() });
//       } else {
//         return res.status(422).json(info);
//       }
//     })(req, res, next);
//   }
// );

// //PUT /api/user

// router.put(
//   '/user',
//   authentication.required,
//   (req: any, res: Response, next: NextFunction) => {
//     User.findById(req.payload!.id)
//       .then((user: UserModel | null) => {
//         if (!user) {
//           return res.sendStatus(401);
//         }
//         if (!req.body.user.firstName) {
//           user.firstName = req.body.user.firstName;
//         }
//         if (!req.body.user.lastName) {
//           user.lastName = req.body.user.lastName;
//         }
//         if (!req.body.user.email) {
//           user.email = req.body.user.email;
//         }
//         if (!req.body.user.password) {
//           user.setPassword(req.body.user.password);
//         }
//         if (!req.body.user.image) {
//           user.image = req.body.user.image;
//         }

//         return user.save().then(() => {
//           return res.json({ user: user.authJSON() });
//         });
//       })
//       .catch(next);
//   }
// );

export default clientRouter;
