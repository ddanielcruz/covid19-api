import { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';

export default () => {
  if (process.env.NODE_ENV === 'test') {
    return (_req: Request, _res: Response, next: NextFunction) => next();
  }

  return morgan(process.env.MORGAN || 'dev');
};
