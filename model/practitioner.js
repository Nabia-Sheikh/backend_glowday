import mongoose from "mongoose"
import slug from "mongoose-slug-generator"

mongoose.plugin(slug)

const practitionerSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  practitionerSlug: {
    type: String,
    slug: "name",
  },
  profileImageUrl: {
    type: String,
  },
  clinicName: {
    type: String,
  },
  clinicSlug: {
    type: String,
    slug: "clinicName",
  },
  address: {
    type: Object,
  },
  geocode: {
    type: Object,
  },
  practitionerCategoryTreatments: {
    type: Array,
  },
  pageData: {
    type: Object,
  },
  showInSearch: {
    type: Boolean,
  },
  featuredCard: {
    type: Object,
  },
  clinicImages: {
    type: Array,
  },
})

const Practitioner = mongoose.model("Practitioner", practitionerSchema)

export default Practitioner
