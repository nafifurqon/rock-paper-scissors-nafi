const fs = require('fs');

const { User, Match } = require('../../models');
const adminUsers = require('../../db/users.json');

let userLogin = require('./user-login.json');

const showDashboardHome = async (req, res) => {
    try {
        if (userLogin.email == 'admin@rps.com') {
            const countPlayers = await User.count({
                col: 'uuid',
                where: { role: 'player' },
            });

            const countMatches = await Match.count({
                col: 'uuid',
            });

            res.status(200).render('admin/dashboard/dashboard', {
                countPlayers,
                countMatches,
                userLogin,
                title: 'RPS Admin | Dashboard'
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

const showLoginPage = async (req, res) => {
    try {
        await res.status(200).render('admin/auth/login', {
            title: 'RPS Admin | Login'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const actionLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const adminUser = await adminUsers.find((user) => {
            return user.email == email && user.password == password
        });

        if (adminUser) {
            userLogin = await adminUser;
            await fs.writeFileSync('controllers/admin/user-login.json', JSON.stringify(userLogin));

            await res.status(200).redirect('/admin');
            return;
        }

        await res.status(200).redirect('/admin/auth/login');
        return
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const actionLogout = async (req, res) => {
    try {
        userLogin = await {};
        await fs.writeFileSync('controllers/admin/user-login.json', JSON.stringify(userLogin));

        await res.redirect('/admin/auth/login');
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    showDashboardHome,
    showLoginPage,
    actionLogin,
    actionLogout,
}