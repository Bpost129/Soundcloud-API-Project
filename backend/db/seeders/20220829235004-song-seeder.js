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
      title: "Stay Chilled",
      description: "Chill",
      url: "https://tunetank-production.s3.us-west-2.amazonaws.com/tracks/2161/versions/1324.mp3?AWSAccessKeyId=AKIAVRNTQNFKJKL4O7VE&Expires=1666385286&Signature=wttwGVAXq7Nv7S3a8yyt%2FjUEmhc%3D&response-content-disposition=attachment%3Bfilename%3Dtunetank.com_2161_stay-chilled_by_pillowvibes.mp3",
      imageUrl: "https://www.free-stock-music.com/thumbnails/tubebackr-say-nothing.jpg",
    },
    {
      albumId: 1,
      userId: 2,
      title: "Breathe",
      description: "Electric",
      url: "https://tunetank-production.s3.us-west-2.amazonaws.com/tracks/5646/versions/yh58j.mp3?AWSAccessKeyId=AKIAVRNTQNFKJKL4O7VE&Expires=1666385370&Signature=8F7VSH9TwJ3r14F%2BQ0MQ6MZAd1Q%3D&response-content-disposition=attachment%3Bfilename%3Dtunetank.com_5646_breathe_by_cloudsystem.mp3",
      imageUrl: "https://www.free-stock-music.com/thumbnails/tubebackr-keep-me.jpg",
    },
    {
      albumId: 1,
      userId: 3,
      title: "Cozy Cafe",
      description: "Chill",
      url: "https://tunetank-production.s3.us-west-2.amazonaws.com/tracks/3474/versions/2354.mp3?AWSAccessKeyId=AKIAVRNTQNFKJKL4O7VE&Expires=1666385444&Signature=GAkyiq4MBr2Gap8cCgwPsUMVpMY%3D&response-content-disposition=attachment%3Bfilename%3Dtunetank.com_3474_cozy-cafe_by_ahoami.mp3",
      imageUrl: "https://www.free-stock-music.com/thumbnails/peyruis-dance-moves.jpg",
    },
    {
      albumId: 1,
      userId: 4,
      title: "Depth",
      description: "Chill",
      url: "https://tunetank-production.s3.us-west-2.amazonaws.com/tracks/4215/versions/3304.mp3?AWSAccessKeyId=AKIAVRNTQNFKJKL4O7VE&Expires=1666385545&Signature=nhieY9iu181udUbAFONVHlmWpWA%3D&response-content-disposition=attachment%3Bfilename%3Dtunetank.com_4215_depth_by_decibel.mp3",
      imageUrl: "https://www.free-stock-music.com/thumbnails/kv-colors.jpg",
    },
    {
      albumId: 2,
      userId: 1,
      title: "Lazy Bones",
      description: "Hip Hop",
      url: "https://tunetank-production.s3.us-west-2.amazonaws.com/tracks/5423/versions/hreqv.mp3?AWSAccessKeyId=AKIAVRNTQNFKJKL4O7VE&Expires=1666385645&Signature=bS2g1dNh66mXpfiMGNd44xXzs3k%3D&response-content-disposition=attachment%3Bfilename%3Dtunetank.com_5423_lazy-bones_by_vital.mp3",
      imageUrl: "https://www.free-stock-music.com/thumbnails/alexander-nakarada-echo.jpg",
    },
    {
      albumId: 2,
      userId: 2,
      title: "Faceshot",
      description: "Hip Hop",
      url: "https://tunetank-production.s3.us-west-2.amazonaws.com/tracks/4086/versions/3135.mp3?AWSAccessKeyId=AKIAVRNTQNFKJKL4O7VE&Expires=1666385747&Signature=uRhwRKrhEv4ll3MZOAH%2B7N2GM7w%3D&response-content-disposition=attachment%3Bfilename%3Dtunetank.com_4086_faceshot_by_cloudsystem.mp3",
      imageUrl: "https://www.free-stock-music.com/thumbnails/alex-productions-indie-rock-travel-way.jpg",
    },
    {
      albumId: 2,
      userId: 3,
      title: "When Summer Ends",
      description: "Acoustic",
      url: "https://tunetank-production.s3.us-west-2.amazonaws.com/tracks/188/versions/23.mp3?AWSAccessKeyId=AKIAVRNTQNFKJKL4O7VE&Expires=1666385805&Signature=6%2FDl952uv35uLh%2F1v71zQKVhpcc%3D&response-content-disposition=attachment%3Bfilename%3Dtunetank.com_188_when-summer-ends_by_evan-splash.mp3",
      imageUrl: "https://www.free-stock-music.com/thumbnails/the-denotes-let-us-run-for-it.jpg",
    },
    {
      albumId: 2,
      userId: 4,
      title: "Everest",
      description: "Acoustic",
      url: "https://tunetank-production.s3.us-west-2.amazonaws.com/tracks/471/versions/197.mp3?AWSAccessKeyId=AKIAVRNTQNFKJKL4O7VE&Expires=1666385866&Signature=G6k2x0ERWBBsLrkmU49FCaoLq2w%3D&response-content-disposition=attachment%3Bfilename%3Dtunetank.com_471_everest_by_alex-makemusic.mp3",
      imageUrl: "https://www.free-stock-music.com/thumbnails/alexander-nakarada-stoned.jpg",
    },
    {
      albumId: 3,
      userId: 1,
      title: "Such Thing",
      description: "Pop",
      url: "https://tunetank-production.s3.us-west-2.amazonaws.com/tracks/3957/versions/2960.mp3?AWSAccessKeyId=AKIAVRNTQNFKJKL4O7VE&Expires=1666385935&Signature=RX5pwGbqbVxT1xvBcDNGa5RxE8k%3D&response-content-disposition=attachment%3Bfilename%3Dtunetank.com_3957_such-things_by_noisesoul.mp3",
      imageUrl: "https://www.free-stock-music.com/thumbnails/2tech-audio-motivate.jpg",
    },
    {
      albumId: 3,
      userId: 2,
      title: "Calmness",
      description: "Chill",
      url: "https://tunetank-production.s3.us-west-2.amazonaws.com/tracks/5536/versions/bvdj0.mp3?AWSAccessKeyId=AKIAVRNTQNFKJKL4O7VE&Expires=1666385997&Signature=p2AtcEJHg7DdhveZTVuO0MG%2B9Ls%3D&response-content-disposition=attachment%3Bfilename%3Dtunetank.com_5536_calmness_by_isaevilnarmusic.mp3",
      imageUrl: "https://www.free-stock-music.com/thumbnails/mixaund-sunrays.jpg",
    },
    {
      albumId: 3,
      userId: 3,
      title: "Gamer",
      description: "Electric",
      url: "https://tunetank-production.s3.us-west-2.amazonaws.com/tracks/4160/versions/3237.mp3?AWSAccessKeyId=AKIAVRNTQNFKJKL4O7VE&Expires=1666386113&Signature=lYlj4d6gmsS2oeuFnHLKegQBQm8%3D&response-content-disposition=attachment%3Bfilename%3Dtunetank.com_4160_gamer_by_decibel.mp3",
      imageUrl: "https://www.free-stock-music.com/thumbnails/jay-someday-playful.jpg",
    },
    {
      albumId: 3,
      userId: 4,
      title: "5 AM",
      description: "Pop",
      url: "https://tunetank-production.s3.us-west-2.amazonaws.com/tracks/3743/versions/2731.mp3?AWSAccessKeyId=AKIAVRNTQNFKJKL4O7VE&Expires=1666386253&Signature=u9xolw1RPKQes697%2FAeDag1E1e8%3D&response-content-disposition=attachment%3Bfilename%3Dtunetank.com_3743_5-am_by_danyvin.mp3",
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
