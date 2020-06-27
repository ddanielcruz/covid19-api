import { Request, Response, NextFunction } from 'express';
import isValidId from '@helpers/isValidId';

export default (request: Request, response: Response, next: NextFunction) => {
  const id = request.params['id'] || '';

  if (!isValidId(id)) {
    return response.status(400).json({ error: 'Id is not valid.' });
  }

  next();
};
