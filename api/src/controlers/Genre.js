const {Genre} = require('../db')

function addAllGenres(genres) {
    let allGenres = genres.map((g)=>{
        let genre = {
            id: g.id,
            name: g.name,
            image: g.image_background, 
            games_count: g.games_count
        }
        addGenre(genre)
    })
}
async function addGenre(obj) {
    let genre = await Genre.create(obj)
    return genre.dataValues
}
module.exports = {addAllGenres}
//////////////FUNCIONES CON LAS CUALES CREE LA DB DE GENRES


////////AGREGE EN EL SERVIDOR ESTOS COMANDOS PARA QUE ME PASARA EL ARRAY CON TODA LA INFO NECESITADA//////////////


