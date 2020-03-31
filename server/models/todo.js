'use strict';
const {sequelize}         = require('./index');
const {Model, DataTypes}  = require('sequelize');

class todo extends Model {};
todo.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Title cannot be empty'
      },
      notNull: {
        args: true,
        msg: 'Title cannot be empty'
      }
    }
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  due_date: {
    type: DataTypes.DATE
  }
}, {
  sequelize
});

module.exports = todo