const connection = require(__base + 'modules/database/connection')


const getMusic = async () => {
    const con = await connection.getConnection()
    if (con.error) return con

    
    let result
    try {
        [result] = await con.query(`SELECT m.* FROM music AS m WHERE m.is_deleted = 0`)
    } catch (error) {
        console.log('test')
    }


    con.release()


    const response = {
        items: result,
        length: result.length
    }
    
    
    return response
}


module.exports = {
    getMusic
}