'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Albums', [
      {
        userId: 1,
        title: "Future Nostalgia",
        description: "(2020) Dua Lipa's second studio album",
        imageUrl: "https://en.wikipedia.org/wiki/File:Dua_Lipa_-_Future_Nostalgia_(Official_Album_Cover).png",
      },
      {
        userId: 2,
        title: "It Takes A Nation Of Millions To Hold Us Back",
        description: "(1988) Public Enemy's second studio album",
        imageUrl: "https://en.wikipedia.org/wiki/File:PublicEnemyItTakesaNationofMillionstoHoldUsBack.jpg",
      },
      {
        userId: 3,
        title: "Millennium",
        description: "(1999) Backstreet Boy's third studio album",
        imageUrl: "https://en.wikipedia.org/wiki/File:Millennium_cover.jpg",
      },
    ], {})

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     const Op = Sequelize.Op;
     return queryInterface.bulkDelete('Albums', {
       title: { [Op.in]: ['Future Nostalgia', 'It Takes A Nation Of Millions To Hold Us Back', 'Millennium'] }
     }, {});
  }
};
