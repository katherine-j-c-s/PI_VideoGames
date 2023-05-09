const express = require('express');
const router = express.Router()
// Importar todos los routers;

const videogames = require('./videogames');
const genders = require('./genders');
const platforms = require('./platforms')
// Ejemplo: const authRouter = require('./auth.js');

router.use('/videogames',videogames)
router.use('/platforms',platforms)
router.use('/genres',genders)

router.get('/',(req,res)=>{
    res.status(200).json({
        message:"the Routes are",
        routes:[
            {
                videogames:'/videogames',
                get:[
                    { 
                        conParams:{
                            idVideogame:"trae o crea el videojuego que el id que le des"
                        }
                    },
                    {
                        conQuery:{
                            search:"trae quince videojuego que tengan relacion con el nombre que busques"
                        }
                    },
                    {
                        sinQueryNiParams: "trae todos los videojuegos de la base de datos"
                    }
                ],
                post: {
                    porBody: {
                        info:'name,image,description,releaseDate,rating,genres,platforms'
                    },
                    creaUnNuevoGame: true
                }
        },{
            genres:'/genres',
            get: [
                {
                    conParams:{
                        id:"trae el genero que tenga ese id"
                    }
                },
                {
                    sinQueryNiParams: "trae todos los generos de la base de datos"
                }
            ]
        },{
            genres:'/platforms',
            get: {
                    sinQueryNiParams: "trae todas las plataformas de la base de datos"
                }
        }
    ]})
})

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
