import { google } from "googleapis"
import nodemailer from "nodemailer"
import bookingEmailFormat from "./bookingEmailFormat.js"
import emailFormat from "./emailFormat.js"
import resetEmailFormat from "./resetEmailFormat.js"

// These id's and secrets should come from .env file.
const CLIENT_ID = process.env.CLIENT_ID
const CLEINT_SECRET = process.env.CLEINT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI
const REFRESH_TOKEN = process.env.REFRESH_TOKEN
const ADMIN_EMAIL = process.env.ADMIN_EMAIL

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
)
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

const sendMail = async (
  bookingDetails,
  email,
  randString,
  username,
  emailFor,
  name
) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken()
    var transport = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        type: "OAuth2",
        user: ADMIN_EMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLEINT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    })

    let htmlMail = ""
    let url = ""
    let title = ""

    if (emailFor == "signup") {
      url = `${process.env.CLIENT_DOMAIN}/customer/verify/${username}/${randString}`
      title = "Verify Your Account"
      htmlMail = emailFormat(username, title, url)
    } else if (emailFor === "booking") {
      title = "Booking Details"
      htmlMail = bookingEmailFormat(bookingDetails, username, title)
    } else {
      // Reset password
      const url = `${process.env.CLIENT_DOMAIN}/reset/${username}/${randString}`
      title = "Reset Your Password"
      htmlMail = resetEmailFormat(name, title, url)
    }

    var mailOptions = {
      from: "| Aesthetics",
      to: email,
      subject: title,
      html: htmlMail,
    }

    transport.sendMail(mailOptions, function (err, resp) {
      if (err) {
        console.log(err)
      } else {
        console.log("Message Sent", resp)
      }
    })
  } catch (err) {
    console.log(err)
  }
}

export default sendMail
