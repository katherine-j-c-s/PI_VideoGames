const {Genre} = require('../db')

module.exports = {
}
//////////////FUNCIONES CON LAS CUALES CREE LA DB DE GENRES
// function addAllGenres(genres) {
//     let allGenres = genres.map((g)=>{
//         let genre = {
//             name: g.name,
//             image: g.image_background,
//             games_count: g.games_count
//         }
//         addGenre(genre)
//     })
// }
// async function addGenre(obj) {
//     let genre = await Genre.create(obj)
//     return genre.dataValues
// }
//////////////////////////////////////////////////