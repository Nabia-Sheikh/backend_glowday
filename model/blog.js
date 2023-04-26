import mongoose from "mongoose"
import slug from "mongoose-slug-generator"

mongoose.plugin(slug)

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
    },
    slug: {
      type: String,
      slug: "title",
    },
    summary: {
      type: String,
    },
    body: {
      type: String,
      required: true,
    },
    readTime: {
      type: String,
    },
    author: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    alternateCategory: {
      type: Array,
    },
  },
  { timestamps: true }
)

const Blog = mongoose.model("Blogs", blogSchema)

export default Blog
