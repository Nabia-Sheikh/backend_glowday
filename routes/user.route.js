// External Module
import express from "express"
// Internal Module
import {
  userView,
  userRegister,
  userLogin,
  userEmailVerify,
  userPassChange,
  userForgotPassword,
  userRandStringCheck,
  userResetPassword,
  userDelete,
  userGoogleLogin,
  userFacebookLogin,
} from "../controller/user.controller.js"
import verifyLoginMiddleware from "../Middlewares/verifyLogin.middleware.js"

// Router Init
const userRoute = express.Router()

// All Student Routes

// User View
userRoute.get("/view", verifyLoginMiddleware, userView())

// User Register
userRoute.post("/register", userRegister())

// User Login
userRoute.post("/login", userLogin())
userRoute.post("/google", userGoogleLogin())
userRoute.post("/facebook", userFacebookLogin())

// User Email Verify
userRoute.post("/verify-email/:id/:randString", userEmailVerify())

// User Change Pass
userRoute.post("/change-pass", verifyLoginMiddleware, userPassChange())

// User Forgot Pass
userRoute.post("/forgot-pass", userForgotPassword())

// User Random String Check
userRoute.post("/check-string/:id/:randString", userRandStringCheck())

// User Reset Password
userRoute.post("/reset-pass/:id/:randString", userResetPassword())

// User Delete User
userRoute.post("/delete-user", verifyLoginMiddleware, userDelete())

export default userRoute
