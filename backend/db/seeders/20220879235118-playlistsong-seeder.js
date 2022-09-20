'use strict';

const { Playlist, Song } = require('../models');
const { Op } = require('sequelize');

const playlistSongs = [
  {
    playlist: { name: "Electric" },
    song: { title: "Say Nothing" }
  },
  {
    playlist: { name: "Pop" },
    song: { title: "Destiny" }
  },
  {
    playlist: { name: "Alternative" },
    song: { title: "Stoned" }
  },
]

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
    //  for(let i = 0; i < playlistSongs.length; i++) {
    //   let data = playlistSongs[i];
    //   let playlist =  await Playlist.findOne({ where: data.playlist });
    //   let songs = await Song.findAll({ where: { [Op.or]: data.songs } });
    //   await playlist.addSongs(songs);
    // }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    //  for(let i = 0; i < playlistSongs.length; i++) {
    //   let data = playlistSongs[i];
    //   let playlist =  await Playlist.findOne({ where: data.playlist });
    //   let songs = await Song.findAll({ where: { [Op.or]: data.songs } });
    //   await playlist.removeSongs(songs);
    // }
  }
};
