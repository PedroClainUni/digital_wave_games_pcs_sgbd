import { EMAIL } from "../utils/secrets";
import logger from "./logger";

const nodemailer = require("nodemailer");

export function sendEmail(
  to: string | undefined,
  subject: string,
  body: string
) {
  const transporter = nodemailer.createTransport({
    service: EMAIL.EMAIL_SERVICE,
    host: EMAIL.EMAIL_HOST,
    auth: {
      user: EMAIL.EMAIL_USER,
      pass: EMAIL.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: EMAIL.EMAIL_USER,
    to: to,
    subject: subject,
    html: body,
  };

  transporter.sendMail(mailOptions, function (error: any, info: any) {
    logger.error(error);
  });
}
