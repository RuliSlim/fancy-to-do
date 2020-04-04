'use strict';
const {Sequelize} = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

db.Todo = require('./todo');
db.User = require('./user');
db.Project = require('./project');
db.ProjectUser = require('./projectuser')

db.User.hasMany(db.Todo);
db.Project.hasMany(db.Todo);
db.Todo.belongsTo(db.User);
db.Todo.belongsTo(db.Project);

db.User.belongsToMany(db.Project, {through: db.ProjectUser});
db.Project.belongsToMany(db.User, {through: db.ProjectUser});
db.ProjectUser.belongsTo(db.Project);
db.ProjectUser.belongsTo(db.User);