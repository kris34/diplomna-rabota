const express = require("express");
const { poolPromise, dbConfig } = require("./src/database/db");
const userController = require('./src/controllers/Authentication/userController');
const session = require('express-session');
const MSSQLStore = require('connect-mssql-v2');

const port = 3003;

start()
async function start() {
    try {
        const app = express();
        app.set('trust proxy', true);
        app.use(express.json());

        const sessionStore = new MSSQLStore(dbConfig, {
            table: 'sessions',
            ttl: 86400,
            autoRemove: true
        });

        app.use(session({
            secret: 'secret_sessions_key',
            resave: false,
            saveUninitialized: false,
            store: sessionStore,
            name: 'auth',
            cookie: {
                httpOnly: true,
                secure: false,
                maxAge: 1000 * 60 * 60 * 24,  // 1 day
            }
        }));

        console.log("✅ Database connected, starting server...");

        app.use(userController);

        app.listen(port, () => {
            console.log(`🚀 App listening on port ${port}`);
        });
    } catch (err) {
        console.error("❌ Error starting the app:", err);
    }
}