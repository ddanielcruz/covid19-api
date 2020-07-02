import { Request, Response } from 'express';
import PlaceService from '@services/PlaceService';

class PlaceController {
  private service: PlaceService = new PlaceService();

  index = async (request: Request, response: Response): Promise<Response> => {
    const { query } = request.query;
    const places = await this.service.findAll(query?.toString() || '');

    response.header('X-Total-Count', places.length.toString());
    return response.json(places);
  };

  show = async (request: Request, response: Response): Promise<Response> => {
    const { id } = request.params;
    const place = await this.service.findOne(id);

    if (place == null) {
      return response.status(404).json({ message: 'Place not found.' });
    }

    return response.json(place);
  };
}

export default new PlaceController();
