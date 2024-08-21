const BaseRepository = require('../repository/base/baseRepository') 
const Tax = require('../entities/tax')
const Transactions = require('../entities/transactions')
class CarService {
    constructor({cars}){
        this.carRepository = new BaseRepository({file: cars})
        
        
        this.taxesBaseOnAge = Tax.taxesBasedOnAge
        this.currencyFormat = new Intl.NumberFormat('pt-br', {
            style: 'currency',
            currency: 'BRL'
        })
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

    calcFinalPrice(customer, carCategory, numberOfDays){
        const { age } = customer
        const { categoryPrice } = carCategory
        const { then: tax } = this.taxesBaseOnAge.find(tax => tax.from <= age && tax.to >= age)

        const finalPrice = ((tax * categoryPrice) * numberOfDays)
        return this.currencyFormat.format(finalPrice)
    }

    async rent(customer, carCategory, numberOfDays){
        const car = await this.getAvailableCar(carCategory);

        const finalPrice = this.calcFinalPrice(customer, carCategory, numberOfDays)

        const today = new Date()

        today.setDate(today.getDate() + numberOfDays);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }

        const dueDate = today.toLocaleDateString('pt-br', options)

        const transaction = new Transactions({
            amount: finalPrice,
            car,
            customer,
            dueDate
        })

        return transaction
    }
}

module.exports = CarService