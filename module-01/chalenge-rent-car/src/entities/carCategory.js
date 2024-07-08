const Base = require('./base')

class CarCategory extends Base{
    constructor({id, name, carIds, categoryPrice}){
        super({id, name})
        
        this.carIds = carIds
        this.categoryPrice = categoryPrice
    }
}

module.exports = CarCategory