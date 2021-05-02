const fs = require('fs')
const userHelper = require('../../helper/user');

let users = require('../../db/users.json');
let userLogin = "";

const getHomePage = (req, res) => {
    res.render('home', { userLogin })
};

const getGamesPage = (req, res) => {
    if (userLogin) {
        res.render('games', { userLogin })
        return;
    } else {
        res.redirect('/login')
    }
};

const getRegisterPage = (req, res) => {
    res.render('users/register');
};

const getLoginPage = (req, res) => {
    res.render('users/login');
};

const createUserGames = (req, res) => {
    const { email, password } = req.body;

    if (!email || email === '') {
        res.render('users/register', {
            emailErrorMessage: "Email is required"
        })
        return;
    }

    if (!password || password === '') {
        res.render('users/register', {
            passwordErrorMessage: "Password is required"
        })
        return;
    }

    let user = users.find((user) => user.email === email);
    if (user) {
        res.status(409).render('users/register', {
            userErrorMessage: "User is already registered. Please login."
        })
        return;
    }

    id = userHelper.generateId(users);

    user = {
        id, email, password
    };

    users.push(user);
    fs.writeFileSync('db/users.json', JSON.stringify(users));

    res.status(201).redirect('/login');
};

const loginUserGames = (req, res) => {
    const { email, password } = req.body;

    if (!email || email === '') {
        res.render('users/login', {
            emailErrorMessage: "Email is required"
        })
        return;
    }

    if (!password || password === '') {
        res.render('users/login', {
            passwordErrorMessage: "Password is required"
        })
        return;
    }

    let user = users.find((user) => user.email === email && user.password === password);
    if (!user) {
        res.render('users/login', {
            userErrorMessage: "Invalid email or password"
        })
        return;
    }

    userLogin = user;
    res.redirect('/');
};

const logoutUserGames = (req, res) => {
    userLogin = "";
    res.redirect('/');
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