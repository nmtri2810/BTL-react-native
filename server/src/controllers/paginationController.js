import pool from "../configs/connectDB.js";

export const pagination = async (page, limit, table, sortValue, status) => {
    const offset = (page - 1) * limit;

    let [data] = await pool.execute(`SELECT * FROM ${table} ORDER BY id ${sortValue} LIMIT ${limit} OFFSET ${offset}`);

    let [totalPageData] = await pool.execute(`SELECT count(*) AS count FROM ${table}`);

    // for reservation
    if (status) {
        [data] = await pool.execute(`SELECT * FROM ${table} WHERE status_id = "${status}" ORDER BY id ${sortValue} LIMIT ${limit} OFFSET ${offset}`);

        [totalPageData] = await pool.execute(`SELECT count(*) AS count FROM ${table} WHERE status_id = "${status}"`);
    }

    const totalPages = Math.ceil(totalPageData[0]?.count / limit);

    return { data, pagination: { page, limit, totalPages } };
};
