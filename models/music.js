const connection = require(__base + 'modules/database/connection')


const getMusic = async (params) => {
    const con = await connection.getConnection()
    if (con.error) return { error: 'db.error.connection' }

    const _per_page = params._per_page || process.env.per_page || 15
    const _page = params.page || 1
    const _id = params.id
    const _order_by = params.order_by
    const _sort_by = params.sort_by || 'ASC'
    
    
    let queryWhere = ''
    let queryOrder = ' m.created_at DESC '


    if (_id) queryWhere += ` AND m.id = ${_id} `
    if (_order_by) queryOrder += ` ${_order_by} ${_sort_by} `

    
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

const get24HoursPopularityMusic = async (params) => {
    const con = await connection.getConnection()
    if (con.error) return { error: 'db.error.connection' }

    const _per_page = params._per_page || process.env.per_page || 15
    const _page = params.page || 1
    
    
    const query = `
        SELECT
            m.*,
            COUNT(ml.id) AS like_count
        FROM
            music AS m
            JOIN music_like AS ml
                ON ml.music_id = m.id
        WHERE
            m.is_deleted = 0
        GROUP BY m.id
        ORDER BY like_count DESC
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
    getMusic,
    get24HoursPopularityMusic
}