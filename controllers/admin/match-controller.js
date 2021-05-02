const { QueryTypes } = require('sequelize');
const { Match, User, sequelize } = require('../../models');

const hands = ['rock', 'paper', 'scissors'];
const results = ['Player 1 Win', 'Player 2 Win', 'Draw'];

const showAllMatches = async (req, res) => {
    try {
        const matches = await Match.findAll({
            include: ['user_1', 'user_2'],
        });

        const users = await User.findAll({
            attributes: ['uuid', 'email'],
            where: { role: 'player' },
        });

        res.status(200).render('admin/match/view-match', {
            matches,
            users,
            hands,
            results,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const createMatch = async (req, res) => {
    try {
        const { player1, player2, player1Hand, player2Hand, result } = req.body;

        await Match.create({
            player_1: player1,
            player_2: player2,
            player_1_hand: player1Hand,
            player_2_hand: player2Hand,
            result,
        });

        res.redirect('/admin/matches');
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const updateMatch = async (req, res) => {
    try {
        const { uuid, player1, player2, player1Hand, player2Hand, result } = req.body;

        await Match.update({
            player_1: player1,
            player_2: player2,
            player_1_hand: player1Hand,
            player_2_hand: player2Hand,
            result,
        }, {
            where: { uuid }
        });

        res.redirect('/admin/matches');
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const deleteMatch = async (req, res) => {
    try {
        const uuid = req.params.uuid;

        await Match.destroy({
            where: { uuid },
        });

        res.redirect('/admin/matches');
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    showAllMatches,
    createMatch,
    updateMatch,
    deleteMatch
}