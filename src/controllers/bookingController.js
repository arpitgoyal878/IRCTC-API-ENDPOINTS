const { sequelize } = require('../config/database.js');
const Booking = require('../models/bookingModel');
const Train = require('../models/trainModel');

// Book Seat Function
const bookSeat = async (req, res) => {
  // Expecting trainId in the request body
  const { trainId } = req.body;


  // Assuming req.user is set by auth middleware and contains userId
  const userId = req.user.id;
  console.log(userId);


  if (!trainId) {
    return res.status(400).json({ message: "Missing required field: trainId" });
  }
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized: User not logged in" });
  }

  try {
    // Find the train by its primary key (trainId)
    const train = await Train.findByPk(trainId);
    if (!train) {
      return res.status(404).json({ message: "Train not found" });
    }
    if (train.availableSeats <= 0) {
      return res.status(400).json({ message: "No seats available" });
    }

    // Use a transaction to ensure atomicity of the booking process
    try {
      await sequelize.transaction(async (t) => {
        // Lock the train row for update within the transaction
        const updatedTrain = await Train.findByPk(trainId, {
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
        if (!updatedTrain || updatedTrain.availableSeats <= 0) {
          throw new Error("Race Condition: No seats left");
        }

        // Decrement availableSeats by one
        await updatedTrain.update(
          { availableSeats: updatedTrain.availableSeats - 1 },
          { transaction: t }
        );

        // Create a new booking record with status 'confirmed'
        await Booking.create(
          { userId, trainId, status: 'confirmed' },
          { transaction: t }
        );
      });
    } catch (error) {
      if (error instanceof Error && error.message.includes('deadlock')) {
        return res.status(409).json({ message: "Please try again" });
      }
      throw error;
    }

    res.json({ message: "Booking successful" });
  } catch (error) {
    console.error("Error booking train:", error.message);
    if (error.message === "Race Condition: No seats left") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "An error occurred during booking" });
  }
};

// Get Booking Function
const getBooking = async (req, res) => {
  // Expecting bookingId as a URL parameter
  const { id: bookingId } = req.params;
  const userId = req.user.id;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized: User not logged in" });
  }

  try {
    // Find a seat booking that matches the bookingId and belongs to the logged-in user; include the related Train details
    const booking = await Booking.findOne({
      where: { bookingId, userId },
      include: Train,
    });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json({ booking });
  } catch (error) {
    console.error("Error fetching booking:", error.message);
    res.status(500).json({ message: "Error fetching booking" });
  }
};

module.exports = { bookSeat, getBooking };
