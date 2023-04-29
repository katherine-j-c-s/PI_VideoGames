const axios = require('axios')
const {Videogame,ParentPlatform,Genre} = require('../db')
const {Op} = require('sequelize')

require('dotenv').config()

const API_KEY = process.env.MY_API_KEY

function validateName(name){
    let nameFixed = name.toLowerCase().split(" ").join("-")
    let letras = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","ñ","o","p","q","r","s","t","u","v","w","x","y","z","1","2","3","4","5","6","7","8","9","0"]
    nameFixed = nameFixed.split("").map(e => {
        for (let l = 0; l < letras.length; l++) {
            if (letras[l] === e || e === "-") {
                return e
            }
        }
    });
    const result = nameFixed.join("")
    return result
}
function validateDate(date){
    const result = date.split("-").join("")
    return Number(result)
}
function validateRate(rate){
    const result = rate.toString().split(".").join("")
    return Number(result)
}
function save(arr){
    arr.map(v=>{
        let platforms = v.platforms.map(p => p.platform.name)
        let genres= v.genres.map(g=> g.id)
        let game ={
            name: v.name,
            image: v.image,
            description: v.description,
            releaseDate: v.releaseDate,
            rating: v.rating,
        }
        createGame(game,genres,platforms)
    })
}
let plataformas = []
async function createGame(gameInf,genresid,platformsInf) {
    let game = await Videogame.create(gameInf)
    for (let e = 0; e < platformsInf.length; e++) {
        let add = plataformas.find( name => name === platformsInf[e])
        if (!add) {
            plataformas.push(platformsInf[e])
            await ParentPlatform.create({name:platformsInf[e]})
        }
        let platform = await ParentPlatform.findOne({
            where:{
                name: platformsInf[e]
            }
        })
        await game.addParentPlatform(platform.dataValues.id)
    }
    await game.addGenre(genresid) 
}

async function addOrFind(obj) {
    const {name,background_image,description,released,rating} = obj
    let date = validateDate(released)
    let rate = validateRate(rating)

   const [ game, created ] = await Videogame.findOrCreate({
        where: { name },
        defaults: {
            image: background_image,
            description: description,
            releaseDate: date,
            rating: rate
        }
    })
    return game
}

module.exports = {
    validateName,
    validateRate,
    validateDate,
    addOrFind,
    save,
}

//USE ESTAS FUNCIONES PARA :
//GUARDAR TODOS LOS JUEGOS, LAS PLATAFORMAS Y RELACIONAR LOS GENEROS A LA DB(no se necesitan mas)/////////////////////////



//////// AGREGE EN EL SERVIDOR ESTOS COMANDOS PARA QUE ME PASARA EL ARRAY CON TODA LA INFO NECESITADA//////////////

// axios.get(`https://api.rawg.io/api/games?key=f8ed5decf7b547b193d7895b9c21716c`)
// .then(({data})=>{
//     if (data) {
//         let games = data.results.map((v, i)=>{
//             let videojuego = {
//                 id: i,
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


//////////////////////////////////////////////////////////////////////////////////////////////////////////
