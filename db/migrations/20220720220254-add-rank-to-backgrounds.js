'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Backgrounds',
        'rank',
        {
          type: Sequelize.ENUM(
            'common',
            'uncommon',
            'rare',
            'legendary',
          ),
          defaultValue: 'common',
        },
      ),
      queryInterface.addColumn(
        'Backgrounds',
        'label',
        {
          type: Sequelize.STRING,
          defaultValue: null,
        },
      ),
    ]);
  },

  down: async (queryInterface) => {
    return Promise.all([
      queryInterface.removeColumn('Backgrounds', 'rank'),
      queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Backgrounds_rank";'),
      queryInterface.removeColumn('Backgrounds', 'label'),
    ]);
  },
};
