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
      this.belongsTo(User, { foreignKey: 'player_1', as: 'player_1_match' });
      this.belongsTo(User, { foreignKey: 'player_2', as: 'player_2_match' });
    }
  };
  Match.init({
    player_1: DataTypes.UUID,
    player_2: DataTypes.UUID,
    player_1_hand: DataTypes.STRING,
    player_2_hand: DataTypes.STRING,
    result: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Match',
    tableName: 'matches'
  });
  return Match;
};