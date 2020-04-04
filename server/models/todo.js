'use strict';
const {sequelize}         = require('./index');
const {Model, DataTypes}  = require('sequelize');

class Todo extends Model {};
Todo.init({
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
  },
  UserId: {
    type: DataTypes.UUID,
    allowNull: false,
    validate: {
      notNull: {
        args: true,
        msg: 'You have to login'
      },
      notEmpty: {
        args: true,
        msg: 'You have to login'
      }
    }
  },
  ProjectId: {
    type: DataTypes.INTEGER
  }
}, {
  sequelize
});

Todo.associate = function(models) {
  Todo.belongsTo(models.User);
  Todo.belongsTo(models.Project);
}

module.exports = Todo