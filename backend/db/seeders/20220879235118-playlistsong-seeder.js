'use strict';

const { Playlist, Song } = require('../models');
const { Op } = require('sequelize');

const playlistSongs = [
  {
    playlist: { name: "Summer Hits" },
    song: { title: "Don't Start Now" }
  },
  {
    playlist: { name: "Classics" },
    song: { title: "Larger Than Life" }
  },
  {
    playlist: { name: "Party" },
    song: { title: "Rebel Without A Pause" }
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
    //   const data = playlistSongs[i];
    //   const playlist =  await Playlist.findOne({ where: data.playlist });
    //   const songs = await Song.findAll({ where: { [Op.or]: data.songs } });
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
    //   const data = playlistSongs[i];
    //   const playlist =  await Playlist.findOne({ where: data.playlist });
    //   const songs = await Song.findAll({ where: { [Op.or]: data.songs } });
    //   await playlist.removeSongs(songs);
    // }
  }
};
