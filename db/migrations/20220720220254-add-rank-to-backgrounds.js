'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Backgrounds',
        'rank',
        {
          type: Sequelize.ENUM(
            'Common',
            'Uncommon',
            'Rare',
            'Legendary',
          ),
          defaultValue: 'Common',
        },
      ),
    ]);
  },

  down: async (queryInterface) => {
    return Promise.all([
      queryInterface.removeColumn('Backgrounds', 'rank'),
    ]);
  },
};
