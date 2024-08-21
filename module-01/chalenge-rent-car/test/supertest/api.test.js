const {describe, it} = require('mocha');
const supertest = require('supertest');
const {expect} = require('chai')

describe('API Tests', () => {
  const app = require('../../src/server')

  describe('/:get', () => {
    it('should request the first route return HTTP Status 200', async () => {
      const response = await supertest(app)
      .get('/')
      .expect(200)
      
      expect(response.body).to.be.deep.equal({message: 'Hello World'})
    })
  })
})