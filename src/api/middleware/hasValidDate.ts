import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Request, Response, NextFunction } from 'express';

dayjs.extend(customParseFormat);

export default (request: Request, response: Response, next: NextFunction) => {
  const date = request.params['date'] || '';
  const parsedDate = dayjs(date, 'YYYY-MM-DD', 'true');

  if (!parsedDate.isValid()) {
    return response.status(400).json({
      error:
        'Date is not valid (it must be informed in the YYYY-MM-DD format).',
    });
  }

  next();
};
