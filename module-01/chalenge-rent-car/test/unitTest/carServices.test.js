const {describe, it, before, beforeEach, afterEach} = require('mocha')
const {expect} = require('chai')
const sinon = require('sinon')
const {join} = require('path')
const CarService = require('../../src/service/carService')

const carDatabase = join(__dirname, './../../database', "cars.json") 

const mocks = {
    validCarCategory: require('./../mocks/valid-carCategory.json'),
    validCar: require('./../mocks/valid-car.json'),
    validCustomer: require('./../mocks/valid-customer.json'),
}

describe('CarService Suite Tests', () => {
    let carService = {};
    let sandbox = {};
    before(() => {
        carService = new CarService({cars: carDatabase})
    })

    beforeEach(() => {
        sandbox = sinon.createSandbox()
    })

    afterEach(() => {
        sandbox.restore()
    })

    it('should be return a random position from an array', async () => {
        const data = [0, 1, 2, 3, 4]

        const result = carService.getRandomPositionFromArray(data);

        expect(result).to.be.lessThanOrEqual(data.length).and.be.greaterThanOrEqual(0)
        
    })

    it('should choose the first id from car ids in car category', async () => {
        const carCategory = mocks.validCarCategory
        const index = 0;

        sandbox.stub(
            carService, 
            carService.getRandomPositionFromArray.name
        ).returns(0)

        const result = carService.chooseRandomCar(carCategory);
        const expected = carCategory.carIds[index]

        expect(carService.getRandomPositionFromArray.calledOnce).to.be.ok
        expect(result).to.be.equal(expected)    
    })

    it('should be return an available car', async () => {
        const car = mocks.validCar
        const carCategory = Object.create(mocks.validCarCategory)
        carCategory.carIds = [car.id]

        sandbox.stub(
            carService.carRepository, 
            carService.carRepository.find.name
        ).resolves(car)

        sandbox.spy(
            carService, 
            carService.chooseRandomCar.name
        )

        const result = await carService.getAvailableCar(carCategory)

        const expected = car

        expect(carService.chooseRandomCar.calledOnce).to.be.ok
        expect(carService.carRepository.find.calledWithExactly(car.id)).to.be.ok
        expect(result).to.be.deep.equal(expected)
        
    })
})