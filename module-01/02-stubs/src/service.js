class Service {
    async makeRequest(url){
        return (await fetch(url)).json()
    }

    async getPlanets(url){
        const data = await this.makeRequest(url);

        return {
            name: data.name,
            terrain: data.terrain,
            showIn: data.films.length
        }
    }
}

module.exports = Service