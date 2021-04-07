const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
    res.render('home/home.ejs')
})

router.get('/games', function(req, res){
    res.render('games/games.ejs')
})

module.exports = router