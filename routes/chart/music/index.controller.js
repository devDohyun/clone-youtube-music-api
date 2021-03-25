const modelMusic = require(__base + 'models/music')


const getMusicChart = async (req, res) => {
    const page = req.query.page
    const params = {
        page
    }
    
    
    const result = await modelMusic.get24HoursPopularityMusic(params)
    if (result.error) return res.send({ status: result.error })

    
    return res.send(result)
}


module.exports = {
    getMusicChart
}