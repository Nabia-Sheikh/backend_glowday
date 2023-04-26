import mongoose from "mongoose"
import slug from "mongoose-slug-generator"

mongoose.plugin(slug)

const locationSchema = new mongoose.Schema({
  location: {
    type: String,
  },
})

const Location = mongoose.model("Location", locationSchema)

export default Location
