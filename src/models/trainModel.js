const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/database.js'); // Import Sequelize instance

class Train extends Model {}

Train.init(
  {
    trainId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      validate: {
        max: 1000000,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    source: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    destination: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalSeats: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    availableSeats: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Train',
    tableName: 'trains',
    timestamps: true,
  }
);

module.exports = Train;