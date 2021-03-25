const express = require('express')
const router = express.Router()

const modelMusic = require(__base + 'models/music')


router.get('/', async (req, res) => {
    const result = await modelMusic.getMusic()
    
    
    return res.send(result)
})


module.exports = router