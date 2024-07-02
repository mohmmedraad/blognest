import { db } from "@/server/db"
import { v4 as uuid } from "uuid"

const mockArticles = [
    {
        userId: "clxyv3g7r000012c4llhxovvy",
        siteId: "cly0hthuj0001nzf1z9ap5ktk",
        thumbnail:
            "https://images.unsplash.com/photo-1709884735626-63e92727d8b6?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Kadeem Shaw",
        slug: uuid(),
        status: "unpublished",
        topics: ["one", "two", "three", "four"],
        content: [{ type: "h2", children: [{ text: "Write your article" }] }],
    },
    {
        userId: "clxyv3g7r000012c4llhxovvy",
        siteId: "cly0hthuj0001nzf1z9ap5ktk",
        thumbnail:
            "https://images.unsplash.com/photo-1709884735626-63e92727d8b6?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Imelda Harris",
        slug: uuid(),
        status: "unpublished",
        topics: ["one", "two", "three", "four"],
        content: [{ type: "h2", children: [{ text: "Write your article" }] }],
    },
    {
        userId: "clxyv3g7r000012c4llhxovvy",
        siteId: "cly0hthuj0001nzf1z9ap5ktk",
        thumbnail:
            "https://images.unsplash.com/photo-1709884735626-63e92727d8b6?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Ciaran Henry",
        slug: uuid(),
        status: "unpublished",
        topics: ["one", "two", "three", "four"],
        content: [{ type: "h2", children: [{ text: "Write your article" }] }],
    },
    {
        userId: "clxyv3g7r000012c4llhxovvy",
        siteId: "cly0hthuj0001nzf1z9ap5ktk",
        thumbnail:
            "https://images.unsplash.com/photo-1709884735626-63e92727d8b6?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Erasmus Marks",
        slug: uuid(),
        status: "unpublished",
        topics: ["one", "two", "three", "four"],
        content: [{ type: "h2", children: [{ text: "Write your article" }] }],
    },
    {
        userId: "clxyv3g7r000012c4llhxovvy",
        siteId: "cly0hthuj0001nzf1z9ap5ktk",
        thumbnail:
            "https://images.unsplash.com/photo-1709884735626-63e92727d8b6?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Nyssa Vasquez",
        slug: uuid(),
        status: "unpublished",
        topics: ["one", "two", "three", "four"],
        content: [{ type: "h2", children: [{ text: "Write your article" }] }],
    },
    {
        userId: "clxyv3g7r000012c4llhxovvy",
        siteId: "cly0hthuj0001nzf1z9ap5ktk",
        thumbnail:
            "https://images.unsplash.com/photo-1709884735626-63e92727d8b6?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Graham French",
        slug: uuid(),
        status: "unpublished",
        topics: ["one", "two", "three", "four"],
        content: [{ type: "h2", children: [{ text: "Write your article" }] }],
    },
    {
        userId: "clxyv3g7r000012c4llhxovvy",
        siteId: "cly0hthuj0001nzf1z9ap5ktk",
        thumbnail:
            "https://images.unsplash.com/photo-1709884735626-63e92727d8b6?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Nita Douglas",
        slug: uuid(),
        status: "unpublished",
        topics: ["one", "two", "three", "four"],
        content: [{ type: "h2", children: [{ text: "Write your article" }] }],
    },
    {
        userId: "clxyv3g7r000012c4llhxovvy",
        siteId: "cly0hthuj0001nzf1z9ap5ktk",
        thumbnail:
            "https://images.unsplash.com/photo-1709884735626-63e92727d8b6?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Iliana Larson",
        slug: uuid(),
        status: "unpublished",
        topics: ["one", "two", "three", "four"],
        content: [{ type: "h2", children: [{ text: "Write your article" }] }],
    },
    {
        userId: "clxyv3g7r000012c4llhxovvy",
        siteId: "cly0hthuj0001nzf1z9ap5ktk",
        thumbnail:
            "https://images.unsplash.com/photo-1709884735626-63e92727d8b6?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Halla Faulkner",
        slug: uuid(),
        status: "unpublished",
        topics: ["one", "two", "three", "four"],
        content: [{ type: "h2", children: [{ text: "Write your article" }] }],
    },
    {
        userId: "clxyv3g7r000012c4llhxovvy",
        siteId: "cly0hthuj0001nzf1z9ap5ktk",
        thumbnail:
            "https://images.unsplash.com/photo-1709884735626-63e92727d8b6?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Vielka Doyle",
        slug: uuid(),
        status: "unpublished",
        topics: ["one", "two", "three", "four"],
        content: [{ type: "h2", children: [{ text: "Write your article" }] }],
    },
    {
        userId: "clxyv3g7r000012c4llhxovvy",
        siteId: "cly0hthuj0001nzf1z9ap5ktk",
        thumbnail:
            "https://images.unsplash.com/photo-1709884735626-63e92727d8b6?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Jonas Bennett",
        slug: uuid(),
        status: "unpublished",
        topics: ["one", "two", "three", "four"],
        content: [{ type: "h2", children: [{ text: "Write your article" }] }],
    },
    {
        userId: "clxyv3g7r000012c4llhxovvy",
        siteId: "cly0hthuj0001nzf1z9ap5ktk",
        thumbnail:
            "https://images.unsplash.com/photo-1709884735626-63e92727d8b6?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Lewis Garner",
        slug: uuid(),
        status: "unpublished",
        topics: ["one", "two", "three", "four"],
        content: [{ type: "h2", children: [{ text: "Write your article" }] }],
    },
    {
        userId: "clxyv3g7r000012c4llhxovvy",
        siteId: "cly0hthuj0001nzf1z9ap5ktk",
        thumbnail:
            "https://images.unsplash.com/photo-1709884735626-63e92727d8b6?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Dacey Vaughan",
        slug: uuid(),
        status: "unpublished",
        topics: ["one", "two", "three", "four"],
        content: [{ type: "h2", children: [{ text: "Write your article" }] }],
    },
    {
        userId: "clxyv3g7r000012c4llhxovvy",
        siteId: "cly0hthuj0001nzf1z9ap5ktk",
        thumbnail:
            "https://images.unsplash.com/photo-1709884735626-63e92727d8b6?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Desirae Hinton",
        slug: uuid(),
        status: "unpublished",
        topics: ["one", "two", "three", "four"],
        content: [{ type: "h2", children: [{ text: "Write your article" }] }],
    },
    {
        userId: "clxyv3g7r000012c4llhxovvy",
        siteId: "cly0hthuj0001nzf1z9ap5ktk",
        thumbnail:
            "https://images.unsplash.com/photo-1709884735626-63e92727d8b6?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Joshua Schneider",
        slug: uuid(),
        status: "unpublished",
        topics: ["one", "two", "three", "four"],
        content: [{ type: "h2", children: [{ text: "Write your article" }] }],
    },
    {
        userId: "clxyv3g7r000012c4llhxovvy",
        siteId: "cly0hthuj0001nzf1z9ap5ktk",
        thumbnail:
            "https://images.unsplash.com/photo-1709884735626-63e92727d8b6?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Ignatius Gentry",
        slug: uuid(),
        status: "unpublished",
        topics: ["one", "two", "three", "four"],
        content: [{ type: "h2", children: [{ text: "Write your article" }] }],
    },
    {
        userId: "clxyv3g7r000012c4llhxovvy",
        siteId: "cly0hthuj0001nzf1z9ap5ktk",
        thumbnail:
            "https://images.unsplash.com/photo-1709884735626-63e92727d8b6?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Kylee Potts",
        slug: uuid(),
        status: "unpublished",
        topics: ["one", "two", "three", "four"],
        content: [{ type: "h2", children: [{ text: "Write your article" }] }],
    },
    {
        userId: "clxyv3g7r000012c4llhxovvy",
        siteId: "cly0hthuj0001nzf1z9ap5ktk",
        thumbnail:
            "https://images.unsplash.com/photo-1709884735626-63e92727d8b6?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Jin Ellison",
        slug: uuid(),
        status: "unpublished",
        topics: ["one", "two", "three", "four"],
        content: [{ type: "h2", children: [{ text: "Write your article" }] }],
    },
    {
        userId: "clxyv3g7r000012c4llhxovvy",
        siteId: "cly0hthuj0001nzf1z9ap5ktk",
        thumbnail:
            "https://images.unsplash.com/photo-1709884735626-63e92727d8b6?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Buckminster Wagner",
        slug: uuid(),
        status: "unpublished",
        topics: ["one", "two", "three", "four"],
        content: [{ type: "h2", children: [{ text: "Write your article" }] }],
    },
    {
        userId: "clxyv3g7r000012c4llhxovvy",
        siteId: "cly0hthuj0001nzf1z9ap5ktk",
        thumbnail:
            "https://images.unsplash.com/photo-1709884735626-63e92727d8b6?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "David Mayo",
        slug: uuid(),
        status: "unpublished",
        topics: ["one", "two", "three", "four"],
        content: [{ type: "h2", children: [{ text: "Write your article" }] }],
    },
]

const main = async () => {
    const articles = await db.article.createMany({
        data: mockArticles,
    })
}
void main()
