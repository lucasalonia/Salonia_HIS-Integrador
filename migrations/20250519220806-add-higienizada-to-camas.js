'use strict';

/** @type {import('sequelize-cli').Migration} */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('camas', 'liberada', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    });

    await queryInterface.addColumn('camas', 'higienizada', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('camas', 'liberada');
    await queryInterface.removeColumn('camas', 'higienizada');
  }
};
