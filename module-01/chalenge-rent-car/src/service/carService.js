const BaseRepository = require('../repository/base/baseRepository') 

class CarService {
    constructor({cars}){
        this.carRepository = new BaseRepository({file: cars})
    }

    chooseRandomCar(carCategory){
        const random = this.getRandomPositionFromArray(carCategory.carIds)
        return carCategory.carIds[random]
    }

    getRandomPositionFromArray(list){
        return Math.floor(Math.random() * list.length)
    }

    async getAvailableCar(carCategory) {
        const carId = this.chooseRandomCar(carCategory);
        return this.carRepository.find(carId)
    }
}

module.exports = CarService