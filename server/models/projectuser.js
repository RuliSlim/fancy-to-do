'use strict';
const {sequelize}         = require('./index');
const {Model, DataTypes}  = require('sequelize');

class ProjectUser extends Model {}
ProjectUser.init({
  UserId: {
    type: DataTypes.UUID,
  },
  ProjectId: {
    type: DataTypes.INTEGER
  }
}, {sequelize})

ProjectUser.associate = function(models) {
  ProjectUser.belongsTo(models.User);
  ProjectUser.belongsTo(models.Project);
}


module.exports = ProjectUser