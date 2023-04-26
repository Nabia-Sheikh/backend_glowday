import mongoose from "mongoose"
import slug from "mongoose-slug-generator"

mongoose.plugin(slug)

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    slug: "name",
  },
  biography: {
    type: String,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  socials: {
    type: Object,
  },
})

const Author = mongoose.model("Author", authorSchema)

export default Author
