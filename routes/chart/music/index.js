const express = require('express')
const router = express.Router({ mergeParams: true })

const controllerMusic = require('./index.controller')

const apicache = require('apicache')
const middlewareCache = apicache.middleware


router.use(middlewareCache('2 hours'))
router.get('/', controllerMusic.getMusicChart)


module.exports = router