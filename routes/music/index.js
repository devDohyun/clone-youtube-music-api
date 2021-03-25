const express = require('express')
const router = express.Router()

const modelMusic = require(__base + 'models/music')


router.get('/:id?', async (req, res) => {
    const page = req.query.page
    const id = req.query.id
    
    const params = {
        page,
        id
    }
    const result = await modelMusic.getMusic(params)
    if (result.error) return res.send({ status: result.error })

    
    return res.send(result)
})


module.exports = router