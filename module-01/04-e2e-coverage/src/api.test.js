const {describe, it, before, after} = require('mocha');
const supertest = require('supertest');
const assert = require('assert');

describe('API Tests', () => {
    let app;
    before((done) => {
        app = require('./api')
        app.once('listening', done)
    })

    after(done => app.close(done))

    describe('/contact:get', () => {
        it('should request the contact route and return HTTP Status 200', async () => {
            const response = await supertest(app)
            .get('/contact')
            .expect(200)
            assert.strictEqual(response.text, 'Contact us page')
        })
    })

    describe('/login:post', () => {
        it('should request the login route and return HTTP Status 200', async () => {
            const response = await supertest(app)
            .post('/login')
            .send({username: 'EdersonSilva', password: '123'})
            .expect(200)
            assert.strictEqual(response.text, 'Login success')
        })
        it('should request the login route and return HTTP Status 401', async () => {
            const response = await supertest(app)
            .post('/login')
            .send({username: 'EdersonSiva', password: '123'})
            .expect(401)
            assert.strictEqual(response.text, 'Login failed')
        })
    })

    describe('/default', () => {
        it('should request the invalid route and return not found', async () => {
            const response = await supertest(app)
            .get('/default')
            .expect(404)
            assert.strictEqual(response.text, 'not found')
        })
    })
})