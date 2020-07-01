import { Request, Response } from 'express';

import CaseService from '@services/CaseService';

class CaseController {
  private service: CaseService = new CaseService();

  today = async (request: Request, response: Response): Promise<Response> => {
    const cases = await this.service.fetchCasesByDate(new Date());

    response.header('X-Total-Count', cases.length.toString());
    return response.json(cases);
  };
}

export default new CaseController();
