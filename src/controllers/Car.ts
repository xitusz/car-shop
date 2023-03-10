import { Response } from 'express';
import Controller, { RequestWithBody, ResponseError } from '.';
import CarService from '../services/Car';
import { Car } from '../interfaces/CarInterface';

class CarController extends Controller<Car> {
  private _route: string;

  constructor(
    service = new CarService(),
    route = '/cars',
  ) {
    super(service);
    this._route = route;
  }

  get route() { return this._route; }

  create = async (
    req: RequestWithBody<Car>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;

    try {
      const car = await this.service.create(body);
      
      if (!car) {
        return res.status(500).json({ error: this.errors.internal });
      }

      if ('error' in car) {
        return res.status(400).json(car);
      }

      return res.status(201).json(car);
    } catch (err) {
      return res.status(400).json();
    }
  };

  readOne = async (
    req: RequestWithBody<Car>,
    res: Response<Car | ResponseError | null>,
  ): Promise<typeof res> => {
    const { id } = req.params;

    try {
      if (id.length < 24) {
        return res.status(400).json({ error: this.errors.validId });
      }

      const car = await this.service.readOne(id);

      if (!car) {
        return res.status(404).json({ error: this.errors.notFound });
      }

      return res.status(200).json(car);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  update = async (
    req: RequestWithBody<Car>,
    res: Response<Car | ResponseError | null>,
  ): Promise<typeof res> => {
    const { id } = req.params;

    try {
      if (id.length < 24) {
        return res.status(400).json({ error: this.errors.validId });
      }

      const car = await this.service.update(id, req.body);

      if (!car) {
        return res.status(404).json({ error: this.errors.notFound });
      }

      if ('error' in car) return res.status(400).json(car);

      return res.status(200).json(car);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  delete = async (
    req: RequestWithBody<Car>,
    res: Response,
  ): Promise<typeof res> => {
    const { id } = req.params;

    try {
      if (id.length < 24) {
        return res.status(400).json({ error: this.errors.validId });
      }

      const car = await this.service.delete(id);

      if (!car) {
        return res.status(404).json({ error: this.errors.notFound });
      }

      return res.status(204).json(car);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };
}

export default CarController;
