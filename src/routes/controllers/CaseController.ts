import dayjs from 'dayjs';
import { Request, Response } from 'express';

import CaseService from '@services/CaseService';

class CaseController {
  private service: CaseService = new CaseService();

  today = async (request: Request, response: Response): Promise<Response> => {
    const cases = await this.service.fetchCasesByDate(new Date());

    response.header('X-Total-Count', cases.length.toString());
    return response.json(cases);
  };

  findByDate = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const { date } = request.params;
    const parsedDate = dayjs(date).toDate();
    const cases = await this.service.fetchCasesByDate(parsedDate);

    response.header('X-Total-Count', cases.length.toString());
    return response.json(cases);
  };
}

export default new CaseController();
