import dotenv from "dotenv"
import { categories, authors } from "./data/index.js"
import blogs from "./data/formattedBlogs.json" assert { type: "json" }

import Category from "./model/categories.js"
import Blog from "./model/blog.js"
import Author from "./model/author.js"
import connectDB from "./config/db.js"

dotenv.config()

connectDB()

const importBlogs = async () => {
  try {
    await Blog.deleteMany()

    blogs.map(async (blog, i) => {
      const author = await Author.findOne({
        name: blog.author,
      }).then(async (author) => {
        const category = await Category.findOne({
          name: blog.category,
        }).then(async (category) => {
          const newCategory = await Blog.create({
            ...blog,
            author: author._id,
            category: category._id,
          })
          await newCategory.save()
          console.log("blog added", i)
        })
      })
    })
    console.log("Data Imported!")
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

const importCategories = async () => {
  try {
    await Category.deleteMany()

    categories.map(async (category, i) => {
      const newCategory = new Category({
        name: category.name,
      })
      await newCategory.save()
      console.log("Data added", i)
    })
    console.log("Data Imported!")
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

const importAuthors = async () => {
  try {
    await Author.deleteMany()

    authors.map(async (author, i) => {
      const newAuthor = new Author({
        ...author,
      })
      await newAuthor.save()
      console.log("Data added", i)
    })
    console.log("Data Imported!")
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Category.deleteMany()
    await Author.deleteMany()
    console.log("Data Destroyed!")
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

const destroyBlogs = async () => {
  try {
    await Blog.deleteMany()
    console.log("Data Destroyed!")
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}
if (process.argv[2] === "--destroy") {
  destroyData()
} else if (process.argv[2] === "--destroyBlogs") {
  destroyBlogs()
} else if (process.argv[2] === "--authors") {
  importAuthors()
} else if (process.argv[2] === "--categories") {
  importCategories()
} else if (process.argv[2] === "--blogs") {
  importBlogs()
}
