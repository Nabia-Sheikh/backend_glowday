import Blog from "../model/blog.js"
import Author from "../model/author.js"
import Category from "../model/categories.js"
import slugify from "slugify"

export const addBlog = async (req, res) => {
  try {
    const blog = new Blog({
      ...req.body,
    })
    const addedBlog = await blog.save()
    res.status(201).send(addedBlog)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
}

export const getAllBlogs = async (req, res) => {
  try {
    const page = req.query.page || 1
    const limit = 8
    const skip = (page - 1) * limit
    // const blogs = await Blog.find().populate("author").skip(skip).limit(limit)

    const blogs = await Blog.aggregate([
      {
        $facet: {
          count: [{ $count: "total" }],
          data: [
            {
              $lookup: {
                from: "authors",
                localField: "author",
                foreignField: "name",
                as: "author",
              },
            },
            {
              $unwind: "$author",
            },
            {
              $lookup: {
                from: "categories",
                localField: "category",
                foreignField: "name",
                as: "category",
              },
            },
            {
              $unwind: "$category",
            },
            {
              $skip: skip,
            },
            {
              $limit: limit,
            },
          ],
        },
      },
    ])

    res.status(200).send(blogs)
  } catch (error) {
    console.log(error)
    res.status(500).send({
      error: error,
    })
  }
}

export const getBlog = async (req, res) => {
  const match = {}
  const sort = {}
  if (req.query.sortBy) {
    const val = req.query.sortBy.split(":")
    sort[val[0]] = val[1] === "desc" ? -1 : 1
  }
  if (req.query.completed) {
    match.completed = req.query.completed === "true"
  }
  try {
    await req.user.populate({
      path: "tasks",
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort,
      },
    })
    res.status(200).send(req.user.tasks)
  } catch (error) {
    res.status(500).send(error)
  }
}

export const deleteDuplicateBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
    const titles = []

    for (const blog of blogs) {
      if (titles.includes(blog.title)) {
        const firstBlog = await Blog.findOne({ title: blog.title })
        if (firstBlog._id !== blog._id) {
          await Blog.deleteOne({ _id: blog._id })
          console.log("blog deleted", blog.title)
        }

        // await Blog.deleteMany({ title: blog.title, _id: { $ne: blog._id } })
      } else {
        titles.push(blog.title)
      }
    }

    res.send({
      msg: "Blogs deleted",
    })
  } catch (error) {
    console.error(error)
  }
}

// Get blog by slug
export const getBlogBySlug = async (req, res) => {
  try {
    // First make sure the slug is valid
    const slug = req.params.slug
    const blog = await Blog.aggregate([
      {
        $match: {
          slug: slug,
        },
      },
      {
        $lookup: {
          from: "authors",
          localField: "author",
          foreignField: "name",
          as: "author",
        },
      },
      {
        $unwind: "$author",
      },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "name",
          as: "category",
        },
      },
      {
        $unwind: "$category",
      },
      {
        $limit: 1,
      },
    ])

    if (!blog || blog.length === 0) {
      return res.status(404).send({
        message: "Blog not found.",
      })
    }

    if (blog) {
      // Also send the related blogs
      const relatedBlogs = await Blog.find({
        category: blog[0].category.name,
      }).limit(6)

      // don't send the current blog in the related blogs
      relatedBlogs.forEach((relatedBlog, index) => {
        if (relatedBlog._id.toString() === blog[0]._id.toString()) {
          relatedBlogs.splice(index, 1)
        }
      })

      // Just send title, slug, image, and category
      const relatedBlogsToSend = relatedBlogs.map((relatedBlog) => {
        return {
          title: relatedBlog.title,
          slug: relatedBlog.slug,
          imgUrl: relatedBlog.imgUrl,
          category: relatedBlog.category,
        }
      })

      blog[0].relatedBlogs = relatedBlogsToSend
    }

    res.send(blog)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
}

