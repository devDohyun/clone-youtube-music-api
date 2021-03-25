const connection = require(__base + 'modules/database/connection')


const getMusic = async (params) => {
    const con = await connection.getConnection()
    if (con.error) return { error: 'db.error.connection' }

    const _per_page = params._per_page || process.env.per_page || 15
    const _page = params.page || 1
    const _id = params.id
    
    
    let queryWhere = ''


    if (_id) queryWhere += ` AND m.id = ${_id} `

    
    const query = `
        SELECT
            m.*
        FROM
            music AS m
        WHERE
            m.is_deleted = 0
            ${queryWhere}
        LIMIT ${_per_page}
        OFFSET ${(_page - 1) * _per_page}
    `


    let result
    [result] = await con.query(query)


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