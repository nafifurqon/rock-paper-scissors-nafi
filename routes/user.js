const express = require('express');
const router = express.Router();
const fs = require('fs');

let users = require('../db/users.json');
router.use(express.json());

const validateUser = (email, password, res) => {
    if((!email || email === '')){
        res.status(400).json({
            message: "Email are required"
        });
        return;
    }

    if((!password || password === '')){
        res.status(400).json({
            message: "Password are required"
        })
        return;
    }
}

const generateId = (database) => {
    let id = 0;
    if(database.length > 0){
        id = database[database.length - 1].id + 1
    }

    return id;
}

// Get All User
router.get('/', (req, res) => {
    res.status(200).json(users);
})

// Register user
router.post('/register', (req, res) => {
    const { email, password } = req.body

    validateUser(email, password, res);

    id = generateId(users);

    const user = {
        id, email, password
    }

    users.push(user);
    fs.writeFileSync('db/users.json', JSON.stringify(users));

    res.status(201).json(user);
})

// Login User
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    validateUser(email, password, res);

    const user = users.find((user) => user.email === email && user.password === password);
    
    if(!user){
        res.status(401).json({
            message: "Invalid email or password"
        });
        return;
    }

    res.status(200).json(user);
})

module.exports = router