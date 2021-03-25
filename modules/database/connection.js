const pool = require('./pool')


const getConnection = async () => {
    let connection
    try {
        connection = await pool.getConnection(ob => ob)
    } catch (error) {
        return { error }
    }

    
    return connection
}


module.exports = {
    getConnection
}