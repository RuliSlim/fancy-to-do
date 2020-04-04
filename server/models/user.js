'use strict';
const {sequelize}         = require('./index');
const {Model, DataTypes}  = require('sequelize');
const {hashedPassword}    = require('../helpers/bcrypt')

class User extends Model {}
User.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Name cannot be empty'
      },
      notNull: {
        args: true,
        msg: 'Name cannot be empty'
      }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Email cannot be empty'
      },
      notNull: {
        args: true,
        msg: 'Email cannot be empty'
      },
      isEmail: {
        args: true,
        msg: 'Format email address is not valid'
      }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Password cannot be empty'
      },
      notNull: {
        args: true,
        msg: 'Password cannot be empty'
      },
      len: {
        args: [8, 16],
        msg: 'Password must be longer than 8'
      }
    }
  }
}, {
  hooks: {
    beforeCreate: (user, options) => {
      const secured = hashedPassword(user.password);
      user.password = secured;
    }
  }, sequelize})

User.associate = function (models, options) {
  User.hasMany(models.Todo);
  User.belongsToMany(models.Project, {through: 'ProjectUser'});
}

module.exports = User
