import { transporter } from "./nodemailer"

export async function sendVerificationLink(token: string, email: string) {
    const verificationUrl = process.env.VERCEL_URL
        ? `${process.env.VERCEL_URL}/verify?token=${token}`
        : `http://localhost:3000/verify?token=${token}`

    await transporter.sendMail({
        from: "sendemailsendemailpro@gmail.com",
        to: email,
        subject: "Verify Your Email",
        html: `<a href="${verificationUrl}">Click here to verify your account</a>`,
    })
}
