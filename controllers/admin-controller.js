const { User, Match } = require('../models');

const getDashboard = async (req, res) => {
    try {
        const url = req.originalUrl;

        const countPlayers = await User.count({
            col: 'uuid',
            where: { role: 'player' },
        });

        const countMatches = await Match.count({
            col: 'uuid',
        });

        res.status(200).render('admin/index', {
            url,
            countPlayers,
            countMatches
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const url = req.originalUrl;
        const users = await User.findAll();

        res.status(200).render('admin/index', {
            url,
            users,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getDashboard,
    getAllUsers,
}