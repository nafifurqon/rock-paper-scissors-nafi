'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
    }
  };
  UserProfile.init({
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
  }, {
    sequelize,
    modelName: 'UserProfile',
    tableName: 'user_profiles'
  });
  return UserProfile;
};