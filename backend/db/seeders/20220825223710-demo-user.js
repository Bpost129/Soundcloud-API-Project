'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'Demouser@user.io',
        firstName: 'Demo',
        lastName: 'User',
        username: 'DemoUser',
        hashedPassword: bcrypt.hashSync('password'),
        imageUrl: "https://en.wikipedia.org/wiki/File:DuaLipaO2020522_(101_of_110)_(52052470251)_(cropped).jpg",
      },
      {
        email: 'Spiderman@user.io',
        firstName: 'Peter',
        lastName: 'Parker',
        username: 'Spiderman',
        hashedPassword: bcrypt.hashSync('password2'),
        imageUrl: "https://en.wikipedia.org/wiki/File:Public_Enemy-01-mika.jpg",
      },
      {
        email: 'Ironman@user.io',
        firstName: 'Tony',
        lastName: 'Stank',
        username: 'Ironman',
        hashedPassword: bcrypt.hashSync('password3'),
        imageUrl: "https://en.wikipedia.org/wiki/File:Backstreet_Boys_2019_by_Glenn_Francis.jpg",
      },
      {
        email: 'Thor@user.io',
        firstName: 'Thor',
        lastName: 'Odinson',
        username: 'Pointbreak',
        hashedPassword: bcrypt.hashSync('password4'),
        imageUrl: "https://en.wikipedia.org/wiki/File:Backstreet_Boys_2019_by_Glenn_Francis.jpg",
      },
      {
        email: 'Blackwidow@user.io',
        firstName: 'Natasha',
        lastName: 'Romanoff',
        username: 'Blackwidow',
        hashedPassword: bcrypt.hashSync('password5'),
        imageUrl: "https://en.wikipedia.org/wiki/File:Backstreet_Boys_2019_by_Glenn_Francis.jpg",
      },
      {
        email: 'Antman@user.io',
        firstName: 'Scott',
        lastName: 'Lang',
        username: 'Antman',
        hashedPassword: bcrypt.hashSync('password6'),
        imageUrl: "https://en.wikipedia.org/wiki/File:Backstreet_Boys_2019_by_Glenn_Francis.jpg",
      },
      {
        email: 'Hulk@user.io',
        firstName: 'Bruce',
        lastName: 'Banner',
        username: 'Hulk',
        hashedPassword: bcrypt.hashSync('password7'),
        imageUrl: "https://en.wikipedia.org/wiki/File:Backstreet_Boys_2019_by_Glenn_Francis.jpg",
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['DuaLipa', 'PublicEnemy1', 'BackstreetBoys5'] }
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
