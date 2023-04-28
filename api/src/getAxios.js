const axios = require('axios')
const https = require('https')
require('dotenv').config()

const API_KEY = process.env.MY_API_KEY

const domain = `https://api.rawg.io/api/games?key=${API_KEY}&dates=2019-09-01,2019-09-30&platforms=18,1,7`

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