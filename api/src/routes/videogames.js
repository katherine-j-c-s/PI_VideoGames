const express = require('express');
const router = express.Router()
const axios = require('axios')
const { 
    validateName,
    validateDate, 
    validateRate, 
    AddOrFindByID,
    save
} = require('../controlers/Videogame')
const {Videogame,ParentPlatform,Genre,Sequelize} = require('../db')

require('dotenv').config()

const API_KEY = process.env.MY_API_KEY

router.get('/', async(req,res)=>{
    try {
        const { search } = req.query
        if(search){
            axios.get(`https://api.rawg.io/api/games?search=${search}&key=${API_KEY}`)
            .then(({data})=>{
                if (data) {
                    let games = data.results.map((v)=>{
                        let videojuego = {
                            id: v.id,
                            name: v.name,
                            image: v.background_image,
                            description: v.description,
                            releaseDate: validateDate(v.released),
                            rating: validateRate(v.rating),
                            genres: v.genres,
                            platforms: v.parent_platforms
                        }
                        return videojuego
                    })
                    res.status(200).json(games)
                }
            }).catch((error)=> res.status(200).json({ message: "not found:" + error}))
        } else {
            // axios.get(`https://api.rawg.io/api/games?key=f8ed5decf7b547b193d7895b9c21716c`)
            // .then(({data})=>{
            //     if (data) {
            //         let games = data.results.map((v)=>{
            //             let videojuego = {
            //                 id: v.id,
            //                 name: v.name,
            //                 image: v.background_image,
            //                 description: v.description,
            //                 releaseDate: validateDate(v.released),
            //                 rating: validateRate(v.rating),
            //                 genres: v.genres,
            //                 platforms: v.parent_platforms
            //             }
            //             return videojuego
            //         })
            //         save(games)
            //     }
            // }).catch((error)=> console.log("not found: ", error))
            const data = await Videogame.findAll({
                include: [{model: ParentPlatform},{model: Genre}]
            })
            let allGames = data.map(v=>v.dataValues)
            res.status(200).json(allGames)
        }
    }catch (error) {
        console.log(error + "=====> not found");
    }
})

router.get('/:idVideogame', (req,res)=>{
    const {idVideogame}  = req.params
    try {
        if(idVideogame){
            axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}&dates=2019-09-01,2019-09-30&platforms=18,1,7`)
            .then(({data})=>{
                if (data) {
                    let videojuego = {
                        id: data.id,
                        name: data.name,
                        image: data.background_image,
                        description: data.description,
                        releaseDate: validateDate(data.released),
                        rating: validateRate(data.rating),
                        genres: data.genres,
                        platforms: data.parent_platforms
                    }
                    
                    async function showDetails(id) {
                        await AddOrFindByID(videojuego)
                        let game = await Videogame.findOne({
                            where:{id},
                            include: [
                                {model: Genre},
                                {model: ParentPlatform}
                            ]
                        })
                        res.status(200).json(game)
                    }
                    showDetails(videojuego.id)
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
    const {name,image,description,releaseDate,rating,genres,platforms} = req.body
    let max = await Videogame.findAll({
        attributes: [Sequelize.fn('max',Sequelize.col('id'))],
        raw: true,
    })
    let videojuego = {
        id: ++max[0].max,
        name,
        image,
        description,
        releaseDate: validateDate(releaseDate),
        rating: validateRate(rating),
        genres,
        platforms
    }
    await AddOrFindByID(videojuego)
    let game = await Videogame.findOne({
        where:{id:videojuego.id},
        include: [
            {model: Genre},
            {model: ParentPlatform}
        ]
    })
    res.status(200).json(game)
})

module.exports = router;
//data.results.map((v)=> {
// })
    // n.name
    // v.background_image,
    // v.description, //no tiene en el global
    // v.released,
    // v.rating
//parentPlatforms:: array de objetos
    // v.parent_platforms 
//genres:: arrya de objetos
    // v.genres

