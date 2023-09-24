import pool from "../configs/connectDB.js";

export const pagination = async (page, limit, table) => {
    const offset = (page - 1) * limit;

    const [data] = await pool.execute(
        `SELECT * FROM ${table} LIMIT ${limit} OFFSET ${offset}`
    );

    const [totalPageData] = await pool.execute(
        `SELECT count(*) AS count FROM ${table}`
    );

    const totalPages = Math.ceil(totalPageData[0]?.count / limit);

    return { data, pagination: { page, limit, totalPages } };
};
