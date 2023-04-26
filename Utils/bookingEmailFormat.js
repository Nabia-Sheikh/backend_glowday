const bookingEmailFormat = (bookingDetails, username, title) => {
  const groupedTreatments = bookingDetails?.treatments.reduce((acc, curr) => {
    const category = curr.treatmentCategoryName
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push({
      treatmentName: curr.treatmentName,
      price: curr.price,
    })
    return acc
  }, {})

  let emailBody = ""
  Object.entries(groupedTreatments).map(([category, treatments]) => {
    emailBody += `<tr style="border-top: 1px solid #f4f4f4">
                 <td colspan="4">
                  <p style="margin-bottom: 0; color: #282727; font-weight: bold;">
                   ${category}
                  </p>
                 </td>
                </tr>`
    treatments.map((treatment) => {
      emailBody += `<tr style="border-bottom: 1px solid #f4f4f4">
                 <td colspan="2">
                  <p style="margin-top: 0">
                   ${treatment.treatmentName}
                  </p>
                 </td>
                 <td colspan="2" style="text-align: right; color: #282727; font-size: 18px;">
£${treatment.price}
</td>
</tr>`
    })
  })

  return `<html xmlns="http://www.w3.org/1999/xhtml">
  
  <head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0;">
    <meta name="format-detection" content="telephone=no" />
  
    <style>
      /* Reset styles */
      body {
        margin: 0;
        padding: 0;
        min-width: 100%;
        width: 100% !important;
        height: 100% !important;
      }
  
      body,
      table,
      td,
      div,
      p,
      a {
        -webkit-font-smoothing: antialiased;
        text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        line-height: 100%;
      }
  
      table,
      td {
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
        border-collapse: collapse !important;
        border-spacing: 0;
      }
  
      img {
        border: 0;
        line-height: 100%;
        outline: none;
        text-decoration: none;
        -ms-interpolation-mode: bicubic;
      }
  
      #outlook a {
        padding: 0;
      }
  
      .ReadMsgBody {
        width: 100%;
      }
  
      .ExternalClass {
        width: 100%;
      }
  
      .ExternalClass,
      .ExternalClass p,
      .ExternalClass span,
      .ExternalClass font,
      .ExternalClass td,
      .ExternalClass div {
        line-height: 100%;
      }
  
      @media all and (min-width: 560px) {
        body {
          margin-top: 30px;
        }
      }
      
      /* Rounded corners */
      @media all and (min-width: 560px) {
        .container {
          border-radius: 8px;
          -webkit-border-radius: 8px;
          -moz-border-radius: 8px;
          -khtml-border-radius: 8px;
        }
      }
      /* Links */
      a,
      a:hover {
        color: #127DB3;
      }
  
      .footer a,
      .footer a:hover {
        color: #999999;
      }
    </style>
    <title>${title}</title>
  
  </head>
  
  <body topmargin="0" rightmargin="0" bottommargin="0" leftmargin="0" marginwidth="0" marginheight="0" width="100%" style="border-collapse: collapse; border-spacing: 0;  padding: 0; width: 100%; height: 100%; -webkit-font-smoothing: antialiased; text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; line-height: 100%;
      
      color: #000000;"  text="#000000">
   <div style="word-spacing: normal">
  <div>
    <span class="im">
      <div style="margin: 0px auto; max-width: 600px">
        <table
          align="center"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="width: 100%"
        >
          <tbody>
            <tr>
              <td
                style="
                  direction: ltr;
                  font-size: 0px;
                  padding: 20px 0;
                  padding-bottom: 0;
                  padding-top: 0;
                  text-align: center;
                "
              >
                <div
                  class="m_-4042900081490989051mj-column-per-100"
                  style="
                    font-size: 0px;
                    text-align: left;
                    direction: ltr;
                    display: inline-block;
                    vertical-align: top;
                    width: 100%;
                  "
                >
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    style="vertical-align: top"
                    width="100%"
                  >
                    <tbody>
                      <tr>
                        <td
                          align="left"
                          style="
                            font-size: 0px;
                            padding: 10px 25px;
                            padding-bottom: 0;
                            word-break: break-word;
                          "
                        >
                          <div
                            style="
                              font-family: proxima-nova, open sans, Helvetica,
                                sans-serif;
                              font-size: 12px;
                              line-height: 1;
                              text-align: left;
                              color: #606060;
                            "
                          >
                            You're booked in! Save time in clinic by completing
                            your forms now.
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td
                          align="center"
                          style="
                            font-size: 0px;
                            padding: 10px 25px;
                            word-break: break-word;
                          "
                        >
                          <p
                            style="
                              border-top: solid 1px #f4f4f4;
                              font-size: 1px;
                              margin: 0px auto;
                              width: 100%;
                            "
                          ></p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style="margin: 0px auto; max-width: 600px">
        <table
          align="center"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="width: 100%"
        >
          <tbody>
            <tr>
              <td
                style="
                  direction: ltr;
                  font-size: 0px;
                  padding: 20px 0;
                  text-align: center;
                "
              >
                <div
                  class="m_-4042900081490989051mj-column-per-85"
                  style="
                    font-size: 0px;
                    text-align: left;
                    direction: ltr;
                    display: inline-block;
                    vertical-align: top;
                    width: 100%;
                  "
                >
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    style="vertical-align: top"
                    width="100%"
                  >
                    <tbody>
                      <tr>
                        <td
                          align="center"
                          style="
                            font-size: 0px;
                            padding: 10px 25px;
                            word-break: break-word;
                          "
                        >
                          <div
                            style="
                              font-family: proxima-nova, open sans, Helvetica,
                                sans-serif;
                              font-size: 24px;
                              font-weight: bold;
                              line-height: 30px;
                              text-align: center;
                              color: #282727;
                            "
                          >
                            Get Ready, <span class="il">Glow</span>!
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td
                          align="center"
                          style="
                            font-size: 0px;
                            padding: 10px 25px;
                            word-break: break-word;
                          "
                        >
                          <div
                            style="
                              font-family: proxima-nova, open sans, Helvetica,
                                sans-serif;
                              font-size: 24px;
                              font-weight: bold;
                              line-height: 30px;
                              text-align: center;
                              color: #282727;
                            "
                          >
                            You're booked in...now fill in your forms!
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </span>
    <div style="margin: 0px auto; max-width: 600px">
      <table
        align="center"
        border="0"
        cellpadding="0"
        cellspacing="0"
        role="presentation"
        style="width: 100%"
      >
        <tbody>
          <tr>
            <td
              style="
                direction: ltr;
                font-size: 0px;
                padding: 0 10px;
                text-align: center;
              "
            >
              <div
                class="m_-4042900081490989051mj-column-per-100"
                style="
                  font-size: 0px;
                  text-align: left;
                  direction: ltr;
                  display: inline-block;
                  vertical-align: top;
                  width: 100%;
                "
              >
                <table
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                  style="vertical-align: top"
                  width="100%"
                >
                  <tbody>
                    <tr>
                      <td
                        align="left"
                        style="
                          font-size: 0px;
                          padding: 10px 25px;
                          padding-top: 20px;
                          padding-left: 15px;
                          word-break: break-word;
                        "
                      >
                        <div
                          style="
                            font-family: Ubuntu, Helvetica, Arial, sans-serif;
                            font-size: 20px;
                            font-weight: bold;
                            line-height: 1;
                            text-align: left;
                            color: #000000;
                          "
                        >
                          Your Booking
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td
                        align="left"
                        style="
                          font-size: 0px;
                          padding: 10px 25px;
                          padding-top: 10px;
                          padding-left: 0;
                          word-break: break-word;
                        "
                      >
                        <table
                          cellpadding="15"
                          cellspacing="0"
                          width="100%"
                          border="0"
                          style="
                            color: #000000;
                            font-family: proxima-nova, Helvetica, sans-serif;
                            font-size: 13px;
                            line-height: 22px;
                            table-layout: fixed;
                            width: 100%;
                            border: none;
                          "
                        >
                          <tbody>
                            <tr
                              style="
                                border-bottom: 1px solid #f4f4f4;
                                border-top: 1px solid #f4f4f4;
                              "
                            >
                              <td
                                style="
                                  text-align: left;
                                  font-size: 14px;
                                  color: #282727;
                                  font-family: proxima-nova, open sans,
                                    Helvetica, sans-serif;
                                "
                                colspan="2"
                              >
                                Booking Reference
                              </td>
                              <td
                                colspan="2"
                                style="
                                  text-align: right;
                                  color: #282727;
                                  font-family: proxima-nova, open sans,
                                    Helvetica, sans-serif;
                                  font-size: 18px;
                                "
                              >
                                ${bookingDetails?.bookingId}
                              </td>
                            </tr>
                            <tr
                              style="
                                border-bottom: 1px solid #f4f4f4;
                                border-top: 1px solid #f4f4f4;
                              "
                            >
                              <td
                                style="
                                  font-size: 16px;
                                  color: #282727;
                                  font-weight: bold;
                                  font-family: proxima-nova, open sans,
                                    Helvetica, sans-serif;
                                "
                                colspan="4"
                              >
                                <p>Your Treatments</p>
                              </td>
                            </tr>
                      ${emailBody}

                    
                            <tr
                              style="
                                border-bottom: 1px solid #f4f4f4;
                                border-top: 1px solid #f4f4f4;
                              "
                            >
                              <td
                                style="
                                  font-size: 14px;
                                  color: #282727;
                                  font-family: proxima-nova, open sans,
                                    Helvetica, sans-serif;
                                "
                                colspan="2"
                              >
                                <p>
                                ${bookingDetails?.practitionerName}
                                </p>
                                <span class="im">
                                  <p>
                                  ${bookingDetails?.clinicName}
                                  </p>
                                  <p>
                                  ${bookingDetails?.address}
                                  </p>
                                </span>
                              </td>
                              <td style="text-align: right" colspan="2">
                                <img
                                  style="
                                    border-radius: 100%;
                                    width: 80px;
                                    height: 80px;
                                    vertical-align: middle;
                                  "
                                  src="${bookingDetails?.profilePic}"
                                  class="CToWUd"
                                  data-bit="iit"
                                />
                              </td>
                            </tr>
                            <tr
                              style="
                                border-bottom: 1px solid #f4f4f4;
                                border-top: 1px solid #f4f4f4;
                              "
                            >
                              <td
                                style="
                                  text-align: center;
                                  color: #282727;
                                  font-family: proxima-nova, open sans,
                                    Helvetica, sans-serif;
                                  font-size: 20px;
                                "
                                colspan="4"
                              >
                                <p style="color: #282727">
                                  <img
                                    style="
                                      margin-right: 3px;
                                      width: 6%;
                                      vertical-align: middle;
                                    "
                                    src="https://ci6.googleusercontent.com/proxy/Pa4MoMnu4cP0sLwUBOifBOaloGVMYO4vD0Zc0NwtG7gvovSX-pu-sUTCnyA4c6uSENOpHzt9AM4LHgwkszmAsgUEKLqSzJt51-qhuAOMClLZ2ykIFbR9ofdODUX9kH1IsMlfJaZx1D-l78cHMpU=s0-d-e1-ft#https://cdn.sanity.io/images/iy559jeo/qa/37a73ba0f9b055e3d4e3eb787c57d6b00c833b65-32x32.png"
                                    class="CToWUd"
                                    data-bit="iit"
                                  />
                                  ${bookingDetails?.appointment?.time}
                                </p>
                                <p style="color: #9c7731">
                                  <img
                                    style="
                                      margin-right: 3px;
                                      width: 6%;
                                      vertical-align: middle;
                                    "
                                    src="https://ci6.googleusercontent.com/proxy/wmazS8Xgp642o15AkCnLWOBFj7BXtHo2Zh4aF0M8EwKEyszp5pnYec-nyfG_Q4LDwhhSsFAGD_zz0InwmZoNrAjXjDwxquTO9Lb_2v5kMpSTGXS6kF4deXH1VGEe82GJqAuTtl43xSY2KEf8wDM=s0-d-e1-ft#https://cdn.sanity.io/images/iy559jeo/qa/660ab87932b45cfc6e7af13e8564609d81ab4f7e-32x32.png"
                                    class="CToWUd"
                                    data-bit="iit"
                                  />
                                  ${bookingDetails?.appointment?.date}
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <span class="im">
  

      <div style="margin: 0px auto; max-width: 600px">
        <table
          align="center"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="width: 100%"
        >
          <tbody>
            <tr>
              <td
                style="
                  direction: ltr;
                  font-size: 0px;
                  padding: 20px 0;
                  text-align: center;
                "
              >
                <div
                  class="m_-4042900081490989051mj-column-per-100"
                  style="
                    font-size: 0px;
                    text-align: left;
                    direction: ltr;
                    display: inline-block;
                    vertical-align: top;
                    width: 100%;
                  "
                >
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    width="100%"
                  >
                    <tbody>
                      <tr>
                        <td
                          style="
                            background-color: #f8f8f8;
                            border-radius: 13px;
                            vertical-align: top;
                            padding-bottom: 13px;
                          "
                        >
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                            width="100%"
                          >
                            <tbody>
                              <tr>
                                <td
                                  align="center"
                                  style="
                                    font-size: 0px;
                                    padding: 10px 25px;
                                    padding-bottom: 0;
                                    word-break: break-word;
                                  "
                                >
                                  <div
                                    style="
                                      font-family: Ubuntu, Helvetica, Arial,
                                        sans-serif;
                                      font-size: 13px;
                                      line-height: 1;
                                      text-align: center;
                                      color: #000000;
                                    "
                                  >
                                    <p style="font-size: 18px">
                                      Please fill in your forms in Client area prior to the
                                      appointment to save time.
                                    </p>
                                  </div>
                                </td>
                              </tr>

                           
                         
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style="margin: 0px auto; max-width: 600px">
        <table
          align="center"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="width: 100%"
        >
          <tbody>
            <tr>
              <td
                style="
                  direction: ltr;
                  font-size: 0px;
                  padding: 20px 0;
                  text-align: center;
                "
              >
                <div
                  class="m_-4042900081490989051mj-column-per-100"
                  style="
                    font-size: 0px;
                    text-align: left;
                    direction: ltr;
                    display: inline-block;
                    vertical-align: top;
                    width: 100%;
                  "
                >
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    style="vertical-align: top"
                    width="100%"
                  >
                    <tbody>
                      <tr>
                        <td
                          align="center"
                          style="
                            font-size: 0px;
                            padding: 10px 25px;
                            padding-top: 15px;
                            word-break: break-word;
                          "
                        >
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                            style="border-collapse: separate; line-height: 100%"
                          >
                            <tbody>
                              <tr>
                                <td
                                  align="center"
                                  bgcolor="#C5B196"
                                  role="presentation"
                                  style="
                                    border: none;
                                    border-radius: 13px;
                                    height: 50px;
                                    background: #c5b196;
                                  "
                                  valign="middle"
                                >
                                  <a
                                    href="${
                                      process.env.CLIENT_DOMAIN + "/client"
                                    }"
                                    style="
                                      display: inline-block;
                                      background: #c5b196;
                                      color: #ffffff;
                                      font-family: proxima-nova, Helvetica,
                                        sans-serif;
                                      font-size: 13px;
                                      font-weight: 600;
                                      line-height: 120%;
                                      margin: 0;
                                      text-decoration: none;
                                      text-transform: none;
                                      padding: 10px 25px;
                                      border-radius: 13px;
                                    "
                                    target="_blank"
                                  >
                                    MANAGE YOUR BOOKING
                                  </a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style="margin: 0px auto; max-width: 600px">
        <table
          align="center"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="width: 100%"
        >
          <tbody>
            <tr>
              <td
                style="
                  direction: ltr;
                  font-size: 0px;
                  padding: 0 10px;
                  text-align: center;
                "
              >
                <div
                  class="m_-4042900081490989051mj-column-per-100"
                  style="
                    font-size: 0px;
                    text-align: left;
                    direction: ltr;
                    display: inline-block;
                    vertical-align: top;
                    width: 100%;
                  "
                >
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    style="vertical-align: top"
                    width="100%"
                  >
                    <tbody>
                      <tr>
                        <td
                          align="left"
                          style="
                            font-size: 0px;
                            padding: 10px 25px;
                            padding-top: 20px;
                            padding-left: 15px;
                            word-break: break-word;
                          "
                        >
                          <div
                            style="
                              font-family: Ubuntu, Helvetica, Arial, sans-serif;
                              font-size: 20px;
                              font-weight: bold;
                              line-height: 1;
                              text-align: left;
                              color: #000000;
                            "
                          >
                            Cancellation Policy
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td
                          align="left"
                          style="
                            font-size: 0px;
                            padding: 10px 25px;
                            word-break: break-word;
                          "
                        >
                          <div
                            style="
                              font-family: proxima-nova, open sans, Helvetica,
                                sans-serif;
                              font-size: 14px;
                              line-height: 18px;
                              text-align: left;
                              color: #282727;
                            "
                          >
                            All clinics have their own cancellation &amp; no
                            show policy, this information was displayed when
                            making the booking. If you cannot make your
                            scheduled treatment date/time, please contact the
                            clinic 48 hours prior to treatment to avoid
                            cancellation charges.
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td
                          align="left"
                          style="
                            font-size: 0px;
                            padding: 10px 25px;
                            padding-top: 10px;
                            padding-left: 0;
                            word-break: break-word;
                          "
                        >
                          <table
                            cellpadding="15"
                            cellspacing="0"
                            width="100%"
                            border="0"
                            style="
                              color: #000000;
                              font-family: proxima-nova, Helvetica, sans-serif;
                              font-size: 13px;
                              line-height: 22px;
                              table-layout: fixed;
                              width: 100%;
                              border: none;
                            "
                          >
                            <tbody>
                              <tr
                                style="
                                  border-bottom: 1px solid #f4f4f4;
                                  border-top: 1px solid #f4f4f4;
                                "
                              >
                                <td
                                  style="
                                    font-size: 14px;
                                    color: #282727;
                                    font-family: proxima-nova, open sans,
                                      Helvetica, sans-serif;
                                  "
                                  colspan="2"
                                >
                                  If cancelled within 48 hours of appointment
                                </td>
                                <td
                                  style="
                                    text-align: right;
                                    color: #282727;
                                    font-family: proxima-nova, open sans,
                                      Helvetica, sans-serif;
                                    font-size: 20px;
                                  "
                                >
                                  10%
                                </td>
                              </tr>
                              <tr
                                style="
                                  border-bottom: 1px solid #f4f4f4;
                                  border-top: 1px solid #f4f4f4;
                                "
                              >
                                <td
                                  style="
                                    font-size: 14px;
                                    color: #282727;
                                    font-family: proxima-nova, open sans,
                                      Helvetica, sans-serif;
                                  "
                                  colspan="2"
                                >
                                  No show
                                </td>
                                <td
                                  style="
                                    text-align: right;
                                    color: #282727;
                                    font-family: proxima-nova, open sans,
                                      Helvetica, sans-serif;
                                    font-size: 20px;
                                  "
                                >
                                  30%
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style="margin: 0px auto; max-width: 600px">
        <table
          align="center"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="width: 100%"
        >
          <tbody>
            <tr>
              <td
                style="
                  direction: ltr;
                  font-size: 0px;
                  padding: 0 10px;
                  text-align: center;
                "
              >
                <div
                  class="m_-4042900081490989051mj-column-per-100"
                  style="
                    font-size: 0px;
                    text-align: left;
                    direction: ltr;
                    display: inline-block;
                    vertical-align: top;
                    width: 100%;
                  "
                >
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    style="vertical-align: top"
                    width="100%"
                  >
                    <tbody>
                      <tr>
                        <td
                          align="left"
                          style="
                            font-size: 0px;
                            padding: 10px 25px;
                            padding-top: 20px;
                            padding-left: 15px;
                            word-break: break-word;
                          "
                        >
                          <div
                            style="
                              font-family: Ubuntu, Helvetica, Arial, sans-serif;
                              font-size: 20px;
                              font-weight: bold;
                              line-height: 1;
                              text-align: left;
                              color: #000000;
                            "
                          >
                            Consultations
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td
                          align="left"
                          style="
                            font-size: 0px;
                            padding: 10px 25px;
                            word-break: break-word;
                          "
                        >
                          <div
                            style="
                              font-family: proxima-nova, open sans, Helvetica,
                                sans-serif;
                              font-size: 14px;
                              line-height: 18px;
                              text-align: left;
                              color: #282727;
                            "
                          >
                            The first part of your appointment will be a
                            consultation. During this consultation, your
                            practitioner will determine the appropriate
                            treatment for you. The cost and duration of the
                            treatment you booked is subject to change based on
                            your consultation.
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td
                          align="left"
                          style="
                            font-size: 0px;
                            padding: 10px 25px;
                            word-break: break-word;
                          "
                        >
                          <div
                            style="
                              font-family: proxima-nova, open sans, Helvetica,
                                sans-serif;
                              font-size: 14px;
                              font-weight: bold;
                              line-height: 18px;
                              text-align: left;
                              color: #282727;
                            "
                          >
                            It is at the discretion of your practitioner,
                            following a consultation, to decide if the treatment
                            you have booked is suitable.
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td
                          align="left"
                          style="
                            font-size: 0px;
                            padding: 10px 25px;
                            padding-top: 10px;
                            padding-left: 0;
                            word-break: break-word;
                          "
                        >
                          <table
                            cellpadding="15"
                            cellspacing="0"
                            width="100%"
                            border="0"
                            style="
                              color: #000000;
                              font-family: proxima-nova, Helvetica, sans-serif;
                              font-size: 13px;
                              line-height: 22px;
                              table-layout: fixed;
                              width: 100%;
                              border: none;
                            "
                          >
                            <tbody>
                              <tr
                                style="
                                  border-bottom: 1px solid #f4f4f4;
                                  border-top: 1px solid #f4f4f4;
                                "
                              ></tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </span>
  </div>
  <span class="im">
    <div style="margin: 0px auto; max-width: 600px">
      <table
        align="center"
        border="0"
        cellpadding="0"
        cellspacing="0"
        role="presentation"
        style="width: 100%"
      >
        <tbody>
          <tr>
            <td
              style="
                direction: ltr;
                font-size: 0px;
                padding: 20px 0;
                text-align: center;
              "
            >
              <div
                class="m_-4042900081490989051mj-column-per-100"
                style="
                  font-size: 0px;
                  text-align: left;
                  direction: ltr;
                  display: inline-block;
                  vertical-align: top;
                  width: 100%;
                "
              >
                <table
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                  style="background-color: white; vertical-align: top"
                  width="100%"
                >
                  <tbody>
                    <tr>
                      <td
                        align="center"
                        style="
                          font-size: 0px;
                          padding: 1px;
                          word-break: break-word;
                        "
                      >
                        <div
                          style="
                            font-family: proxima-nova, open sans, Helvetica,
                              sans-serif;
                            font-size: 12px;
                            line-height: 16px;
                            text-align: center;
                            color: #c6a443;
                          "
                        >
                          Sent with
                          <img
                            data-emoji="❤"
                            class="an1"
                            alt="❤"
                            aria-label="❤"
                            width="16"
                            src="https://fonts.gstatic.com/s/e/notoemoji/15.0/2764/72.png"
                            loading="lazy"
                          />
                          from <span class="il">Glowday</span>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td
                        align="center"
                        style="
                          font-size: 0px;
                          padding: 1px;
                          word-break: break-word;
                        "
                      >
                        <div
                          style="
                            font-family: proxima-nova, open sans, Helvetica,
                              sans-serif;
                            font-size: 12px;
                            line-height: 16px;
                            text-align: center;
                            color: #c6a443;
                          "
                        >
                          #GetGlowing
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div style="margin: 0px auto; max-width: 600px">
      <table
        align="center"
        border="0"
        cellpadding="0"
        cellspacing="0"
        role="presentation"
        style="width: 100%"
      >
        <tbody>
          <tr>
            <td
              style="
                direction: ltr;
                font-size: 0px;
                padding: 20px 0;
                padding-top: 0;
                text-align: center;
              "
            >
              <div
                class="m_-4042900081490989051mj-column-per-100"
                style="
                  font-size: 0px;
                  text-align: left;
                  direction: ltr;
                  display: inline-block;
                  vertical-align: top;
                  width: 100%;
                "
              >
                <table
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                  style="background-color: #f4f4f4; vertical-align: top"
                  width="100%"
                >
                  <tbody>
                    <tr>
                      <td
                        align="center"
                        style="
                          font-size: 0px;
                          padding: 20px 10px 0px 10px;
                          word-break: break-word;
                        "
                      >
                        <div
                          style="
                            font-family: proxima-nova, open sans, Helvetica,
                              sans-serif;
                            font-size: 11px;
                            line-height: 16px;
                            text-align: center;
                            color: #000000;
                          "
                        >
                          Copyright © 2023 <span class="il">Glowday</span>, All
                          rights reserved
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td
                        align="center"
                        style="
                          font-size: 0px;
                          padding: 10px 10px 20px 10px;
                          word-break: break-word;
                        "
                      >
                        <div
                          style="
                            font-family: proxima-nova, open sans, Helvetica,
                              sans-serif;
                            font-size: 10px;
                            line-height: 16px;
                            text-align: center;
                            color: #606060;
                          "
                        >
                          You are receiving this e-mail because you have a
                          <span class="il">Glowday</span> account with a
                          registered email address
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </span>
</div>

  </body>
  </html>`
}

export default bookingEmailFormat
