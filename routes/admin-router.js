const express = require('express');
const adminRouter = express.Router();
const {
    showDashboard,
    showAllUsers,
    createUser,
    updateUser,
    deleteUser,
} = require('../controllers/admin-controller');

adminRouter.use(express.json());

adminRouter.get('/', showDashboard);
adminRouter.get('/users', showAllUsers);
adminRouter.post('/users', createUser);
adminRouter.put('/users', updateUser);
adminRouter.delete('/users/:uuid', deleteUser);

module.exports = adminRouter;