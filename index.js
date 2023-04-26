import express from "express"
import connectDB from "./config/db.js"
import blogRoutes from "./routes/blogRoute.js"
import authorRoutes from "./routes/authorRoute.js"
import categoryRoutes from "./routes/categoryRoute.js"
import userRoutes from "./routes/user.route.js"
import practitionerRoutes from "./routes/practitionerRoute.js"
import clinicRoutes from "./routes/clinicRoutes.js"
import bookingRoutes from "./routes/bookingsRoute.js"
const app = express()
import cors from "cors"

app.use(cors())

// Connect to MongoDB
connectDB()

// Middleware
app.use(express.json())

// Routes
app.use("/api/blogs", blogRoutes)
app.use("/api/author", authorRoutes)
app.use("/api/category", categoryRoutes)
app.use("/api/user", userRoutes)
app.use("/api/practitioners", practitionerRoutes)
app.use("/api/clinics", clinicRoutes)
app.use("/api/bookings", bookingRoutes)

// Handle Wild Card.
app.use((req, res, next) => {
  res.status(404).send({
    error: "Endpoint not found!",
  })
})

// Server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
