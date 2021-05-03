'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Match extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const { User } = models;
      this.belongsTo(User, { foreignKey: 'player_1', as: 'user_1' });
      this.belongsTo(User, { foreignKey: 'player_2', as: 'user_2' });
    }
  };
  Match.init({
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
  }, {
    sequelize,
    modelName: 'Match',
    tableName: 'matches'
  });
  return Match;
};