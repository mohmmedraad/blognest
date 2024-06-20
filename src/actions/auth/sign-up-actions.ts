"use server"

import { db } from "@/server/db"
import { generateVerificationToken } from "@/server/utils"
import { hash } from "bcrypt"
import { createServerAction } from "zsa"

import { sendVerificationLink } from "@/lib/mails"
import { signUpSchema } from "@/lib/validations/auth"

export const signUpAction = createServerAction()
    .input(signUpSchema)
    .handler(async ({ input }) => {
        const hashedPassword = await hash(input.password, 10)

        const isUserExist = await db.user.findFirst({
            select: { id: true },
            where: { email: input.email },
        })
        if (isUserExist) {
            throw new Error("CONFLICT")
        }

        await db.user.create({
            data: {
                name: input.name,
                email: input.email,
                password: hashedPassword,
            },
        })

        const verificationToken = await generateVerificationToken(input.email)

        await sendVerificationLink(verificationToken, input.email)
    })
