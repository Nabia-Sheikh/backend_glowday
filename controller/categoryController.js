import Category from "../model/categories.js"

export const addCategory = async (req, res) => {
  try {
    const { name } = req.body
    if (!name) {
      return res.status(400).json({
        message: "Category name is required.",
      })
    }

    const category = new Category({
      name,
    })
    const addedCategory = await category.save()
    res.status(201).send(addedCategory)
  } catch (error) {
    res.status(500).send(error)
  }
}

export const getCategory = async (req, res) => {
  try {
    const categories = await Category.find()

    // Sort by name
    categories.sort((a, b) => {
      if (a.name < b.name) {
        return -1
      }
      if (a.name > b.name) {
        return 1
      }
      return 0
    })

    res.status(200).send(categories)
  } catch (error) {
    res.status(500).send(error)
  }
}
