const axios = require('axios')
const https = require('https')
require('dotenv').config()

//const API_KEY = 2c943d87ab6a45c5939d6a582f7aed98
const domain = `https://api.rawg.io/api/games?key=2c943d87ab6a45c5939d6a582f7aed98&dates=2019-09-01,2019-09-30&platforms=18,1,7`

let instance

module.exports = function (context)
{
    if (!instance)
    {
        //create axios instance
        instance = axios.create({
            baseURL: domain,
            timeout: 60000, //optional
            httpsAgent: new https.Agent({ keepAlive: true }),
            headers: {'Content-Type':'application/xml'}
        })
    }
    return instance;
}
