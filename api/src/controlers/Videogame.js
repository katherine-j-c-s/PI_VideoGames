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
async function search(data) {
    let game = data.dataValues
    let letram = game.name[0].toLowerCase()
    let letraM = game.name[0].toUpperCase()

    const gamesm = await Videogame.findAll({
            where: {
                name : {
                    [Op.like]: `${letram}%`
                }
            }
        })
        const gamesM = await Videogame.findAll({
            where: {
                name : {
                    [Op.like]: `${letraM}%`
                }
            }
        })
    let allValues = [...gamesm, ...gamesM]
    return allValues
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

async function showGames() {
    const games = await Videogame.findAll()
    let allValues = games.map(v=> v.dataValues)
    let names = allValues.map(v=>v.name)
    console.log(names);
    return allValues
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
        await game.addPlatform(platform.dataValues.id)
    }
    await game.addGenre(genresid) 
}
module.exports = {
    validateName,
    validateRate,
    validateDate,
    addOrFind,
    showGames,
    search,
    save,
}

//////USE ESTAS FUNCIONES PARA GUARDAR TODOS LOS JUEGOS A LA DB(no se necesitan mas)/////////////////////////////////////



//////// AGREGANDO EN EL SERVIDOR ESTOS COMENDOS PARA QUE ME PASARA TODOS LOS NOMBRES

// axios(`https://api.rawg.io/api/games?key=${API_KEY}&dates=2019-09-01,2019-09-30&platforms=18,1,7`)
// .then(({data})=>{
//     if (data) {
//         // let allGames = data.results.map(v=> v.name )
//         // let gamesWorking = allGames.filter(v=> v !== "The Legend of Zelda: Link's Awakening (2019)")
//         // saveAllGames(gamesWorking) 
//     }
// })


//////////////////////////////////////////////////////////////////////////////////////////////////////////
