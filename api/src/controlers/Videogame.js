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
function cleanArray(array) {
    let games = array.map((v)=>{
        let videojuego = { 
            id: v.id, 
            name: v.name,
            image: v.background_image,
            releaseDate: validateDate(v.released),
            rating: validateRate(v.rating),
            genres: v.genres,
            platforms: v.parent_platforms
        }
        return videojuego
    })
    return games
}
async function AddOrFindByID(videojuego) {
    let [game,created] = await Videogame.findOrCreate({
        where:{
            name: videojuego.name
        },defaults: {
            id: videojuego.id,
            image: videojuego.image,
            description: videojuego.description,
            releaseDate: videojuego.releaseDate, 
            rating: videojuego.rating,
        }
    });
    
    if (created) {
        let genres= videojuego.genres.map(g=> g.id)
        console.log(genres);
        for (let e = 0; e < genres.length; e++) {
            await game.addGenre(genres)
        }
        let platforms = videojuego.platforms.map(p => p.platform.name)
        console.log(platforms);
        for (let e = 0; e < platforms.length; e++) {
            let [platformAdded,created] = await ParentPlatform.findOrCreate({where:{name:platforms[e]}})
            await game.addParentPlatform(platformAdded.dataValues.id)
        }
    }
    const addDescription = await Videogame.update({
        description: videojuego.description
    },{
        where:{
            id: videojuego.id
        }
    })
}
function save(arr){
    arr.map(v=>{
        let platforms = v.platforms.map(p => p.platform.name)
        let genres= v.genres.map(g=> g.id)
        let game ={
            id: v.id,
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

module.exports = {
    validateName,
    validateRate,
    validateDate,
    AddOrFindByID,
    cleanArray,
    save,
}

//USE ESTAS FUNCIONES PARA :
//GUARDAR TODOS LOS JUEGOS, LAS PLATAFORMAS Y RELACIONAR LOS GENEROS A LA DB(no se necesitan mas)/////////////////////////



//////// AGREGE EN EL SERVIDOR ESTOS COMANDOS PARA QUE ME PASARA EL ARRAY CON TODA LA INFO NECESITADA//////////////




//////////////////////////////////////////////////////////////////////////////////////////////////////////
