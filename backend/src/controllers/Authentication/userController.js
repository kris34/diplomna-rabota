const { poolPromise } = require('../../database/db');
const { createUser, login } = require('../../services/userService');

const userController = require('express').Router();

userController.post('/auth/register', async (req, res) => {
    try {
        const { first_name, last_name, email, password, confirm_password } = req?.body;

        if (!first_name || !last_name || !password || !email || !confirm_password) {
            throw new Error('Invalid credentials!');
        };

        const registeredUser = await createUser({ first_name, last_name, email, password, confirm_password });

        if (!registeredUser) {
            throw new Error('Error in user registration!');
        };

        res.status(200).send('ok')
    } catch (err) {
        console.log(err);
        res.status(400).send('Error registering user!');
    };
});

userController.post('/auth/login', async (req, res) => {
    try {
        const { email, password } = req?.body;

        if (!email || !password) {
            throw new Error('Invalid login credentials!');
        };

        const loggedIn = await login({ email, password });

        req.session.user = loggedIn;
        res.status(200).send(loggedIn);
    } catch (err) {
        console.log(err);
        res.status(400).send('Login error!');
    };
});

userController.post('/auth/logout', async (req, res) => {
    try {
        req.session.destroy();
        res.clearCookie('auth');
        res.status(200).send('ok')
    } catch (err) {
        console.log(err);
        res.status(400).send('Logout error!');
    };
});

userController.get('/auth/validate', async (req, res) => {
    try {
        const session = req?.session?.user;

        if (!session) {
            console.log('User is not authorized!');
            res.clearCookie('auth');
            return res.status(400).send('invalid')
        };

        res.status(200).send({ status: 'valid', user_id: session?.id, email: session?.email, first_name: session?.name });
    } catch (err) {
        console.log(err);
    }
})

module.exports = userController;