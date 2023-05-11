const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videogame', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING(10000),
    },
    releaseDate: {
      type: DataTypes.INTEGER,
    },
    rating: {
      type: DataTypes.INTEGER,
    },
  }, { timestamps: false });
};


/* 
{
  name:"string",
  background_image:"url",
  description:"string",
  released:"date",  
  rating: number,
  videoGamePPlatformID: number,
  videoGamePlatformID: number,
  genresID: number
  parent_platforms:[{
    id,
    name,
    logo(se lo agrego a la bd si no tiene)
  },{},{},{}],
  platforms: [{
    id,
    name,
    games_count,
    image_background
  },{},{},{}],
  genres: [{
    id,
    name,
    games_count,
    image_background
  },{},{}]
}
*/