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
      title: "Say Nothing",
      description: "Electric",
      url: "https://www.free-stock-music.com/music/tubebackr-say-nothing.mp3",
      imageUrl: "https://www.free-stock-music.com/thumbnails/tubebackr-say-nothing.jpg",
    },
    {
      albumId: 1,
      userId: 2,
      title: "Keep Me",
      description: "Electric",
      url: "https://www.free-stock-music.com/tubebackr-keep-me.html",
      imageUrl: "https://www.free-stock-music.com/thumbnails/tubebackr-keep-me.jpg",
    },
    {
      albumId: 1,
      userId: 3,
      title: "Dance Moves",
      description: "Electric",
      url: "https://www.free-stock-music.com/peyruis-dance-moves.html",
      imageUrl: "https://www.free-stock-music.com/thumbnails/peyruis-dance-moves.jpg",
    },
    {
      albumId: 1,
      userId: 4,
      title: "Colors",
      description: "Electric",
      url: "https://www.free-stock-music.com/kv-colors.html",
      imageUrl: "https://www.free-stock-music.com/thumbnails/kv-colors.jpg",
    },
    {
      albumId: 2,
      userId: 1,
      title: "E.C.H.O",
      description: "Alternative",
      url: "https://www.free-stock-music.com/alexander-nakarada-echo.html",
      imageUrl: "https://www.free-stock-music.com/thumbnails/alexander-nakarada-echo.jpg",
    },
    {
      albumId: 2,
      userId: 2,
      title: "WAY",
      description: "Alternative",
      url: "https://www.free-stock-music.com/alex-productions-indie-rock-travel-way.html",
      imageUrl: "https://www.free-stock-music.com/thumbnails/alex-productions-indie-rock-travel-way.jpg",
    },
    {
      albumId: 2,
      userId: 3,
      title: "Let Us Run For It",
      description: "Alternative",
      url: "https://www.free-stock-music.com/the-denotes-let-us-run-for-it.html",
      imageUrl: "https://www.free-stock-music.com/thumbnails/the-denotes-let-us-run-for-it.jpg",
    },
    {
      albumId: 2,
      userId: 4,
      title: "Stoned",
      description: "Alternative",
      url: "https://www.free-stock-music.com/alexander-nakarada-stoned.html",
      imageUrl: "https://www.free-stock-music.com/thumbnails/alexander-nakarada-stoned.jpg",
    },
    {
      albumId: 3,
      userId: 1,
      title: "Motivate",
      description: "Pop",
      url: "https://www.free-stock-music.com/2tech-audio-motivate.html",
      imageUrl: "https://www.free-stock-music.com/thumbnails/2tech-audio-motivate.jpg",
    },
    {
      albumId: 3,
      userId: 2,
      title: "Sunrays",
      description: "Pop",
      url: "https://www.free-stock-music.com/mixaund-sunrays.html",
      imageUrl: "https://www.free-stock-music.com/thumbnails/mixaund-sunrays.jpg",
    },
    {
      albumId: 3,
      userId: 3,
      title: "Playful",
      description: "Pop",
      url: "https://www.free-stock-music.com/jay-someday-playful.html",
      imageUrl: "https://www.free-stock-music.com/thumbnails/jay-someday-playful.jpg",
    },
    {
      albumId: 3,
      userId: 4,
      title: "Destiny",
      description: "Pop",
      url: "https://www.free-stock-music.com/tubebackr-destiny.html",
      imageUrl: "https://www.free-stock-music.com/thumbnails/tubebackr-destiny.jpg",
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
