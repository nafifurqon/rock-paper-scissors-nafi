const express = require('express');
const adminRouter = express.Router();
const {
    getDashboard,
    getAllUsers
} = require('../controllers/admin-controller');

adminRouter.get('/', getDashboard);
adminRouter.get('/users', getAllUsers);

module.exports = adminRouter;