const express = require('express');
const router = express.Router();
const fs = require('fs');
const userHelper = require('../helper/user')

let users = require('../db/users.json');
router.use(express.json());

// Get All User
router.get('/', (req, res) => {
    res.status(200).json(users);
})

// Register user
router.post('/register', (req, res) => {
    const { email, password } = req.body

    userHelper.validateUser(email, password, res);

    let user = users.find((user) => user.email === email);
    if(user){
        res.status(400).json({
            message: "User is already registered"
        })
        return;
    };

    id = userHelper.generateId(users);

    user = {
        id, email, password
    }

    users.push(user);
    fs.writeFileSync('db/users.json', JSON.stringify(users));

    res.status(201).json(user);
})

// Login User
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    userHelper.validateUser(email, password, res);

    const user = users.find((user) => user.email === email && user.password === password);
    
    if(!user){
        res.status(401).json({
            message: "Invalid email or password"
        });
        return;
    }

    res.status(200).json(user);
})

//Update user
router.put('/:id', (req, res) => {
    const { email, password } = req.body;
    let user = users.find(item => item.id === +req.params.id);

    userHelper.validateUser(email, password, res);
    userHelper.checkUserNotRegistered(user, res);

    const params = { 
        email: req.body.email,
        password: req.body.password
    }
    user = { ...user, ...params }

    users = users.map((item) => item.id == user.id ? user : item);
    fs.writeFileSync('db/users.json', JSON.stringify(users));
    res.status(200).json({user, message: "Successfully updated user"});
})

//Delete user
router.delete('/:id', (req, res) => {
    let user = users.find(item => item.id === +req.params.id);

    userHelper.checkUserNotRegistered(user, res);

    users = users.filter(item => item.id !== +req.params.id);
    fs.writeFileSync('db/users.json', JSON.stringify(users));
    res.status(200).json({message: `Successfully deleted user ${user.email}`})
})

module.exports = router