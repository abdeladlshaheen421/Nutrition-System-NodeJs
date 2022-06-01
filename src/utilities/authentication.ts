import { Request } from 'express';
const jwt =  require('express-jwt');
import { JWT_SECRET } from "./secrets";

function getTokenHeader(req: Request): string | null {
  const headerAuthorization: string | string[] = req.headers.authorization!;

  if (!headerAuthorization) {

    if (Array.isArray(headerAuthorization)) {
      return extractToken(headerAuthorization[0]);
    } else {
      return extractToken(headerAuthorization);
    }

  } else {
    return null;
  }
}


function extractToken(headerAuthorizationPassed: string) {

  if (headerAuthorizationPassed.split(' ')[0] === 'Bearer') {
    return headerAuthorizationPassed.split(' ')[1];

  } else {
    return null;
  }
}

const auth = {
  required: jwt({
    credentialsRequired: true,
    secret             : JWT_SECRET,
    getToken           : getTokenHeader,
    userProperty       : 'payload',
    algorithms         : ['HS256']
  }),

  optional: jwt({
    credentialsRequired: false,
    secret             : JWT_SECRET,
    getToken           : getTokenHeader,
    userProperty       : 'payload',
    algorithms         : ['HS256']
  })
};

export const authentication = auth;
