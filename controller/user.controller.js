// External Import
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
// Internal Import
import userModel from "../model/user.js"
import sendMail from "../Utils/sendMail.js"
import uniqueString from "../Utils/uniqueString.js"

// User View
export const userView = (userType) => {
  return async (req, res) => {
    try {
      const existUser = await userModel.findOne({
        _id: req.userID,
      })
      if (existUser) {
        let sendableUser = existUser
        sendableUser["password"] = ""
        sendableUser["randString"] = ""
        res.status(200).json({
          result: sendableUser,
          message: "Successfully Viewed User Profile",
        })
      }
    } catch (err) {
      // console.log(err)
      res.status(500).json({
        message: "Server Error",
      })
    }
  }
}

// User Register
export const userRegister = () => {
  return async (req, res) => {
    try {
      const existUser = await userModel.findOne({
        $or: [
          {
            email: req.body.email.toLowerCase(),
          },
        ],
      })
      if (!existUser) {
        const hashedPass = await bcrypt.hash(req.body.password, 5)
        const randString = uniqueString()
        const newUser = await userModel({
          ...req.body,
          randString: randString,
          password: hashedPass,
        })
        await newUser.save()
        // sendMail(
        //   req.body.email,
        //   randString,
        //   req.body.username,
        //   "signup",
        //   userType
        // );
        res.status(200).json({
          user: newUser,
          message: `Successfully Registered.`,
        })
      } else {
        res.status(400).json({
          message: "Already Registered with this Email",
        })
      }
    } catch (err) {
      res.status(500).json({
        message: "Server Error",
        err: err,
      })
    }
  }
}

// User Login
export const userLogin = (userType) => {
  return async (req, res) => {
    try {
      const { email } = req.body

      const existUser = await userModel.findOne({
        email: email.toLowerCase(),
      })
      if (existUser) {
        const isValidPass = await bcrypt.compare(
          req.body.password,
          existUser.password
        )
        if (isValidPass) {
          const token = jwt.sign(
            {
              email: existUser.email,
              userID: existUser._id,
            },
            process.env.JWT_TOKEN
            // {
            //   expiresIn: "15d",
            // }
          )
          res.status(200).json({
            token: token,
            message: "Succesfully Logged In",
          })
        } else {
          res.status(401).json({
            message: "Invalid Password",
          })
        }
      } else {
        res.status(404).json({
          message: "User Not Found",
        })
      }
    } catch (err) {
      // console.log(err)
      res.status(500).json({
        message: "Server Error",
      })
    }
  }
}

export const userGoogleLogin = (userType) => {
  return async (req, res) => {
    try {
      const { email, firstName, lastName } = req.body
      const existUser = await userModel.findOne({
        email: email.toLowerCase(),
      })
      if (existUser) {
        const token = jwt.sign(
          {
            email: existUser.email,
            userID: existUser._id,
          },
          process.env.JWT_TOKEN
          // {
          //   expiresIn: "15d",
          // }
        )
        res.status(200).json({
          token: token,
          message: "Succesfully Logged In",
        })
      } else {
        const newUser = await userModel({
          email: email.toLowerCase(),
          firstName: firstName,
          lastName: lastName,
          isGoogle: true,
        })
        await newUser.save()
        const token = jwt.sign(
          {
            email: newUser.email,
            userID: newUser._id,
          },
          process.env.JWT_TOKEN
          // {
          //   expiresIn: "15d",
          // }
        )
        res.status(200).json({
          token: token,
          message: "Succesfully Logged In",
        })
      }
    } catch (err) {
      console.log(err)
      res.status(500).json({
        message: "Server Error",
      })
    }
  }
}

export const userFacebookLogin = (userType) => {
  return async (req, res) => {
    try {
      const { email, firstName, lastName } = req.body
      const existUser = await userModel.findOne({
        email: email.toLowerCase(),
      })
      if (existUser) {
        const token = jwt.sign(
          {
            email: existUser.email,
            userID: existUser._id,
          },
          process.env.JWT_TOKEN
          // {
          //   expiresIn: "15d",
          // }
        )
        res.status(200).json({
          token: token,
          message: "Succesfully Logged In",
        })
      } else {
        const newUser = await userModel({
          email: email.toLowerCase(),
          firstName: firstName,
          lastName: lastName,
          isFacebook: true,
        })
        await newUser.save()
        const token = jwt.sign(
          {
            email: newUser.email,
            userID: newUser._id,
          },
          process.env.JWT_TOKEN
          // {
          //   expiresIn: "15d",
          // }
        )
        res.status(200).json({
          token: token,
          message: "Succesfully Logged In",
        })
      }
    } catch (err) {
      console.log(err)
      res.status(500).json({
        message: "Server Error",
      })
    }
  }
}

// User Email Verify
export const userEmailVerify = (userType) => {
  return async (req, res) => {
    try {
      const { username, randString } = req.params
      const existUser = await userModel.findOne({
        username: username,
        randString: randString,
        role: userType,
      })
      const existUserAlreadyVerified = await userModel.findOne({
        username: username,
        role: userType,
      })
      if (
        existUserAlreadyVerified &&
        existUserAlreadyVerified.verified == true
      ) {
        res.status(200).json({
          message: "Congratulation! Your email is already Verified.",
        })
      } else if (existUser) {
        await userModel.updateOne(
          { randString: randString, role: userType },
          { $set: { verified: true, active: true, randString: uniqueString() } }
        )
        res.status(200).json({
          message: "Successfully Verified Email",
        })
      } else {
        res.status(200).json({
          message:
            "Wrong Verify Token Or UserID. Please Check your mail and try again.",
        })
      }
    } catch (err) {
      // console.log(err)
      res.status(500).json({
        message: "Server Error",
      })
    }
  }
}

