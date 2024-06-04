import { v4 as uuidv4 } from "uuid"

import { db } from "./db"

export const generateVerificationToken = async (email: string) => {
    const token = uuidv4()
    const expires = new Date(new Date().getTime() + 3000 * 1000)

    const isTokenExist = await db.verificationToken.findFirst({
        select: {
            identifier: true,
            token: true,
        },
        where: {
            identifier: email,
        },
    })

    if (isTokenExist) {
        await db.verificationToken.delete({
            where: {
                identifier: isTokenExist.identifier,
                token: isTokenExist.token,
            },
        })
    }

    const verificationToken = await db.verificationToken.create({
        data: {
            identifier: email,
            expires,
            token,
        },
    })
    return verificationToken.token
}
