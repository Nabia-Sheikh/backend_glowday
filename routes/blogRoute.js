import {
  addBlog,
  getAllBlogs,
  getAuthorBlog,
  getBlog,
  getCategoryBlog,
  deleteDuplicateBlogs,
  getBlogBySlug,
  makeBlogSlug,
  getTopBlogs,
} from "../controller/blogController.js"
import express from "express"
const route = express.Router()

route.post("/", addBlog)
route.delete("/duplicate", deleteDuplicateBlogs)
route.get("/slugify", makeBlogSlug)
route.get("/all", getAllBlogs)
route.get("/top", getTopBlogs)
route.post("/author", getAuthorBlog)
route.post("/category", getCategoryBlog)
route.get("/:slug", getBlogBySlug)
route.get("/", getBlog)

export default route
