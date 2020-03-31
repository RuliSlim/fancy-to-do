'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn('Todos', 'UserId', Sequelize.UUID)
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.removeColumn('Todos', 'UserId')
  }
};
