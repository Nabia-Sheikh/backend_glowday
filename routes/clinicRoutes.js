import express from "express"
const route = express.Router()
import {
  getClinicBySlug,
  getClinics,
} from "./../controller/clinicController.js"

route.get("/", getClinics)
route.get("/getClinic", getClinicBySlug)

export default route