// User Update User
// export const userUpdate = async (req, res, userType) => {
//   try {
//     const existUser = await userModel.findOne({
//       _id: req.userID,
//       role: userType,
//     });
//     if (existUser) {
//       if (
//         existUser.phone == req.body.phone ||
//         existUser.facebook == req.body.phone
//       ) {
//         res.status(200).json({
//           message: "Facebook ID & Phone Has To Be Unique",
//         });
//       } else {
//         await userModel.updateOne(
//           { _id: req.userID, role: userType },
//           {
//             $set: { ...req.body, updated_at: Date.now() },
//             $push: {
//               notifications: {
//                 text: "Successfully updated your profile.",
//                 status: "unread",
//               },
//             },
//           }
//         );
//         res.status(200).json({
//           message: "Succesfully Updated User",
//         });
//       }
//     } else {
//       res.status(200).json({
//         message: "User Not Found",
//       });
//     }
//   } catch (err) {
//     // console.log(err)
//     res.status(500).json({
//       message: "Server Error",
//     });
//   }
// };

// User Change Password
export const userPassChange = (userType) => {
  return async (req, res) => {
    try {
      const existUser = await userModel.findOne({
        _id: req.userID,
        role: userType,
      })
      if (existUser) {
        const isOldPassword = await bcrypt.compare(
          req.body.oldPassword,
          existUser.password
        )
        if (isOldPassword) {
          const newHashedPass = await bcrypt.hash(req.body.newPassword, 5)
          await userModel.updateOne(
            { _id: req.userID, role: userType },
            {
              $set: {
                password: newHashedPass,
              },
            }
          )
          res.status(200).json({
            message: "Succesfully Changed Password",
          })
        } else {
          res.status(200).json({
            message: "Did not matched your old password",
          })
        }
      } else {
        res.status(200).json({
          message: "User Not Found",
        })
      }
    } catch (err) {
      // console.log(err)
      res.status(500).json({
        message: "Server Error",
      })
    }
  }
}

// User Forgot Password
export const userForgotPassword = (userType) => {
  return async (req, res) => {
    try {
      const existUser = await userModel.findOne({
        email: req.body.email.toLowerCase(),
      })
      if (existUser) {
        const randString = uniqueString()
        await userModel.updateOne(
          { _id: existUser._id },
          { $set: { randString: randString } }
        )

        await sendMail(
          null,
          existUser.email,
          randString,
          existUser._id.toString(),
          "resetPass",
          existUser.firstName + " " + existUser.lastName
        )
        res.status(200).json({
          message:
            "Please Check Your Email For Reset Password Link. If you don't see the email in your inbox, please check your spam folder.",
        })
      } else {
        res.status(400).json({
          message: "User Not Found",
        })
      }
    } catch (err) {
      // console.log(err)
      res.status(500).json({
        message: "Server Error",
      })
    }
  }
}

// User Valid Randing Check
export const userRandStringCheck = (userType) => {
  return async (req, res) => {
    // console.log(req.params)
    try {
      const { randString } = req.params
      const existUser = await userModel.findOne({
        randString: randString,
        role: userType,
      })
      if (existUser) {
        res.status(200).json({
          message: "Correct Random String",
        })
      } else {
        res.status(400).json({
          message: "Wrong Token :3",
        })
      }
    } catch (err) {
      // console.log(err)
      res.status(500).json({
        message: "Server Error",
      })
    }
  }
}

// User Reset Password
export const userResetPassword = (userType) => {
  return async (req, res) => {
    try {
      const { randString } = req.params
      const existUser = await userModel.findOne({
        randString: randString,
      })
      if (existUser) {
        const hashedPass = await bcrypt.hash(req.body.newPassword, 5)
        await userModel.updateOne(
          { randString: randString, role: userType },
          {
            $set: {
              password: hashedPass,
              randString: uniqueString(),
            },
          }
        )
        res.status(200).json({
          message: "Succesfully Reset Password",
        })
      } else {
        res.status(400).json({
          message: "Wrong Token :3",
        })
      }
    } catch (err) {
      // console.log(err)
      res.status(500).json({
        message: "Server Error",
      })
    }
  }
}

// User Delete
export const userDelete = (userType) => {
  return async (req, res) => {
    try {
      const existUser = await userModel.findOne({
        _id: req.userID,
        role: userType,
      })
      if (existUser) {
        const passwordMatched = await bcrypt.compare(
          req.body.password,
          existUser.password
        )
        if (passwordMatched) {
          await userModel.deleteOne({ _id: req.userID, role: userType })
          res.status(200).json({
            message: "Succesfully Deleted User",
          })
        } else {
          res.status(200).json({
            message: "Wrong Password",
          })
        }
      } else {
        res.status(200).json({
          message: "User Not Found",
        })
      }
    } catch (err) {
      // console.log(err)
      res.status(500).json({
        message: "Server Error",
      })
    }
  }
}
