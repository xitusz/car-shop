import {
  Motorcycle,
  MotorcycleSchema,
} from '../interfaces/MotorcycleInterface';
import Service, { ServiceError } from '.';
import MotorcycleModel from '../models/Motorcycle';

class MotorcycleService extends Service<Motorcycle> {
  constructor(model = new MotorcycleModel()) {
    super(model);    
  }

  create = async (obj: Motorcycle): Promise<Motorcycle | ServiceError> => {
    const parsed = MotorcycleSchema.safeParse(obj);
    if (!parsed.success) {
      return { error: parsed.error };
    }

    const motorcycle = this.model.create(obj);

    return motorcycle;
  };

  readOne = async (id: string): Promise<Motorcycle | null | ServiceError> => {
    const motorcycle = await this.model.readOne(id);

    return motorcycle;
  };

  update = async (
    id: string,
    obj: Motorcycle,
  ): Promise<Motorcycle | null | ServiceError> => {
    const parsed = MotorcycleSchema.safeParse(obj);
    if (!parsed.success) {
      return { error: parsed.error };
    }

    const motocycle = await this.model.update(id, obj);

    return motocycle;
  };

  delete = async (id: string): Promise<Motorcycle | null> => {
    const motorcycle = await this.model.delete(id);
    
    return motorcycle;
  };
}

export default MotorcycleService;