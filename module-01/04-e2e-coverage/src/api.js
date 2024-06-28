const http = require('http')
const { once } = require('events')
const DEFAULT_USER = {
    username: 'EdersonSilva',
    password: '123'
}

const routes = {
    '/contact:get': (request, response) => {
        response.write('Contact us page')
        return response.end()
    },
    '/login:post':  async (request, response) => {
        const user = JSON.parse(await once(request, "data"))
        const lower = (text) => text.toLowerCase()
        if(
            lower(user.username) !== lower(DEFAULT_USER.username) ||
            user.password !== DEFAULT_USER.password
        ){
            response.writeHead(401)
            return response.end('Login failed')
        }
        return response.end('Login success')
    },
    default: (request, response) => {
        response.writeHead(404)
        return response.end('not found')
    }
}

function handler(request, response){
    const {url, method} = request;

    const routeKey = `${url.toLowerCase()}:${method.toLowerCase()}`

    const chose = routes[routeKey] || routes.default;
    return chose(request, response)
}

const app = http.createServer(handler).listen(5000, () => {
   console.log('Server running on port 5000') 
})

module.exports = app