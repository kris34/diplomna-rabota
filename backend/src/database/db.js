const sql = require("mssql");

const config = {
    user: "sa",
    password: "12345",
    server: "localhost",
    port: 1433,
    database: "21180008",
    pool: {
        max: 10, // Maximum number of connections
        min: 1,  // Keep at least 1 connection alive
        idleTimeoutMillis: 30000, // 30 seconds idle timeout
        acquireTimeoutMillis: 30000, // Timeout for acquiring a connection
    },
    options: {
        encrypt: false, // No encryption for local dev
        trustServerCertificate: true // Trust self-signed certs
    }
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log("✅ Connected to SQL Server");

        // Handle disconnections
        pool.on("error", err => {
            console.error("❌ Database connection error:", err);
            pool.close();
        });

        return pool;
    })
    .catch(err => {
        console.error("❌ Database connection failed:", err);
        process.exit(1);
    });


module.exports = { sql, poolPromise, config };