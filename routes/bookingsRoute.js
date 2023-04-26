import {
  addBooking,
  getBookings,
  getCompletedBookings,
} from "../controller/bookingsController.js"
import express from "express"
import verifyLoginMiddleware from "../Middlewares/verifyLogin.middleware.js"
const route = express.Router()

route.post("/", addBooking)
route.get("/", verifyLoginMiddleware, getBookings)
route.get("/completed", verifyLoginMiddleware, getCompletedBookings)

export default route
