import Author from "../model/author.js"
import slugedAuthors from "../data/authorsUrl.js"

export const addAuthor = async (req, res) => {
  try {
    const author = new Author({
      ...req.body,
    })
    const addedAuthor = await author.save()
    res.status(201).send(addedAuthor)
  } catch (error) {
    res.status(500).send(error)
  }
}

export const getAuthor = async (req, res) => {
  try {
    const authors = await Author.find({})

    // compare all authors slug with the slugedAuthors array and return non matching slug from slugedAuthors array
    const author = slugedAuthors.filter(
      (author) => !authors.some((a) => a.slug === author)
    )

    res.status(200).send({
      author,
      authors,
    })
  } catch (error) {
    res.status(500).send(error)
  }
}
