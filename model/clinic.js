import mongoose from "mongoose"
import slug from "mongoose-slug-generator"

mongoose.plugin(slug)

const clinicSchema = new mongoose.Schema({
  clinicData: {
    type: Object,
  },
  practitioners: {
    type: Array,
  },
  mainContent: {
    type: Object,
  },
})

const Clinic = mongoose.model("Clinic", clinicSchema)

export default Clinic
