const { poolPromise, sql } = require('../database/db');
const bcrypt = require('bcrypt');
const { emailRegex } = require('../util/constants');

async function createUser(data) {
    try {
        const { first_name, last_name, email, password, confirm_password } = data;
        const pool = await poolPromise;

        if (!emailRegex.test(data?.email)) {
            throw new Error("Invalid email format");
        };

        if (first_name?.length < 3 || last_name?.length < 3 || password?.length < 5 || confirm_password?.length < 5) {
            throw new Error('Invalid data length in create user!');
        };

        if (password !== confirm_password) {
            throw new Error('Paswords dont match!');
        };

        const hashedPassword = await bcrypt.hash(data?.password?.trim(), 10);

        const query = `INSERT INTO users (first_name, last_name, email,password) VALUES (@first_name, @last_name, @email, @password)`;

        const newUser = await pool.request()
            .input("first_name", sql.NVarChar, data?.first_name?.trim())
            .input('last_name', sql.NVarChar, data?.last_name?.trim())
            .input("email", sql.NVarChar, data?.email?.trim())
            .input("password", sql.NVarChar, hashedPassword)
            .query(query);

        console.log("User inserted successfully");
    } catch (err) {
        throw err;
    };
};

async function login(data) {
    try {
        const { email, password } = data;

        if (!email || !password) {
            throw new Error('Invalid email or password in login!');
        };

        const pool = await poolPromise;

        const result = await pool.request()
            .input('email', sql.NVarChar, email)
            .query('SELECT * FROM users WHERE email = @email');

        if (!result) {
            throw new Error('Invalid user in login!');
        };

        const user = result?.recordset[0];
        const pass = user?.password;

        if (!await bcrypt.compare(password, pass)) {
            throw new Error('Passwords do not match!');
        };

        const sessionData = { id: user.user_id, email: user.email, name: user.first_name };
        return sessionData;
    } catch (err) {
        throw err;
    };
};

module.exports = {
    createUser,
    login,
};