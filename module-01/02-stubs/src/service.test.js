const Service = require('./service');
const assert = require('assert');
const {createSandbox} = require('sinon');

const mocks = {
    alderaan: require('../mocks/alderaan.json'), 
    tatooine: require('../mocks/tatooine.json') 
}
const sinon = createSandbox()

const BASE_URL = "https://swapi.dev/api/"


// IFEE
;(async () => {
    const service = new Service();

    const stub = sinon.stub(
        service,
        service.makeRequest.name
    )
    stub.withArgs(BASE_URL + 'planets/1/').resolves(mocks.tatooine)
    stub.withArgs(BASE_URL + 'planets/2/').resolves(mocks.alderaan)

    {
        const expected = {
            name:"Tatooine",
            terrain:"desert",
            showIn: 5
        }

        const result = await service.getPlanets(BASE_URL + 'planets/1/');
        assert.deepEqual(result, expected)
    }
    {
        const expected = {
            name:"Alderaan",
            terrain:"grasslands, mountains",
            showIn: 2
        }

        const result = await service.getPlanets(BASE_URL + 'planets/2/');
        assert.deepEqual(result, expected)
    }
    
})()