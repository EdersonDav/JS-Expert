const File = require('./src/file')
const {errors} = require('./src/constants')
const assert = require('assert')

// IFEE
;(async () => {
    {
        const file_path = './mocks/empty-file-invalid.csv';
        const expected = new Error(errors.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJson(file_path)
        await assert.rejects(result, expected)
    }
    {
        const file_path = './mocks/invalid-header.csv';
        const expected = new Error(errors.FILE_FIELDS_ERROR_MESSAGE)
        const result = File.csvToJson(file_path)
        await assert.rejects(result, expected)
    }
    {
        const file_path = './mocks/length-invalid.csv';
        const expected = new Error(errors.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJson(file_path)
        await assert.rejects(result, expected)
    }
    {
        const file_path = './mocks/valid.csv';
        const expected = [
            {
                id: 1,
                name:  'Rafaela',
                profession: 'Developer',
                age: 29
            },
            {
                id: 2,
                name:  'Ederson',
                profession: 'Developer',
                age: 28
            },
            {
                id: 3,
                name:  'Laercio',
                profession: 'Mechanic',
                age: 57
            },
            {
                id: 4,
                name:  'Maria',
                profession: 'House Matter',
                age: 58
            }
        ]
        const result = await File.csvToJson(file_path)
        await assert.deepEqual(result, expected)
    }
    
})()