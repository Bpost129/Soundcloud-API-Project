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
      title: "Hazy After Hours",
      description: "Chill",
      url: "https://assets.mixkit.co/music/download/mixkit-hazy-after-hours-132.mp3",
      imageUrl: "https://www.free-stock-music.com/thumbnails/tubebackr-say-nothing.jpg",
    },
    {
      albumId: 1,
      userId: 2,
      title: "Tech House",
      description: "Electric",
      url: "https://assets.mixkit.co/music/download/mixkit-tech-house-vibes-130.mp3",
      imageUrl: "https://www.free-stock-music.com/thumbnails/tubebackr-keep-me.jpg",
    },
    {
      albumId: 1,
      userId: 3,
      title: "Raising Me Higher",
      description: "Chill",
      url: "https://assets.mixkit.co/music/download/mixkit-raising-me-higher-34.mp3",
      imageUrl: "https://www.free-stock-music.com/thumbnails/peyruis-dance-moves.jpg",
    },
    {
      albumId: 1,
      userId: 4,
      title: "Driving Ambition",
      description: "Acoustic",
      url: "https://assets.mixkit.co/music/download/mixkit-driving-ambition-32.mp3",
      imageUrl: "https://www.free-stock-music.com/thumbnails/kv-colors.jpg",
    },
    {
      albumId: 2,
      userId: 1,
      title: "Deep Urban",
      description: "Electric",
      url: "https://assets.mixkit.co/music/download/mixkit-deep-urban-623.mp3",
      imageUrl: "https://www.free-stock-music.com/thumbnails/alexander-nakarada-echo.jpg",
    },
    {
      albumId: 2,
      userId: 2,
      title: "Life Is A Dream",
      description: "Pop",
      url: "https://assets.mixkit.co/music/download/mixkit-life-is-a-dream-837.mp3",
      imageUrl: "https://www.free-stock-music.com/thumbnails/alex-productions-indie-rock-travel-way.jpg",
    },
    {
      albumId: 2,
      userId: 3,
      title: "C.B.P.D",
      description: "Hip Hop",
      url: "https://assets.mixkit.co/music/download/mixkit-cbpd-400.mp3",
      imageUrl: "https://www.free-stock-music.com/thumbnails/the-denotes-let-us-run-for-it.jpg",
    },
    {
      albumId: 2,
      userId: 4,
      title: "Complicated",
      description: "Hip Hop",
      url: "https://assets.mixkit.co/music/download/mixkit-complicated-281.mp3",
      imageUrl: "https://www.free-stock-music.com/thumbnails/alexander-nakarada-stoned.jpg",
    },
    {
      albumId: 3,
      userId: 1,
      title: "Sleepy Cat",
      description: "Chill",
      url: "https://assets.mixkit.co/music/download/mixkit-sleepy-cat-135.mp3",
      imageUrl: "https://www.free-stock-music.com/thumbnails/2tech-audio-motivate.jpg",
    },
    {
      albumId: 3,
      userId: 2,
      title: "Beautiful Dream",
      description: "Chill",
      url: "https://assets.mixkit.co/music/download/mixkit-beautiful-dream-493.mp3",
      imageUrl: "https://www.free-stock-music.com/thumbnails/mixaund-sunrays.jpg",
    },
    {
      albumId: 3,
      userId: 3,
      title: "Island",
      description: "Electric",
      url: "https://assets.mixkit.co/music/download/mixkit-island-beat-250.mp3",
      imageUrl: "https://www.free-stock-music.com/thumbnails/jay-someday-playful.jpg",
    },
    {
      albumId: 3,
      userId: 4,
      title: "Getting Ready",
      description: "Electric",
      url: "https://assets.mixkit.co/music/download/mixkit-getting-ready-46.mp3",
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
