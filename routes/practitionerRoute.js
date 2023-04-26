import express from "express"
const route = express.Router()
import {
  addAllPractitionersLocations,
  addClinicImagesToPractitioners,
  getClinicsList,
  getLevel7Practitioners,
  getLocations,
  getPractitionerBySlug,
  getPractitioners,
  getPractitionersList,
  getSearchPractitioners,
  handleFeaturedPractitioners,
  searchTreatmentPractitioner,
} from "./../controller/practitionerController.js"

route.get("/", getPractitioners)
route.get("/getpractitioner", getPractitionerBySlug)
route.get("/search", getSearchPractitioners)
route.get("/level7", getLevel7Practitioners)
route.get("/geolocation", getLocations)
route.get("/searchTreatments", searchTreatmentPractitioner)
route.get("/searchPractitioners", getPractitionersList)
route.get("/searchClinics", getClinicsList)

// Development
route.patch("/featured", handleFeaturedPractitioners)
route.patch("/clinicImages", addClinicImagesToPractitioners)
route.patch("/addLocations", addAllPractitionersLocations)

export default route
