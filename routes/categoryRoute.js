import { addCategory, getCategory } from "../controller/categoryController.js"
import express from "express"
const route = express.Router()

route.post("/", addCategory)
route.get("/", getCategory)

export default route
