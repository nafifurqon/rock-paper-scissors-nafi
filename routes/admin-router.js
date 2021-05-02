const express = require('express');
const adminRouter = express.Router();
const {
    showDashboard,
    showAllUsers,
    createUser,
    updateUser,
    deleteUser,
} = require('../controllers/admin-controller');
const {
    showAllUserProfiles,
    createUserProfile,
    updateUserProfile,
    deleteUserProfile,
} = require('../controllers/admin/user-profile-controller');
adminRouter.use(express.json());

// Dashboard Home
adminRouter.get('/', showDashboard);

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

module.exports = adminRouter;