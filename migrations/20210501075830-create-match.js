'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('matches', {
      uuid: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      player_1: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'uuid',
          onDelete: 'cascade',
          onUpdate: 'cascade',
        }
      },
      player_2: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'uuid',
          onDelete: 'cascade',
          onUpdate: 'cascade',
        }
      },
      player_1_hand: {
        type: DataTypes.STRING,
        allowNull: false
      },
      player_2_hand: {
        type: DataTypes.STRING,
        allowNull: false
      },
      result: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('matches');
  }
};