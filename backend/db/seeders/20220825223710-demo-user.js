'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'Dualipa@user.io',
        firstName: 'Dua',
        lastName: 'Lipa',
        username: 'DuaLipa',
        hashedPassword: bcrypt.hashSync('password'),
        imageUrl: "https://en.wikipedia.org/wiki/File:DuaLipaO2020522_(101_of_110)_(52052470251)_(cropped).jpg",
      },
      {
        email: 'Publicenemy@user.io',
        firstName: 'Public',
        lastName: 'Enemy',
        username: 'PublicEnemy1',
        hashedPassword: bcrypt.hashSync('password2'),
        imageUrl: "https://en.wikipedia.org/wiki/File:Public_Enemy-01-mika.jpg",
      },
      {
        email: 'Backstreetboys@user.io',
        firstName: 'Backstreet',
        lastName: 'Boys',
        username: 'BackstreetBoys5',
        hashedPassword: bcrypt.hashSync('password3'),
        imageUrl: "https://en.wikipedia.org/wiki/File:Backstreet_Boys_2019_by_Glenn_Francis.jpg",
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};




// 'use strict';

// module.exports = {
//   async up (queryInterface, Sequelize) {
//     /**
//      * Add seed commands here.
//      *
//      * Example:
//      * await queryInterface.bulkInsert('People', [{
//      *   name: 'John Doe',
//      *   isBetaMember: false
//      * }], {});
//     */
//   },

//   async down (queryInterface, Sequelize) {
//     /**
//      * Add commands to revert seed here.
//      *
//      * Example:
//      * await queryInterface.bulkDelete('People', null, {});
//      */
//   }
// };
