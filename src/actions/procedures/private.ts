// TODO: use server only package

import { getServerAuthSession } from "@/server/auth"
import { createServerActionProcedure, ZSAError } from "zsa"

export const privateProcedure = createServerActionProcedure().handler(
    async () => {
        const session = await getServerAuthSession()

        if (!session?.user) {
            throw new ZSAError("NOT_AUTHORIZED")
        }

        return { user: session.user }
    }
)
