const express = require('express');
const router = express.Router()
const axios = require('axios');
const {addAllGenres} = require('../controlers/Genre')
const {Genre} = require('../db')
require('dotenv').config()

const API_KEY = process.env.MY_API_KEY 

router.get('/', async(req,res)=>{
    try {
        // axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}&dates=2019-09-01,2019-09-30&platforms=18,1,7`)
        // .then(({data})=>{
        //     if (data) {
        //         let added = addAllGenres(data.results) 
        //     }
        // })
        const data = await Genre.findAll()
        let genres = data.map(g=> g.dataValues)
        res.status(200).json(genres)
    } catch (error) {
        console.log("----->",error);
    }
})

router.get('/:id', async(req,res)=>{
    const idsGenres = [4, 51,  3,  5, 10,  2, 40, 14,  7, 11, 83,  1, 59, 15, 6, 19, 28, 34, 17]
    const {id} = req.params
    try {
        if(id){
            let incluye = idsGenres.find(n=> n === Number(id))

            if (incluye) {
                let detailsGenre = await axios.get(`https://api.rawg.io/api/genres/${id}?key=f8ed5decf7b547b193d7895b9c21716c`)
                res.status(200).json(detailsGenre.data)
            }
            
            else {
                res.status(200).json({message:"that id genres does not exist... try with", idsGenres:idsGenres})
            }
        }
        
    } catch (error) {
        console.log("----->",error);
    }
})



module.exports = router;