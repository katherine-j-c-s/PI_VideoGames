const express = require('express');
const router = express.Router()
const axios = require('axios')
const { 
    validateName, 
    validateDate, 
    validateRate, 
    showGames, 
    addOrFind,
    search
} = require('../controlers/Videogame')
const {Videogame} = require('../db')

require('dotenv').config()

const API_KEY = process.env.MY_API_KEY

router.get('/', async(req,res)=>{
    try {
        const { name } = req.query
        if(name){
            let result = validateName(name)
            axios.get(`https://api.rawg.io/api/games/${result}?key=${API_KEY}&dates=2019-09-01,2019-09-30&platforms=18,1,7`)
            .then(({data})=>{
                if (data) {
                    const {name,background_image,description,released,rating} = data
                    async function find(info) {
                        let game = await addOrFind(info);
                        let valuesFound = await search(game)
                        res.status(200).json(valuesFound)
                    }
                    find({name,background_image,description,released,rating})
                }
            }).catch((error)=> res.status(200).json({ message: "not found:" + error}))
        } else {   
            async function games(info) {
                let games = await showGames();
                res.status(200).json(games)
            }
            games()
        }
    }catch (error) {
        console.log(error + "=====> not found");
    }
})

//data.results.map((v)=> {
// })
    // n.name
    // v.background_image,
    // v.description, //no tiene en el global
    // v.released,
    // v.rating
//parentPlatforms:: array de objetos
    // v.parent_platforms 
//platforms:: array de objetos
    // v.platforms
//genres:: arrya de objetos
    // v.genres


router.get('/:idVideogame', (req,res)=>{
    const {idVideogame}  = req.params
    try {
        if(idVideogame){
            axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}&dates=2019-09-01,2019-09-30&platforms=18,1,7`)
            .then(({data})=>{
                if (data) {
                    const {name,background_image,description,released,rating} = data
                    async function game(info) {
                        let game = await addOrFind(info);
                        res.status(200).json(game.dataValues)
                    }
                    game({name,background_image,description,released,rating})
                }
            })
        }else {
            res.status(200).json({message:"nesecitas pasarle un id por param"})
        }
        
    } catch (error) {
        console.log("----->",error);
    }
    
})

router.post('/', async(req,res)=>{
    const {name,image,description,releaseDate,rating} = req.body

    // if( name && image && description && releaseDate && rating ){
    //     let date = validateDate(releaseDate)
    //     let rate = validateRate(rating)
    //     let newGame = await Videogame.create({
    //         name,
    //         image,
    //         description,
    //         date,
    //         rate
    //     })
    //     res.status(200).json(newGame)
    // }else{
    //     res.status(200).json({message:`necesitas pasar todos los datos requeridos`, datos:"name,image,description,releaseDate,rating"})
    // }  
})


module.exports = router;
