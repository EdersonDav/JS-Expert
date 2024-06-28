const {readFile} = require('fs/promises') 
const {errors} = require('./constants')
const DEFAULT_OPTIONS = {
    maxLine: 4,
    fields: ["id","name","profession","age"]
}

class File{
    static async csvToJson(file_path){
        const content = await readFile(file_path, 'utf8')
        const validation = this.isValid(content);
        
        if(!validation.valid) throw new Error(validation.error)

        return this.parseCSVToJSON(content)
    }

    static isValid(csv_string, options = DEFAULT_OPTIONS){
        const [header, ...with_out_header] = csv_string.split(/\r?\n/)
        const is_header_valid = header === options.fields.join(',');

        if(!with_out_header.length || with_out_header.length > options.maxLine){
            return {
                error: errors.FILE_LENGTH_ERROR_MESSAGE,
                valid: false
            }
        }

        if(!is_header_valid){
            return {
                error: errors.FILE_FIELDS_ERROR_MESSAGE,
                valid: false
            }
        }

        return {valid: true}

    }

    static parseCSVToJSON(csv_string){
        const [first, ...with_out_header] = csv_string.split(/\r?\n/);

        const header_array = first.split(',');

        const result = with_out_header.map((line) => {
            const users = line.split(',');
            const user = {}
            for(const index in users){
                user[header_array[index]] = users[index].trim()
            }

            return user
        })

        return result;
    }
}

module.exports = File