'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class activities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
            // activities.hasMany(models.todos, { as: 'todos' })
    }
  }
  activities.init({
    activity_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'activities',
  });
  return activities;
};