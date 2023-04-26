import mongoose from "mongoose"
import slug from "mongoose-slug-generator"

mongoose.plugin(slug)

// {
//       appointment: {
//         date: selectedDate,
//         time: selectedTime,
//       },
//       clinicSlug: practitioner.clinicSlug,
//       clinicName: practitioner.clinicName,
//       practitionerSlug: practitioner.practitionerSlug,
//       practitionerName: practitioner.name,
//       practitionerId: practitioner._id,
//       customer: {
//         name: "John Doe",
//         email: "abc@gmail.com",
//         customedId: "123456",
//       },
//       customerComments: "I am a customer",
//       treatments: treatmentArray,
//     }

const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
  },
  appointment: {
    type: Object,
  },
  clinicSlug: {
    type: String,
  },
  clinicName: {
    type: String,
  },
  practitionerSlug: {
    type: String,
  },
  practitionerName: {
    type: String,
  },
  practitionerId: {
    type: String,
  },
  customer: {
    type: Object,
  },
  customerComments: {
    type: String,
  },
  treatments: {
    type: Array,
  },
  totalAmount: {
    type: Number,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  isCancelled: {
    type: Boolean,
    default: false,
  },
})

const Booking = mongoose.model("Booking", bookingSchema)

export default Booking
