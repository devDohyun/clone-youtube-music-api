const express = require('express')
const router = express.Router()

const routerMusic = require('./music')


router.use('/music', routerMusic)


module.exports = router