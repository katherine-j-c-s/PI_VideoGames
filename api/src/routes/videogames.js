const express = require('express');
const router = express.Router() 
const axios = require('axios')  
const { 
    validateName,
    validateDate,  
    validateRate,  
    AddOrFindByID,
    cleanArray,
    save
} = require('../controlers/Videogame')
const {Videogame,ParentPlatform,Genre,Sequelize} = require('../db')

require('dotenv').config()

const API_KEY = process.env.MY_API_KEY

router.get('/', async(req,res)=>{
    try {
        const { search } = req.query
        if(search){
            const dbVideogames = await Videogame.findAll();
            
            let findGameDB = dbVideogames.map(v=> { 
                let game = v.name.slice(0,search.length)
                if (game === search) {
                    return v
                }
            })
            axios.get(`https://api.rawg.io/api/games?search=${search}&key=${API_KEY}`)
            .then(({data})=>{
                if (data) {
                    let games = data.results.map((v)=>{
                        let videojuego = {
                            id: v.id,
                            name: v.name,
                            image: v.background_image,
                            description: v.description,
                            releaseDate: v.released,
                            rating: v.rating, 
                            genres: v.genres,
                            platforms: v.parent_platforms
                        }
                        return videojuego
                    })
                    if (findGameDB[0] !== undefined) {
                        res.status(200).json([...findGameDB,...games])
                    }else{
                        res.status(200).json(games)
                    }
                }
            }).catch((error)=> res.status(200).json({ message: "not found:" + error}))
        } else {
            const getallvideogames = async () => {
                const URL = "https://api.rawg.io/api/games";
                const dbVideogamesRaw = await Videogame.findAll({
                  include: {
                    model: Genre,
                    attributes: ["name"],
                    through: {
                      attributes: [],
                    },
                  },
                });
                const apiVideogames = [];
                for (let i = 1; i < 6; i++) {
                  const response = await axios.get(`${URL}?key=${API_KEY}&page=${i}`);
                  const apiVideogamesRaw = response.data.results;
                  apiVideogames.push(...apiVideogamesRaw);
                }
                const cleanApiVideogames = cleanArray(apiVideogames);
                res.status(200).json([...cleanApiVideogames,...dbVideogamesRaw])
            };
            getallvideogames()
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
                        description: data.description_raw,
                        releaseDate: validateDate(data.released),
                        rating: validateRate(data.rating),
                        genres: data.genres,
                        platforms: data.parent_platforms,
                    }
                    let moreDetails ={
                        image2: data.background_image_additional,
                        website:data.website,
                        publishers: data.publishers,
                        developers: data.developers,
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
                        let details = {...game.dataValues, ...moreDetails}
                        console.log(details);
                        res.status(200).json(details)
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
        genres:genres,
        platforms:platforms
    }
    await AddOrFindByID(videojuego)
    let game = await Videogame.findOne({
        where:{name:videojuego.name},
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