// Make every blog title slug
export const makeBlogSlug = async (req, res) => {
  try {
    const blogs = await Blog.find()

    for (const blog of blogs) {
      blog.slug = slugify(blog.title, { lower: true })
      await blog.save()
    }

    res.send({
      msg: "Blogs slugged",
    })
  } catch (error) {
    console.error(error)
  }
}

export const getCategoryBlog = async (req, res) => {
  try {
    const page = req.query.page || 1
    const limit = 20
    const skip = (page - 1) * limit

    const category = await Category.findOne({
      slug: req.body.category,
    })

    if (!category) {
      return res.status(400).send({
        message: "Category not found.",
      })
    }

    //  Get blogs by category and populate author and category also skip and limit the blogs to be sent to the client and also show total number of blogs in the category to be used for pagination. and tell that there's show more or not. do it by aggretate.

    const populatedBlogs = await Blog.aggregate([
      {
        $match: {
          $or: [
            { category: category.name },
            {
              alternateCategory: {
                $in: [
                  category.name,
                  category.name.toLowerCase(),
                  category.slug,
                ],
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "authors",
          localField: "author",
          foreignField: "name",
          as: "author",
        },
      },
      {
        $unwind: "$author",
      },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "name",
          as: "category",
        },
      },
      {
        $unwind: "$category",
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
    ])

    if (populatedBlogs.length === 0) {
      return res.send({
        message: "No blogs found.",
      })
    }

    // Count total blogs in the category
    const totalBlogs = await Blog.countDocuments({
      category: category.name,
    })

    const remainingBlogs = totalBlogs - page * limit

    // Remove body from response
    populatedBlogs.map((blog) => {
      delete blog.body
    })

    // const populatedBlogs = await Blog.populate(author, { path: "blogs" })

    res.send({
      blogs: populatedBlogs,
      category: category.name,
      totalBlogs,
      remainingBlogs,
      showMore: remainingBlogs > 0 ? true : false,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
}

export const getAuthorBlog = async (req, res) => {
  try {
    const page = req.query.page || 1
    const limit = 8
    const skip = (page - 1) * limit
    const authorSlug = req.body.author

    const author = await Author.findOne({
      slug: authorSlug,
    })

    if (!author) {
      return res.status(400).send({
        message: "Author not found.",
      })
    }

    const populatedBlogs = await Blog.aggregate([
      {
        $match: {
          author: author.name,
        },
      },
      {
        $lookup: {
          from: "authors",
          localField: "author",
          foreignField: "name",
          as: "author",
        },
      },
      {
        $unwind: "$author",
      },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "name",
          as: "category",
        },
      },
      {
        $unwind: "$category",
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
    ])

    if (populatedBlogs.length === 0) {
      return res.send({
        message: "No blogs found.",
      })
    }

    // Count total blogs in the category
    const totalBlogs = await Blog.countDocuments({
      author: author.name,
    })

    const remainingBlogs = totalBlogs - page * limit

    // Remove body from response
    populatedBlogs.map((blog) => {
      delete blog.body
    })

    res.send({
      blogs: populatedBlogs,
      author: author.name,
      totalBlogs,
      remainingBlogs,
      showMore: remainingBlogs > 0 ? true : false,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
}

export const getTopBlogs = async (req, res) => {
  try {
    const limit = 25
    // const blogs = await Blog.find().populate("author").skip(skip).limit(limit)

    const blogs = await Blog.aggregate([
      {
        $facet: {
          data: [
            {
              $lookup: {
                from: "authors",
                localField: "author",
                foreignField: "name",
                as: "author",
              },
            },
            {
              $unwind: "$author",
            },
            {
              $lookup: {
                from: "categories",
                localField: "category",
                foreignField: "name",
                as: "category",
              },
            },
            {
              $unwind: "$category",
            },
            // {
            //   $skip: skip,
            // },
            {
              $limit: limit,
            },
          ],
        },
      },
    ])

    res.status(200).send({ blogs })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      error: error,
    })
  }
}
