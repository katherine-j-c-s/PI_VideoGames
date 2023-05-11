const axios = require('axios');
const {Genre} = require('../db')
require('dotenv').config()

async function getGenres(req,res){
    try {
        const data = await Genre.findAll()
        let genres = data.map(g=> g.dataValues)
        res.status(200).json(genres)
    } catch (error) {
        console.log("api/src/controlers/Genres/getGenres:",error);
    }
}
async function getGenreDescription(req,res){
    const {id} = req.params
    try {
        if(id){
            let detailsGenre = await axios.get(`https://api.rawg.io/api/genres/${id}?key=f8ed5decf7b547b193d7895b9c21716c`)
            res.status(200).json(detailsGenre.data)
        }
    } catch (error) {
        console.log("api/src/controlers/Genres/getGenreDescription:",error);
    }
}
module.exports = {getGenres,getGenreDescription}
//////////////FUNCIONES CON LAS CUALES CREE LA DB DE GENRES
