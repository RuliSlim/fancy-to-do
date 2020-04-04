'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn('Todos', 'ProjectId', Sequelize.INTEGER)
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.removeColumn('Todos', 'ProjectId')
  }
};
