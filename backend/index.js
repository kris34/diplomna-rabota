const express = require("express");
const { poolPromise, config } = require("./src/database/db");
const userController = require('./src/controllers/Authentication/userController');
const session = require('express-session');
const MSSQLStore = require('connect-mssql')(session);
const cors = require('cors');

const port = 3003;

start()
async function start() {
    try {
        const app = express();
        app.set('trust proxy', true);
        app.use(express.json());

        app.use(cors({
            origin: 'http://localhost:5173',
            credentials: true,
        }));

        const store = new MSSQLStore(config);

        app.use(session({
            secret: 'secret_sessions_key',
            resave: false,
            saveUninitialized: false,
            store: store,
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
