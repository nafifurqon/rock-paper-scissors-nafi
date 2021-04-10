const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
    res.render('home.ejs')
})

router.get('/games', function(req, res){
    res.render('games.ejs')
})

module.exports = router