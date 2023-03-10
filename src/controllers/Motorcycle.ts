import { Response } from 'express';
import Controller, { RequestWithBody, ResponseError } from '.';
import MotorcycleService from '../services/Motorcycle';
import { Motorcycle } from '../interfaces/MotorcycleInterface';

class MotorcycleController extends Controller<Motorcycle> {
  private _route: string;

  constructor(
    service = new MotorcycleService(),
    route = '/motorcycles',
  ) {
    super(service);
    this._route = route;
  }

  get route() { return this._route; }

  create = async (
    req: RequestWithBody<Motorcycle>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;

    try {
      const motorcycle = await this.service.create(body);
      
      if (!motorcycle) {
        return res.status(500).json({ error: this.errors.internal });
      }

      if ('error' in motorcycle) {
        return res.status(400).json(motorcycle);
      }

      return res.status(201).json(motorcycle);
    } catch (err) {
      return res.status(400).json();
    }
  };

  readOne = async (
    req: RequestWithBody<Motorcycle>,
    res: Response<Motorcycle | ResponseError | null>,
  ): Promise<typeof res> => {
    const { id } = req.params;

    try {
      if (id.length < 24) {
        return res.status(400).json({ error: this.errors.validId });
      }

      const motorcycle = await this.service.readOne(id);

      if (!motorcycle) {
        return res.status(404).json({ error: this.errors.notFound });
      }

      return res.status(200).json(motorcycle);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  update = async (
    req: RequestWithBody<Motorcycle>,
    res: Response<Motorcycle | ResponseError | null>,
  ): Promise<typeof res> => {
    const { id } = req.params;

    try {
      if (id.length < 24) {
        return res.status(400).json({ error: this.errors.validId });
      }

      const motorcycle = await this.service.update(id, req.body);

      if (!motorcycle) {
        return res.status(404).json({ error: this.errors.notFound });
      }

      if ('error' in motorcycle) return res.status(400).json(motorcycle);

      return res.status(200).json(motorcycle);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  delete = async (
    req: RequestWithBody<Motorcycle>,
    res: Response,
  ): Promise<typeof res> => {
    const { id } = req.params;

    try {
      if (id.length < 24) {
        return res.status(400).json({ error: this.errors.validId });
      }

      const motorcycle = await this.service.delete(id);

      if (!motorcycle) {
        return res.status(404).json({ error: this.errors.notFound });
      }

      return res.status(204).json(motorcycle);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };
}

export default MotorcycleController;
