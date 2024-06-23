import { type FC } from "react"
import { redirect } from "next/navigation"
import { db } from "@/server/db"
import { v4 as uuid } from "uuid"

import { getCachedUser } from "@/lib/cached-data"

interface NewArticlePageProps {}

const NewArticlePage: FC<NewArticlePageProps> = async ({}) => {
    const user = await getCachedUser()

    if (!user) {
        return null
    }

    const article = await db.article.create({
        select: {
            slug: true,
        },
        data: {
            userId: user.id,
            title: "Untitled",
            slug: uuid(),
            status: "unpublished",
            topics: [],
            content: [
                { type: "h2", children: [{ text: "Write your article" }] },
            ],
        },
    })

    return redirect(`/dashboard/articles/${article.slug}/edit`)
}

export default NewArticlePage
