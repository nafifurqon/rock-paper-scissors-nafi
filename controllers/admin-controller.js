const { User, Match } = require('../models');

const roles = ['admin', 'player'];

const showDashboard = async (req, res) => {
    try {
        const countPlayers = await User.count({
            col: 'uuid',
            where: { role: 'player' },
        });

        const countMatches = await Match.count({
            col: 'uuid',
        });

        res.status(200).render('admin/dashboard/dashboard', {
            countPlayers,
            countMatches
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const showAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();

        res.status(200).render('admin/user/view-users', {
            users,
            roles,
        });
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
    showDashboard,
    showAllUsers,
    createUser,
    updateUser,
    deleteUser
}