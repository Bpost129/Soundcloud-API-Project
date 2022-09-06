'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Playlist.belongsTo(models.User, { foreignKey: 'userId' });
      Playlist.belongsToMany(models.Song, { through: models.PlaylistSong });
      Playlist.hasMany(models.Song, { through: models.PlaylistSong, foreignKey: 'playlistId', otherKey: 'songId' });
    }
  }
  Playlist.init({
    // id: {
    //   type: DataTypes.INTEGER,
    //   primaryKey: true
    // },
    userId: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    imageUrl: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Playlist',
  });
  return Playlist;
};