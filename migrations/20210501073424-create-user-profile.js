'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('user_profiles', {
      uuid: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      full_name: {
        type: DataTypes.STRING,
      },
      job: {
        type: DataTypes.STRING
      },
      bio: {
        type: DataTypes.STRING
      },
      user_id: {
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'uuid',
          onDelete: 'cascade',
          onUpdate: 'cascade',
        }
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
    await queryInterface.dropTable('user_profiles');
  }
};