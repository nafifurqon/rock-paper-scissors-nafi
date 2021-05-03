const express = require('express');
const adminRouter = express.Router();
const {
    showAllUsers,
    createUser,
    updateUser,
    deleteUser,
} = require('../controllers/admin/user-controller');
const {
    showAllUserProfiles,
    createUserProfile,
    updateUserProfile,
    deleteUserProfile,
} = require('../controllers/admin/user-profile-controller');
const {
    showAllMatches,
    createMatch,
    updateMatch,
    deleteMatch,
} = require('../controllers/admin/match-controller');
const {
    showDashboardHome,
    showLoginPage,
    actionLogin,
    actionLogout,
} = require('../controllers/admin/admin-auth-controller');
adminRouter.use(express.json());

// Dashboard Home
adminRouter.get('/', showDashboardHome);
adminRouter.get('/auth/login', showLoginPage);
adminRouter.post('/auth/login', actionLogin);
adminRouter.post('/auth/logout', actionLogout)

// User
adminRouter.get('/users', showAllUsers);
adminRouter.post('/users', createUser);
adminRouter.put('/users', updateUser);
adminRouter.delete('/users/:uuid', deleteUser);

//User Profile
adminRouter.get('/user-profiles', showAllUserProfiles);
adminRouter.post('/user-profiles', createUserProfile);
adminRouter.put('/user-profiles', updateUserProfile);
adminRouter.delete('/user-profiles/:uuid', deleteUserProfile);

//Match
adminRouter.get('/matches', showAllMatches);
adminRouter.post('/matches', createMatch);
adminRouter.put('/matches', updateMatch);
adminRouter.delete('/matches/:uuid', deleteMatch);

module.exports = adminRouter;