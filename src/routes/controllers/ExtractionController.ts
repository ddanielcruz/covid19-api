import { Request, Response } from 'express';
import ExtractionService from '@services/ExtractionService';

class ExtractionController {
  private service: ExtractionService = new ExtractionService();

  byPlace = async (request: Request, response: Response): Promise<Response> => {
    const { id } = request.params;
    const extractions = await this.service.findByPlace(id);

    response.header('X-Total-Count', extractions.length.toString());
    return response.json(extractions);
  };

  today = async (request: Request, response: Response): Promise<Response> => {
    const extractions = await this.service.findByDate(new Date());

    response.header('X-Total-Count', extractions.length.toString());
    return response.json(extractions);
  };
}

export default new ExtractionController();
