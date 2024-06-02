"use server"

import { db } from "@/server/db"
import { hash } from "bcrypt"
import { type z } from "zod"

import { signUpSchema } from "@/lib/validations/auth"

export const signUpAction = async (payload: z.infer<typeof signUpSchema>) => {
    const { success, data } = signUpSchema.safeParse(payload)

    if (!success) {
        throw new Error("INVALID_DATA")
    }

    const hashedPassword = await hash(data.password, 10)

    const isUserExist = await db.user.findFirst({
        select: {
            id: true,
        },
        where: {
            email: data.email,
        },
    })

    if (isUserExist) {
        throw new Error("CONFLICT")
    }

    await db.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: hashedPassword,
        },
    })
}
