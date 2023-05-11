const express = require('express');
const router = express.Router()

const getPlatforms = require('../controlers/Platforms')

router.get('/', getPlatforms) 

module.exports = router; 