const express = require('express');
const adminRouter = express.Router();
const {
    getDashboard,
    getAllUsers,
    createUser
} = require('../controllers/admin-controller');

adminRouter.use(express.json());

adminRouter.get('/', getDashboard);
adminRouter.get('/users', getAllUsers);
adminRouter.post('/users', createUser);

module.exports = adminRouter;