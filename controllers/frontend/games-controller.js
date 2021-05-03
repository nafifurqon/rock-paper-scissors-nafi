const { User } = require('../../models');
const userHelper = require('../../helper/user');

let users = require('../../db/users.json');
let userLogin = '';

const getHomePage = async (req, res) => {
    try {
        res.render('game/home', {
            userLogin,
            title: 'RPS Game | Home'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
            data: null,
        });
    }
};

const getGamesPage = async (req, res) => {
    try {
        if (userLogin.email) {
            res.render('game/games', {
                title: 'RPS Game | Games'
            });
            return;
        }

        res.redirect('/login')
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
            data: null,
        });
    }
};

const getRegisterPage = async (req, res) => {
    try {
        res.render('users/register', {
            errorMessage: '',
            title: 'RPS Game | Register',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
            data: null,
        });
    }
};

const getLoginPage = async (req, res) => {
    try {
        res.render('users/login', {
            errorMessage: '',
            title: 'RPS Game | Login'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
            data: null,
        });
    }
};

const createUserGames = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({
            where: { email },
        });

        if (user) {
            res.status(409).render('users/register', {
                errorMessage: "User is already registered. Please login."
            })
            return;
        }

        await User.create({
            email,
            password,
            role: 'player',
        });

        await res.status(201).redirect('/login');
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
            data: null,
        });
    }
};

const loginUserGames = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({
            where: { email, password }
        });

        if (!user) {
            res.render('users/login', {
                errorMessage: "Invalid email or password"
            })
            return;
        }

        userLogin = user;
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
            data: null,
        });
    }
};

const logoutUserGames = (req, res) => {
    try {
        userLogin = [];
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
            data: null,
        });
    }
};

module.exports = {
    getHomePage,
    getGamesPage,
    getRegisterPage,
    getLoginPage,
    createUserGames,
    loginUserGames,
    logoutUserGames,
}