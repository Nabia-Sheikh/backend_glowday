import Clinic from "../model/clinic.js"

export const getClinics = async (req, res) => {
  try {
    const clinics = await Clinic.find({})
    res.status(200).send(clinics)
  } catch (error) {
    res.status(500).send(error)
  }
}

// Get clinic by slug
export const getClinicBySlug = async (req, res) => {
  try {
    const slug = req.query.name
    const clinic = await Clinic.findOne({
      "clinicData.slug": slug,
    })

    if (!clinic) {
      return res.status(404).send({
        message: "Clinic not found",
      })
    }

    res.status(200).send(clinic)
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: "Something went wrong",
    })
  }
}
