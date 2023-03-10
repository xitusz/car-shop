import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon';
import { Model } from 'mongoose';
import Car from '../../../services/Car';

const mock = {
  "_id": "4edd40c86762e0fb12000003",
  "model": "Ferrari Maranello",
  "year": 1963,
  "color": "red",
  "buyValue": 3500000,
  "seatsQty": 2,
  "doorsQty": 2
}

describe('Test Car Service', () => {
  describe('test create Car', () => {
    before(() => {
      sinon.stub(Model, 'create').resolves(mock);
    })

    after(() => {
      (Model.create as SinonStub).restore()
    })

    it('create sucessfully', async () => {
      const car = new Car();

      const result = await car.create({
        "model": "Ferrari Maranello",
        "year": 1963,
        "color": "red",
        "buyValue": 3500000,
        "doorsQty": 2,
        "seatsQty": 2,
      });

      expect(result).to.be.deep.equal(mock);
    })
  })

  describe('test find Car', () => {
    before(() => {
      sinon.stub(Model, 'find').resolves([mock])
    })

    after(() => {
      (Model.find as SinonStub).restore()
    })

    it('find sucessfully', async () => {
      const car = new Car();

      const result = await car.read();

      expect(result).to.be.deep.equal([mock]);
    })
  })

  describe('test findOne Car', () => {
    before(() => {
      sinon.stub(Model, 'findOne').resolves(mock)
    })

    after(() => {
      (Model.findOne as SinonStub).restore()
    })

    it('findOne sucessfully', async () => {
      const car = new Car();

      const result = await car.readOne('4edd40c86762e0fb12000003');

      expect(result).to.be.deep.equal(mock);
    })
  })
})