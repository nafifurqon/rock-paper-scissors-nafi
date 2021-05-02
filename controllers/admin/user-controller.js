const { User } = require('../../models');

let userLogin = require('./user-login.json');
const roles = ['admin', 'player'];

const showAllUsers = async (req, res) => {
    try {
        if (userLogin.email == 'admin@rps.com') {
            const users = await User.findAll();

            res.status(200).render('admin/user/view-users', {
                users,
                roles,
                userLogin
            });
            return;
        }

        res.status(200).redirect('/admin/auth/login');
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const createUser = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        await User.create({
            email,
            password,
            role,
        });

        res.redirect('/admin/users');
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { email, password, role, uuid } = req.body;

        await User.update({
            email,
            password,
            role,
        }, {
            where: { uuid },
        });

        res.redirect('/admin/users');
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const uuid = req.params.uuid;
        await User.destroy({
            where: { uuid },
        });

        res.redirect('/admin/users');
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    showAllUsers,
    createUser,
    updateUser,
    deleteUser
}