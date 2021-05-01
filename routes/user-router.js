const express = require('express');
const router = express.Router();
const {
    createUser,
    getAllUsers,
    loginUser,
    updateUser,
    deleteUser,
} = require('../controllers/user-controller');

router.use(express.json());

router.get('/', getAllUsers)
router.post('/register', createUser);
router.post('/login', loginUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router