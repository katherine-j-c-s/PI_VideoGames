const express = require('express');
const router = express.Router()
const axios = require('axios');
const {Genre} = require('../db')
const {addAllGenres} = require('../controlers/Genre')
require('dotenv').config()

const API_KEY = process.env.MY_API_KEY

router.get('/', (req,res)=>{
    try {
        axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}&dates=2019-09-01,2019-09-30&platforms=18,1,7`)
        .then(({data})=>{
            if (data) {
                let added = addAllGenres(data.results)
                // res.status(200).json(added)
                // async function showGenres() {
                //     let allGenres = await Genre.findAll()
                //     res.status(200).json(allGenres)
                // }
                // showGenres()
            }
        })
    } catch (error) {
        console.log("----->",error);
    }
})

router.get('/:id', (req,res)=>{
    const idsGenres = [4, 51,  3,  5, 10,  2, 40, 14,  7, 11, 83,  1, 59, 15, 6, 19, 28, 34, 17]
    const {id} = req.params
    try {
        if(id){
            let incluye = idsGenres.find((i) => i == id)
            if (incluye) {
                axios.get(`https://api.rawg.io/api/genres/${id}?key=${API_KEY}&dates=2019-09-01,2019-09-30&platforms=18,1,7`)
                .then(({data})=>{
                    if (data) {
                        res.status(200).json(data)
                    }
                })
            }else {
                res.status(200).json({message:"that id genres does not exist... try with", idsGenres:idsGenres})
            }
        }
        
    } catch (error) {
        console.log("----->",error);
    }
})



module.exports = router;