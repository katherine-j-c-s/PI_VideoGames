const express = require('express');
const router = express.Router()

const {getGenres,getGenreDescription} = require('../controlers/Genre')

router.get('/',getGenres)

router.get('/:id',getGenreDescription)



module.exports = router;