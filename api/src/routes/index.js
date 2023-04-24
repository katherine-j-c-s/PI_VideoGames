const express = require('express');
const router = express.Router()
// Importar todos los routers;

const videogames = require('./videogames');
const genders = require('./genders');
// Ejemplo: const authRouter = require('./auth.js');

router.use('/videogames',videogames)
router.use('/genres',genders)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
