export {};

declare global {
  namespace Express {
    interface Request {
      payload:{
        id: number,
        email: string,
        exp: number
      };
    }
  }
}
