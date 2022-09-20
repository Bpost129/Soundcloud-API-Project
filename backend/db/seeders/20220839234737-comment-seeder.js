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
   return queryInterface.bulkInsert('Comments', [
    {
      songId: 1,
      userId: 1,
      body: "Wow! Great song!",
    },
    {
      songId: 2,
      userId: 2,
      body: "I'll be listening to this all day!",
    },
    {
      songId: 3,
      userId: 3,
      body: "Lame",
    },
    {
      songId: 4,
      userId: 3,
      body: "Now this is it.",
    },
    {
      songId: 1,
      userId: 3,
      body: "Now that's what i call music",
    },
    {
      songId: 2,
      userId: 1,
      body: "Delete this.",
    },
    {
      songId: 3,
      userId: 2,
      body: "Never heard a better song!",
    },
    {
      songId: 4,
      userId: 3,
      body: "Awesome!",
    },
    {
      songId: 5,
      userId: 4,
      body: "Wow. Just wow.",
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
     return queryInterface.bulkDelete('Comments', {
       body: { [Op.in]: ['Wow! Great song!', 'I\'ll be listening to this all day!', 'Mid'] }
     }, {});
  }
};
