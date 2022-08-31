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
    return queryInterface.bulkInsert('Playlists', [
      {
        userId: 1,
        name: "Summer Hits",
        imageUrl: "https://img.freepik.com/premium-vector/summer-music-playlist-cover-concept-with-realistic-vinyl-disk-mockup-with-summer-sunset-cover_148087-455.jpg?w=2000",
      },
      {
        userId: 2,
        name: "Party",
        imageUrl: "https://images.8tracks.com/cover/i/000/326/012/party-hard-9657.jpg?rect=0,0,500,500&q=98&fm=jpg&fit=max",
      },
      {
        userId: 3,
        name: "Classics",
        imageUrl: "https://images.squarespace-cdn.com/content/v1/52d6f3cee4b01cea685fa255/1543360566307-EMUOD5RM631ZM0Z9OA80/90s-2.jpg?format=1500w",
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
     return queryInterface.bulkDelete('Playlists', {
       name: { [Op.in]: ['Summer Hits', 'Classics', 'Energize'] }
     }, {});
  }
};
