const { poolPromise, sql } = require('../database/db');
const bcrypt = require('bcrypt');
const { emailRegex } = require('../util/constants');


async function createUser(data) {
    try {
        const { first_name, last_name, email, password, confirm_password } = data;

        validateUserInput(first_name, last_name, email, password, confirm_password);

        const pool = await poolPromise;
        const transaction = new sql.Transaction(pool);


        await transaction.begin();

        const emailCheckQuery = `SELECT COUNT(*) as count FROM users WHERE email = @email`;

        const emailCheckResult = await transaction.request()
            .input('email', sql.NVarChar, email.trim().toLowerCase())
            .query(emailCheckQuery);

        if (emailCheckResult.recordset[0].count > 0) {
            throw new Error('Email already registered');
        };

        const hashedPassword = await bcrypt.hash(password.trim(), 10);

        const query = `
        INSERT INTO users (first_name, last_name, email, password)
        OUTPUT inserted.user_id
        VALUES (@first_name, @last_name, @email, @password)`;

        const request = transaction.request()
            .input('first_name', sql.NVarChar, first_name.trim())
            .input('last_name', sql.NVarChar, last_name.trim())
            .input('email', sql.NVarChar, email.trim().toLowerCase())
            .input('password', sql.NVarChar, hashedPassword);

        const result = await request.query(query);
        await transaction.commit();
        const userId = result.recordset && result.recordset[0] ? result.recordset[0].user_id : null;

        if (!userId) {
            throw new Error('Failed to retrieve user ID after insertion');
        }

        return {
            success: true,
            message: 'User created successfully',
            userId
        };
    } catch (err) {
        throw new Error(`User Creation Failed: ${err.message}`);
    }
}

async function login(data) {
    try {
        const { email = '', password = '' } = data || {};

        const pool = await poolPromise;

        const result = await pool.request()
            .input('email', sql.NVarChar, email.trim().toLowerCase())
            .query('SELECT user_id, email, first_name, password FROM users WHERE email = @email');

        if (!result.recordset || result.recordset.length === 0) {
            throw new Error('Invalid email or password');
        }

        const user = result?.recordset[0];
        const storedPassword = user.password;

        if (!(await bcrypt.compare(password.trim(), storedPassword))) {
            throw new Error('Invalid email or password');
        };

        return {
            id: user?.user_id,
            email: user?.email,
            name: user?.first_name
        };
    } catch (err) {
        throw err
    };
};

function validateUserInput(first_name, last_name, email, password, confirm_password) {
    if (!emailRegex.test(email)) {
        throw new Error("Invalid email format");
    }
    if (first_name.length < 3 || last_name.length < 3) {
        throw new Error("First and last name must be at least 3 characters long");
    }
    if (password.length < 5 || confirm_password.length < 5) {
        throw new Error("Password must be at least 5 characters long");
    }
    if (password !== confirm_password) {
        throw new Error("Passwords do not match");
    }
};

module.exports = {
    createUser,
    login,
};