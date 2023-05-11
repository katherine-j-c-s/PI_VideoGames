const express = require('express');
const router = express.Router() 
const { getDetail, getGamesOrSearchGames, postGame,getGamesCreated } = require('../controlers/Videogame')

router.get('/', getGamesOrSearchGames)
router.get('/gamesCreated', getGamesCreated)
router.get('/:idVideogame', getDetail)
router.post('/',postGame)

module.exports = router;

