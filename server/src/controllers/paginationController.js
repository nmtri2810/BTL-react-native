import pool from "../configs/connectDB.js";

export const pagination = async (page, limit, table, sortValue) => {
    const offset = (page - 1) * limit;

    const [data] = await pool.execute(
        `SELECT * FROM ${table} ORDER BY id ${sortValue} LIMIT ${limit} OFFSET ${offset}`
    );

    const [totalPageData] = await pool.execute(
        `SELECT count(*) AS count FROM ${table}`
    );

    const totalPages = Math.ceil(totalPageData[0]?.count / limit);

    return { data, pagination: { page, limit, totalPages } };
};
