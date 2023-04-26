import mongoose from "mongoose"
import slug from "mongoose-slug-generator"

mongoose.plugin(slug)

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    slug: "name",
  },
})

const Categories = mongoose.model("Category", categorySchema)

export default Categories
