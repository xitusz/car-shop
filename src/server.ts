import CarController from './controllers/Car';
import { Car } from './interfaces/CarInterface';
import MotorcycleController from './controllers/Motorcycle';
import { Motorcycle } from './interfaces/MotorcycleInterface';
import CustomRouter from './routes/Router';
import App from './app';

const server = new App();

const carController = new CarController();

const carRouter = new CustomRouter<Car>();
carRouter.addRoute(carController);

server.addRouter(carRouter.router);

const motorcycleController = new MotorcycleController();

const motorcycleRouter = new CustomRouter<Motorcycle>();
motorcycleRouter.addRoute(motorcycleController);

server.addRouter(motorcycleRouter.router);

export default server;
