const express = require('express');
const router = express.Router();
const fs = require('fs')
const userHelper = require('../helper/user');

let users = require('../db/users.json');
let userLogin = "";

router.get('/', (req, res) => {
    res.render('home', {userLogin})
})

router.get('/games', (req, res) => {
    if(userLogin){
        res.render('games', {userLogin})
        return;
    } else {
        res.redirect('/login')
    }
})

router.get('/register', (req, res) => {
    res.render('users/register');
})

router.get('/login', (req, res) => {
    res.render('users/login');
})

router.post('/register', (req, res) => {
    const { email, password } = req.body;

    if(!email || email === ''){
        res.render('users/register', {
            emailErrorMessage: "Email is required"
        })
        return;
    }

    if(!password || password === ''){
        res.render('users/register', {
            passwordErrorMessage: "Password is required"
        })
        return;
    }

    let user = users.find((user) => user.email === email);
    if(user){
        res.render('users/register', {
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
})

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if(!email || email === ''){
        res.render('users/login', {
            emailErrorMessage: "Email is required"
        })
        return;
    }

    if(!password || password === ''){
        res.render('users/login', {
            passwordErrorMessage: "Password is required"
        })
        return;
    }

    let user = users.find((user) => user.email === email && user.password === password);
    if(!user){
        res.render('users/login', {
            userErrorMessage: "Invalid email or password"
        })
        return;
    }

    userLogin = user;
    res.redirect('/');
})

router.post('/logout', (req, res) => {
    userLogin = "";
    res.redirect('/');
})

module.exports = router