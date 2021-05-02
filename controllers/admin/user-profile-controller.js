const { QueryTypes } = require('sequelize');
const { UserProfile, sequelize } = require('../../models');

let userLogin = require('./user-login.json');

const showAllUserProfiles = async (req, res) => {
    try {
        if (userLogin.email == 'admin@rps.com') {
            const userProfiles = await UserProfile.findAll({
                include: 'user'
            });

            const users = await sequelize.query(
                "select uuid, email from users where role = 'player' and uuid not in ( select user_id from user_profiles )",
                { type: QueryTypes.SELECT }
            );

            res.status(200).render('admin/user-profile/view-user-profiles', {
                userProfiles,
                users,
                userLogin,
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

const createUserProfile = async (req, res) => {
    try {
        const { fullName, job, bio, userId } = req.body;

        await UserProfile.create({
            full_name: fullName,
            job,
            bio,
            user_id: userId
        });

        res.redirect('/admin/user-profiles');
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const updateUserProfile = async (req, res) => {
    try {
        const { uuid, fullName, job, bio, userId } = req.body;

        await UserProfile.update({
            full_name: fullName,
            job,
            bio,
            user_id: userId
        }, {
            where: { uuid },
        });

        res.redirect('/admin/user-profiles');
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const deleteUserProfile = async (req, res) => {
    try {
        const uuid = req.params.uuid;

        await UserProfile.destroy({
            where: { uuid },
        });

        res.redirect('/admin/user-profiles');
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    showAllUserProfiles,
    createUserProfile,
    updateUserProfile,
    deleteUserProfile,
}