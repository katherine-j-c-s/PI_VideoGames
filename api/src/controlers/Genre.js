const {Genre} = require('../db')

module.exports = {}
//////////////FUNCIONES CON LAS CUALES CREE LA DB DE GENRES
// function addAllGenres(genres) {
//     let allGenres = genres.map((g)=>{
//         let genre = {
//             id: g.id,
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
////////AGREGE EN EL SERVIDOR ESTOS COMANDOS PARA QUE ME PASARA EL ARRAY CON TODA LA INFO NECESITADA//////////////

// axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}&dates=2019-09-01,2019-09-30&platforms=18,1,7`)
// .then(({data})=>{
//     if (data) {
//         let added = addAllGenres(data.results)
//     }
// })
