import Booking from "../model/bookings.js"
import crypto from "crypto"
import sendMail from "../Utils/sendMail.js"

export const addBooking = async (req, res) => {
  try {
    // Booking ID with prefix of "BID"

    const booking = new Booking({
      ...req.body,
      bookingId: "BID-" + crypto.randomBytes(3).toString("hex").toUpperCase(),
    })
    const addedBooking = await booking.save()
    await sendMail(
      {
        treatments: addedBooking.treatments,
        bookingId: addedBooking.bookingId,
        appointment: addedBooking.appointment,
        practitionerName: addedBooking.practitionerName,
        clinicName: addedBooking.clinicName,
        address: req.body.address,
        profilePic: req.body.profileImageUrl,
      },
      addedBooking.customer.email,
      addedBooking._id,
      addedBooking.customer.firstName,
      "booking"
    )

    res.status(201).send(addedBooking)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
}

export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      "customer.customerId": req.userID,
    }).sort({ createdAt: 1 })
    res.status(200).send(bookings)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
}

export const getCompletedBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      isCompleted: true,
      "customer.customerId": req.userID,
    })
    res.status(200).send(bookings)
  } catch (error) {
    console.log(error)
    res.status(500).send
  }
}
