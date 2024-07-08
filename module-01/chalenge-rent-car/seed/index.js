const faker = require('faker')

const {Car, CarCategory, Customer} = require('../src/entities')
const { join } = require('path')

const seederBaseFolder = join(__dirname, "../", "database");
const { writeFile } = require('fs/promises')

const ITEMS_AMOUNT = 2;

const carCategory = new CarCategory({
    name: faker.vehicle.type(),
    id: faker.datatype.uuid(),
    carIds: [],
    categoryPrice: faker.finance.amount(20, 100)
});

const cars = [];
const customers = [];

for (let index = 0; index <= ITEMS_AMOUNT; index++) {
    const car = new Car({
        id: faker.datatype.uuid(),
        name: faker.vehicle.type(),
        available: true,
        gasAvailable: true,
        releaseYear: faker.date.past().getFullYear()
    })

    cars.push(car)
    carCategory.carIds.push(car.id)

    const customer = new Customer({
        id: faker.datatype.uuid(),
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        age: faker.datatype.number({min: 18, max: 50})
    })
    customers.push(customer)
}

const write = (filename, data) => writeFile(join(seederBaseFolder, filename), JSON.stringify(data, null, "\t"))

;(async () => {
    await write('cars.json', cars)
    await write('customers.json', customers)
    await write('carCategory.json', [carCategory])
})()