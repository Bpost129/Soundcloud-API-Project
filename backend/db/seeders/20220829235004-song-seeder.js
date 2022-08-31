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
   return queryInterface.bulkInsert('Songs', [
    {
      albumId: 1,
      userId: 1,
      title: "Don't Start Now",
      description: "Lead single from Future Nostalgia",
      url: "https://open.spotify.com/track/1AVtceapuF36oZqI9gzp0o?si=e020ef525fdc48f6",
      imageUrl: "https://en.wikipedia.org/wiki/File:Dua_Lipa_-_Don%27t_Start_Now.png",
    },
    {
      albumId: 2,
      userId: 2,
      title: "Rebel Without A Pause",
      description: "Hit song from Public Enemy",
      url: "https://open.spotify.com/track/5lWwAQUep9RKuwtSJY41ab?si=c16c80f8d1e845e9",
      imageUrl: "https://en.wikipedia.org/wiki/File:Public_Enemy-01-mika.jpg",
    },
    {
      albumId: 3,
      userId: 3,
      title: "Larger Than Life",
      description: "Classic song from the Backstreet Boys",
      url: "https://open.spotify.com/track/6sbXGUn9V9ZaLwLdOfpKRE?si=f1998aaa37034874",
      imageUrl: "https://en.wikipedia.org/wiki/File:Larger_than_Life_BSB_single_cover.jpg",
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
     return queryInterface.bulkDelete('Songs', {
       title: { [Op.in]: ['Don\'t Start Now', 'Rebel Without A Pause', 'Larger Than Life'] }
     }, {});
  }
};
