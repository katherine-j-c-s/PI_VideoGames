const express = require('express');
const router = express.Router()

const {ParentPlatform} = require('../db')


router.get('/', async(req,res)=>{
    try {
        const data = await ParentPlatform.findAll()
        res.status(200).json(data)
    } catch (error) {
        console.log("----->",error);
    }
})

module.exports = router;