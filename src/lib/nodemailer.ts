import { env } from "@/env"
import { type EmailOptions } from "@/types"
import nodemailer from "nodemailer"

export const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: true,
    auth: {
        user: env.NODEMAILER_USER,
        pass: env.NODEMAILER_PASSWORD,
    },
})

/**
 * Sends an email using Nodemailer and React Email components.
 *
 * @param {EmailOptions} options - Options for the email including recipient, subject.
 * @returns {Promise<boolean>} - Returns a promise that resolves to true if the email is sent successfully, false otherwise.
 */
export const sendEmail = async (options: EmailOptions): Promise<boolean> => {
    try {
        await transporter.sendMail({
            from: env.NODEMAILER_USER,
            to: options.to,
            subject: options.subject,
            html: options.html,
        })
        return true
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error sending email:", error)
        return false
    }
}
