import { Car, CarSchema } from '../interfaces/CarInterface';
import Service, { ServiceError } from '.';
import CarModel from '../models/Car';

class CarService extends Service<Car> {
  constructor(model = new CarModel()) {
    super(model);    
  }

  create = async (obj: Car): Promise<Car | ServiceError> => {
    const parsed = CarSchema.safeParse(obj);
    if (!parsed.success) {
      return { error: parsed.error };
    }

    const car = this.model.create(obj);

    return car;
  };

  readOne = async (id: string): Promise<Car | null | ServiceError> => {
    const car = await this.model.readOne(id);

    return car;
  };

  update = async (
    id: string,
    obj: Car,
  ): Promise<Car | null | ServiceError> => {
    const parsed = CarSchema.safeParse(obj);
    if (!parsed.success) {
      return { error: parsed.error };
    }

    const car = await this.model.update(id, obj);

    return car;
  };

  delete = async (id: string): Promise<Car | null> => {
    const car = await this.model.delete(id);
    
    return car;
  }; 
}

export default CarService;