'use strict';
const {sequelize}         = require('./index');
const {Model, DataTypes}  = require('sequelize');

class Project extends Model {}
Project.init({
  name: {
    type: DataTypes.STRING,
  }
}, {sequelize})

Project.associate = function(models) {
  Project.belongsToMany(models.User, {through: 'ProjectUser'});
  Project.hasMany(models.Todo);
}


module.exports = Project