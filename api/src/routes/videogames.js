const express = require('express');
const router = express.Router()
const axios = require('axios')
require('dotenv').config()

const API_KEY = process.env.MY_API_KEY

router.get('/', (req,res)=>{
    const { name } = req.query
    if(name){
        let nameFixed = name.toLowerCase().split(" ").join("-")
        let letras = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","ñ","o","p","q","r","s","t","u","v","w","x","y","z"]
        nameFixed = nameFixed.split("").map(e => {
            for (let l = 0; l < letras.length; l++) {
                if (letras[l] === e || e === "-") {
                    return e
                }
            }
        });
        const result = nameFixed.join("")
        console.log(result);
        // nameFixed
        try {
            axios.get(`https://api.rawg.io/api/games/${result}?key=${API_KEY}&dates=2019-09-01,2019-09-30&platforms=18,1,7`)
            .then(({data})=>{
                if (data) {
                    res.status(200).json(data)
                }
            })
        } catch (error) {
            console.log("----->",error);
        }
    }else {
        try {
            axios(`https://api.rawg.io/api/games?key=${API_KEY}&dates=2019-09-01,2019-09-30&platforms=18,1,7`)
            .then(({data})=>{
                if (data) {
                    res.status(200).json(data.results)
                }
            })
        } catch (error) {
            console.log("----->",error);
        }
    }
})

router.get('/:idVideogame', (req,res)=>{
    const {idVideogame}  = req.params
    try {
        if(idVideogame){
            axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}&dates=2019-09-01,2019-09-30&platforms=18,1,7`)
            .then(({data})=>{
                if (data) {
                    res.status(200).json(data)
                }
            })
        }else {
           res.status(200).json({message:"nesecitas pasarle un id por param"})
        }
        
    } catch (error) {
        console.log("----->",error);
    }
    
})

router.post('/', (req,res)=>{
    const newGame = req.body
    //recordar desconprimirlo
    if(newGame){
        res.status(200).json({message:`esta ruta debe crear un nuego juego en la base de datos y agregandole el genero indicado con la info que pasen por body: ${newGame} `})
    }else{
        res.status(200).json({message:`necesitas pasarle info por el body para poder crear el juego`})
    }  
})


module.exports = router;
