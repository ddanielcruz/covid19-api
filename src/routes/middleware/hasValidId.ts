import { Request, Response, NextFunction } from 'express';
import isValidId from '@helpers/isValidId';

export default (key?: string) => (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const id = request.params[key || 'id'] || '';

  if (!isValidId(id)) {
    return response.status(400).json({ error: 'Id is not valid.' });
  }

  next();
};
