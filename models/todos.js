'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class todos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      todos.belongsTo(models.activities, { foreignKey: "activity_group_id", as: 'activities' })
    }
  }
  todos.init({
    todo_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    activity_group_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN,
    priority: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'todos',
  });
  return todos;
};