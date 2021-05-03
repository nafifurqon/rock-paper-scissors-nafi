const express = require('express');
const router = express.Router();
const {
    getHomePage,
    getRegisterPage,
    getGamesPage,
    getLoginPage,
    createUserGames,
    loginUserGames,
    logoutUserGames,
} = require('../controllers/frontend/games-controller');

router.get('/', getHomePage);
router.get('/games', getGamesPage);
router.get('/register', getRegisterPage);
router.get('/login', getLoginPage);
router.post('/register', createUserGames);
router.post('/login', loginUserGames);
router.post('/logout', logoutUserGames);

module.exports = router