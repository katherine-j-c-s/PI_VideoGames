const axios = require('axios')
const {Videogame,ParentPlatform,Genre,Sequelize} = require('../db')
const {Op} = require('sequelize')

require('dotenv').config()

const API_KEY = 2c943d87ab6a45c5939d6a582f7aed98

function validateDate(date){
    const result = date.split("-").join("")
    return Number(result)
}
function validateRate(rate){
    const result = rate.toString().split(".").join("")
    return Number(result)
}

async function getGamesOrSearchGames(req,res){
    try {
        const { search } = req.query
        if(search){///////////////////////////////////////////SEARCHGAME////////////////////////////////////////////////////
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
            }).catch((error)=> res.status(200).json("api/src/controlers/Videogames/getGamesOrSearchGames/search:" + error))
        } else {////////////////////////////////////////////GETALLGAMES///////////////////////////////////////////////////////
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
                  const response = await axios.get(`${URL}?key=${API_KEY}&page=${i}`).catch((error)=> res.status(200).json("api/src/controlers/Videogames/getGamesOrSearchGames/getAll:" + error));
                  const apiVideogamesRaw = response.data.results;
                  apiVideogames.push(...apiVideogamesRaw);
                }
                function cleanArray(array) {
                    let games = array.map((v)=>{
                        let videojuego = { 
                            id: v.id, 
                            name: v.name,
                            image: v.background_image,
                            releaseDate: v.released,
                            rating: v.rating,
                            genres: v.genres,
                            platforms: v.parent_platforms
                        }
                        return videojuego
                    })
                    return games
                }
                const cleanApiVideogames = cleanArray(apiVideogames);
                res.status(200).json([...cleanApiVideogames,...dbVideogamesRaw])
            };
            getallvideogames()
        }
    }catch (error) {
        console.log("api/src/controlers/Videogames/getGamesOrSearchGames:"+error);
    }
}
//////////////////////////////////////////////////////GETGAMESDETAIL/////////////////////////////////////////////////////////
async function getDetail(req,res){
    const {idVideogame}  = req.params
    try {
        let gameDB = await Videogame.findOne({where:{id:idVideogame}})
        if (gameDB) {
            res.status(200).json(gameDB)
        }
        if (!gameDB) {
            axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`)
            .then(({data})=>{
                if (data) {
                    let details = {
                        id: data.id,
                        name: data.name,
                        image: data.background_image,
                        description: data.description_raw,
                        releaseDate: data.released,
                        rating: data.rating,
                        genres: data.genres,
                        platforms: data.parent_platforms,
                        image2: data.background_image_additional,
                        website:data.website,
                        publishers: data.publishers,
                        developers: data.developers,
                    }
                    res.status(200).json(details)
                }
            })
        }
    } catch (error) { 
        console.log("api/src/controlers/Videogames/getDetail",error);
    }  
}
//////////////////////////////////////////////////////////////GETGAMESCREATED/////////////////////////////////////////////////
async function getGamesCreated(req,res){
    try {
        let gameDB = await Videogame.findAll()
        res.status(200).json(gameDB)
    } catch (error) { 
        console.log("api/src/controlers/Videogames/getDetail",error);
    }  
}

/////////////////////////////////////////////////////////////ADDGAMETODATABASE//////////////////////////////////////////////////////////
async function postGame(req,res){ 
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
    let game = await Videogame.create({  
            name: videojuego.name,
            id: videojuego.id,
            image: videojuego.image,
            description: videojuego.description,
            releaseDate: videojuego.releaseDate, 
            rating: videojuego.rating,
        }
    );
    let genresGame= videojuego.genres.map(g=> g.id)
    for (let e = 0; e < genresGame.length; e++) {
        await game.addGenre(genresGame[e])
    } 
    let platformsGame = videojuego.platforms.map(p => p.platform.name)
    for (let e = 0; e < platformsGame.length; e++) {
        let platformAdded = await ParentPlatform.findOne({where:{name:platformsGame[e]}})
        await game.addParentPlatform(platformAdded.dataValues.id)
    }
    let showGame = await Videogame.findOne({
        where:{name:videojuego.name}, 
        include: [
            {model: ParentPlatform},
            {model: Genre}
        ]
    })
    res.status(200).json(showGame)
}
module.exports = {
    postGame,
    getGamesOrSearchGames,
    getDetail,
    getGamesCreated
}
