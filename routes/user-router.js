const express = require('express');
const router = express.Router();
const {
    createUser,
    getAllUsers,
    loginUser,
    updateUser,
    deleteUser,
    getUserById,
} = require('../controllers/api/user-controller');

router.get('/', getAllUsers);
router.get('/:uuid', getUserById)
router.post('/register', createUser);
router.post('/login', loginUser);
router.put('/:uuid', updateUser);
router.delete('/:uuid', deleteUser);

module.exports = router