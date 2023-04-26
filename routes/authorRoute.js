import { addAuthor, getAuthor } from "../controller/authorController.js"
import express from "express"
const route = express.Router()

route.post("/", addAuthor)
route.get("/", getAuthor)

export default route
