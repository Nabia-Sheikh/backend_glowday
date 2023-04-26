import Practitioner from "../model/practitioner.js"
import Clinic from "../model/clinic.js"
import Location from "../model/location.js"
import fs from "fs"

const filePath = "data/searchPagePractitioner.json"

if (fs.existsSync(filePath)) {
  console.log("The file exists")
} else {
  console.log("The file does not exist")
}

const featuredCards = JSON.parse(
  fs.readFileSync(`data/searchPagePractitioner.json`, "utf8")
)

export const getPractitioners = async (req, res) => {
  try {
    const practitioners = await Practitioner.find({})
    res.status(200).send({
      length: practitioners.length,
      practitioners,
    })
  } catch (error) {
    res.status(500).send(error)
  }
}

export const getPractitionerBySlug = async (req, res) => {
  try {
    const clinic = req.query.clinic
    const pract = req.query.practitioner
    const practitioner = await Practitioner.findOne({
      practitionerSlug: pract,
      clinicSlug: clinic,
    })

    if (!practitioner) {
      return res.status(404).send({
        message: "Practitioner not found!",
      })
    }

    res.status(200).send(practitioner)
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: "Something went wrong",
    })
  }
}

export const getSearchPractitioners = async (req, res) => {
  try {
    const filter = req.query.filter || "MOST_RECOMMENDED"
    const page = req.query.page || 1
    const limit = 8
    const skip = (page - 1) * limit

    const practitioners = await Practitioner.find({
      showInSearch: true,
    })

    if (filter === "MOST_RECOMMENDED") {
      practitioners.sort((a, b) => {
        if (!a.featuredCard.reviews) {
          a.featuredCard.reviews = 0
        }
        if (!b.featuredCard.reviews) {
          b.featuredCard.reviews = 0
        }

        const valueA = parseInt(a.featuredCard.reviews)

        const valueB = parseInt(b.featuredCard.reviews)
        const result = valueB - valueA

        return result
      })
    } else if (filter == "BEST_RATED") {
      practitioners.sort((a, b) => {
        if (!a.featuredCard.ratingPercentage) {
          a.featuredCard.ratingPercentage = 0
        }
        if (!b.featuredCard.ratingPercentage) {
          b.featuredCard.ratingPercentage = 0
        }

        const valueA = parseInt(a.featuredCard.ratingPercentage)
        const valueB = parseInt(b.featuredCard.ratingPercentage)

        const result = valueB - valueA

        return result
      })
    }

    // Remove that practitioners from array who's clinicName is same
    const uniquePractitioners = practitioners.filter(
      (practitioner, index, self) =>
        index ===
        self.findIndex(
          (t) =>
            t.clinicName === practitioner.clinicName ||
            t.name === practitioner.name
        )
    )

    const dataToSend = uniquePractitioners.slice(skip, skip + limit)

    res.status(200).send({
      length: uniquePractitioners.length,
      practitioners: dataToSend,
      remaining: uniquePractitioners.length - skip - limit,
      showMore: uniquePractitioners.length > skip + limit,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
}
export const getLevel7Practitioners = async (req, res) => {
  try {
    const page = req.query.page || 1
    const limit = 8
    const skip = (page - 1) * limit

    const practitioners = await Practitioner.find({
      showInSearch: true,
      "featuredCard.Level 7": "Level 7 badge",
    })

    practitioners.sort((a, b) => {
      if (!a.featuredCard.reviews) {
        a.featuredCard.reviews = 0
      }
      if (!b.featuredCard.reviews) {
        b.featuredCard.reviews = 0
      }

      const valueA = parseInt(a.featuredCard.reviews)

      const valueB = parseInt(b.featuredCard.reviews)
      const result = valueB - valueA

      return result
    })

    // Remove that practitioners from array who's clinicName is same
    const uniquePractitioners = practitioners.filter(
      (practitioner, index, self) =>
        index ===
        self.findIndex(
          (t) =>
            t.clinicName === practitioner.clinicName ||
            t.name === practitioner.name
        )
    )

    const dataToSend = uniquePractitioners.slice(skip, skip + limit)

    res.status(200).send({
      length: uniquePractitioners.length,
      practitioners: dataToSend,
      total: uniquePractitioners.length,
      remaining: uniquePractitioners.length - skip - limit,
      showMore: uniquePractitioners.length > skip + limit,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
}

export const handleFeaturedPractitioners = async (req, res) => {
  try {
    // Loop through the practitioners in the database
    const practitioners = await Practitioner.find({})
    for (const practitioner of practitioners) {
      // Check if the practitioner's name appears in the featured cards list
      const featuredCard = featuredCards.find(
        (card) => card.practitioner === practitioner.name
      )
      if (featuredCard) {
        // If the practitioner's name appears in the featured cards list, set showInSearch to true and update the featuredCard property
        practitioner.showInSearch = true
        practitioner.featuredCard = featuredCard
        console.log("showInSearch: true", practitioner.name)
      } else {
        // If the practitioner's name does not appear in the featured cards list, set showInSearch to false and remove the featuredCard property
        practitioner.showInSearch = false
        practitioner.featuredCard = null
        console.log("showInSearch: false", practitioner.name)
      }
      // Save the updated practitioner document to the database
      await practitioner.save()
    }

    res.status(200).send({
      countFeatured,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      error: error.message,
    })
  }
}

export const searchTreatmentPractitioner = async (req, res) => {
  try {
    const filter = req.query.filter || "MOST_RECOMMENDED"
    const page = req.query.page || 1
    const loc = req.query.loc
    const treatment = req.query.treatment
    const limit = 8
    const skip = (page - 1) * limit

    const practitioners = await Practitioner.find({})

    // if (filter === "MOST_RECOMMENDED") {
    //   practitioners.sort((a, b) => {
    //     if (!a.featuredCard.reviews) {
    //       a.featuredCard.reviews = 0
    //     }
    //     if (!b.featuredCard.reviews) {
    //       b.featuredCard.reviews = 0
    //     }

    //     const valueA = parseInt(a.featuredCard.reviews)

    //     const valueB = parseInt(b.featuredCard.reviews)
    //     const result = valueB - valueA

    //     return result
    //   })
    // } else if (filter == "BEST_RATED") {
    //   practitioners.sort((a, b) => {
    //     if (!a.featuredCard.ratingPercentage) {
    //       a.featuredCard.ratingPercentage = 0
    //     }
    //     if (!b.featuredCard.ratingPercentage) {
    //       b.featuredCard.ratingPercentage = 0
    //     }

    //     const valueA = parseInt(a.featuredCard.ratingPercentage)
    //     const valueB = parseInt(b.featuredCard.ratingPercentage)

    //     const result = valueB - valueA

    //     return result
    //   })
    // }

    // Remove that practitioners from array who's clinicName is same
    const uniquePractitioners = practitioners.filter(
      (practitioner, index, self) =>
        index ===
        self.findIndex(
          (t) =>
            t.clinicName === practitioner.clinicName ||
            t.name === practitioner.name
        )
    )

    const filteredData = uniquePractitioners.filter((practitioner) => {
      const location =
        practitioner.address.city + ", " + practitioner.address.county
      // console.log(
      //   practitioner.practitionerCategoryTreatments
      //     .map((t) => t.categoryName)
      //     .map((tr) => tr.toLowerCase().includes(treatment.toLowerCase()))
      // )
      return (
        practitioner.practitionerCategoryTreatments
          .map((t) => t.categoryName)
          .map((tr) => tr.toLowerCase().includes(treatment.toLowerCase())) &&
        location.includes(loc)
      )
    })

    const dataToSend = filteredData.slice(skip, skip + limit)

    res.status(200).send({
      length: filteredData.length,
      practitioners: dataToSend,
      remaining: filteredData.length - skip - limit,
      showMore: filteredData.length > skip + limit,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
}

export const getPractitionersList = async (req, res) => {
  try {
    const name = req.query.name
    const practitioners = await Practitioner.find({
      name: { $regex: new RegExp(name, "i") },
    })
    const filteredPractitioners = practitioners.filter((practitioner) =>
      practitioner.name.toLowerCase().includes(name.toLowerCase())
    )

    const uniquePractitioners = filteredPractitioners.filter(
      (practitioner, index, self) =>
        index ===
        self.findIndex(
          (t) =>
            t.clinicName === practitioner.clinicName ||
            t.name === practitioner.name
        )
    )

    res.status(200).send({
      practitioners: uniquePractitioners,
      length: uniquePractitioners.length,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      error: error.message,
    })
  }
}
export const getClinicsList = async (req, res) => {
  try {
    const name = req.query.name

    const clinics = await Clinic.find({
      "clinicData.name": { $regex: new RegExp(name, "i") },
    })

    // const filteredClinics = clinics.filter((clinic) =>
    //   clinic.clinicData.name.toLowerCase().includes(name.toLowerCase())
    // )

    const uniqueClinics = clinics.filter(
      (clinic, index, self) =>
        index ===
        self.findIndex((t) => t.clinicData.name === clinic.clinicData.name)
    )

    res.status(200).send({
      clinics: uniqueClinics,
      length: uniqueClinics.length,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      error: error.message,
    })
  }
}

export const getLocations = async (req, res) => {
  try {
    const loc = req.query.loc
    const locations = await Location.find({
      location: { $regex: loc, $options: "i" },
    })

    res.status(200).send({
      locations,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      error: error.message,
    })
  }
}

export const addClinicImagesToPractitioners = async (req, res) => {
  try {
    // Search all practitioners with showInSearch set to true and a featuredCard property then loop through them and copy clinicImages from clinic.clinicData.clinicImage array to practitioner.clinicImages array and save the practitioner document to the database
    const practitioners = await Practitioner.find({
      showInSearch: true,
      featuredCard: { $exists: true },
    })

    for (let i = 0; i < practitioners.length; i++) {
      const practitioner = practitioners[i]
      const clinic = await Clinic.findOne({
        "clinicData.name": practitioner.clinicName,
      })
      practitioner.clinicImages = clinic.clinicData.clinicImages

      // Save the updated practitioner document to the database
      await practitioner.save()

      console.log(
        "clinicImages added to practitioner",
        practitioner.name,
        clinic.clinicData.clinicImages[0]
      )
    }

    res.send({
      practitioners: practitioners.length,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      error: error.message,
    })
  }
}

export const addAllPractitionersLocations = async (req, res) => {
  try {
    // Filter all locations from the practitioner documents and add them to the locations array save into Locations collection
    const practitioners = await Practitioner.find({})

    const locationsArray = practitioners.map(
      (practitioner) =>
        practitioner.address.city + ", " + practitioner.address.county
    )

    // Remove duplicates from locations array
    const locations = [...new Set(locationsArray)]

    // Save locations array into Locations collection
    // const newLocations = await Location.insertMany(locations)
    const newLocations = locations.map((location) => {
      const newLocation = new Location({
        location,
      })
      newLocation.save()

      return newLocation
    })

    res.send({
      locations: locations.length,
      locationsArray: locations,
      newLocations,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      error: error.message,
    })
  }
}
