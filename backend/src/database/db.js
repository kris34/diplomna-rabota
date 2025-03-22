const sql = require("mssql");

const dbConfig = {
    user: "sa",
    password: "12345",
    server: "localhost",
    port: 1433,
    database: "21180008",
    options: {
        encrypt: false,
        trustServerCertificate: true,
    },
};

const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then(pool => {
        console.log("Connected to SQL Server");
        return pool;
    })
    .catch(err => {
        console.error("Database connection failed:", err);
        process.exit(1);
    });

module.exports = { sql, poolPromise, dbConfig };
