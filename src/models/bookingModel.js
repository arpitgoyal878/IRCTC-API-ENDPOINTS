const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/database.js'); // Import Sequelize instance

class Booking extends Model {}

Booking.init(
  {
    bookingId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      validate: {
        max: 1000000,
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'userId',
      },
    },
    trainId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'trains',
        key: 'trainId',
      },
    },
    status: {
      type: DataTypes.ENUM('confirmed', 'cancelled', 'pending'),
      defaultValue: 'confirmed',
    },
  },
  {
    sequelize,
    modelName: 'Booking',
    tableName: 'bookings',
    timestamps: true,
  }
);

module.exports = Booking;