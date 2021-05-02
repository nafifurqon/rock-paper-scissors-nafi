const fs = require('fs');
const { User, UserProfile, Match } = require('../models');
const userHelper = require('../helper/user');
let users = require('../db/users.json');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            include: ['user_profile', 'player_1_match', 'player_2_match']
        });

        res.status(200).json({
            status: 'success',
            message: 'success get data',
            data: users,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
            data: null,
        });
    }
};

const createUser = async (req, res) => {
    try {
        const { email, password, role } = req.body

        userHelper.validateUser(email, password, res);

        let user = await User.findOne({
            where: { email },
        });
        if (user) {
            res.status(409).json({
                status: 'failed',
                message: 'User is already registered',
                data: null
            })
            return;
        };

        user = {
            email, password, role
        }

        await User.create({
            email,
            password,
            role,
        });

        res.status(201).json({
            status: 'success',
            message: 'success create data',
            data: user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'failed',
            message: error.message,
            data: null,
        });
    }
};

const getUserById = async (req, res) => {
    try {
        const uuid = req.params.uuid;

        const user = await User.findOne({
            include: ['user_profile', 'player_1_match', 'player_2_match'],
            where: { uuid }
        });

        res.status(200).json({
            status: 'success',
            message: 'success get data',
            data: user,
        });
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
            data: null,
        });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        userHelper.validateUser(email, password, res);

        const user = await User.findOne({
            where: { email, password }
        });

        if (!user) {
            res.status(401).json({
                status: 'failed',
                message: "Invalid email or password",
                data: null,
            });
            return;
        }

        res.status(200).json({
            status: 'success',
            message: 'success get data',
            data: user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
            data: null,
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        const uuid = req.params.uuid;

        userHelper.validateUser(email, password, res);

        let user = await User.findOne({
            where: { uuid }
        });

        if (user) {
            await User.update({
                email,
                password,
                role,
            }, {
                where: { uuid },
            });

            user = await User.findOne({
                where: { uuid }
            });

            res.status(200).json({
                status: 'success',
                message: 'success update data',
                data: user,
            });
            return;
        }

        res.status(400).json({
            status: 'failed',
            message: 'failed update data',
            data: null,
        });
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
            data: null,
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const uuid = req.params.uuid;

        await User.destroy({
            where: { uuid },
        });

        res.status(200).json({
            status: 'success',
            message: `Successfully deleted user with ${uuid}`
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
            data: null,
        });
    }
};

module.exports = {
    getAllUsers,
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getUserById,
}