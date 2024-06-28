const {createSandbox} = require('sinon');
const assert = require('assert');
const Fibonacci = require('./fibonacci');

const sinon = createSandbox();
;(async ()=> {
    {
        const fibonacci = new Fibonacci();
        const spy = sinon.spy(
            fibonacci,
            fibonacci.execute.name
        )
        const array = fibonacci.execute(3);
        for(const sequency of array){}
        const expectedCallCount = 4;
        assert.strictEqual(spy.callCount, expectedCallCount);
    }
    {
        const fibonacci = new Fibonacci();
        const spy = sinon.spy(
            fibonacci,
            fibonacci.execute.name
        )
        const array = [...fibonacci.execute(8)];
        const expectedCallCount = 9;
        assert.strictEqual(spy.callCount, expectedCallCount);
        const {args} = spy.getCall(6);
        const expectedParams = [2, 8, 13]
        assert.deepStrictEqual(args, expectedParams)
        const expectedResults = [0,1,1,2,3,5,8,13]
        assert.deepEqual(array, expectedResults);
    }

})()