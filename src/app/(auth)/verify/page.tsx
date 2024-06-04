import { type FC } from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { db } from "@/server/db"
import { type SearchParams } from "@/types"
import { signIn } from "next-auth/react"

import { verifyPageSearchParamsSchema } from "@/lib/validations/params"

interface PageProps {
    searchParams: SearchParams
}

const Page: FC<PageProps> = async ({ searchParams }) => {
    const { success, data } =
        verifyPageSearchParamsSchema.safeParse(searchParams)

    if (!success) {
        return <div>invalid verification link</div>
    }

    const token = await db.verificationToken.findFirst({
        select: {
            identifier: true,
            token: true,
            expires: true,
        },
        where: {
            token: data.token,
        },
    })

    if (!token) {
        return <div>invalid verification link</div>
    }

    const isTokenExpired =
        new Date(token.expires).getTime() < new Date().getTime()

    if (isTokenExpired) {
        return <div>verification link expired</div>
    }

    await db.verificationToken.delete({
        where: {
            token: data.token,
        },
    })

    try {
        const user = await db.user.update({
            where: {
                email: token.identifier,
            },
            data: {
                emailVerified: new Date(),
            },
        })

        return <Link href="/login">return to login</Link>
    } catch (error) {
        return redirect("/login")
    }

    return null
}

export default Page
