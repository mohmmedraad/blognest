import { type FC } from "react"
import Image from "next/image"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import Link from "@/components/ui/link"
import MaxWidthWrapper from "@/components/max-width-wrapper"

interface BlogsProps {}

const BLOGS = [
    {
        name: "Travel Blog",
        thumbnail: "",
        logo: "",
        description:
            "Explore the world with our travel blog, featuring stunning photography and insightful stories from around the globe.",
        link: "",
    },
    {
        name: "Tech Blog",
        thumbnail: "",
        logo: "",
        description:
            "Stay up-to-date with the latest tech news, product reviews, and industry insights.",
        link: "",
    },
    {
        name: "Lifestyle Blog",
        thumbnail: "",
        logo: "",
        description:
            "Discover tips, trends, and inspiration for a healthier, happier life.",
        link: "",
    },
]

const Blogs: FC<BlogsProps> = ({}) => {
    return (
        <MaxWidthWrapper className="pt-40">
            <h2 className="mx-auto w-full max-w-[600px] text-center text-5xl font-semibold">
                Blogs Created with our Blognest
            </h2>
            <div className="grid gap-8 pt-10 sm:grid-cols-2 lg:grid-cols-3">
                {BLOGS.map((blog) => (
                    <Card key={blog.name}>
                        <CardHeader className="">
                            <div className="relative aspect-video w-full overflow-hidden rounded-t-xl">
                                <Image
                                    alt="Blog Image"
                                    className="size-full object-cover"
                                    src="/hero.webp"
                                    fill
                                />
                            </div>
                        </CardHeader>
                        <CardContent className="p-4 text-center">
                            <h3 className="line-clamp-1 text-lg font-bold">
                                {blog.name}
                            </h3>
                            <p className="line-clamp-2 text-gray-500 dark:text-gray-400">
                                {blog.description}
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Link href="#" size="xl" className="w-full">
                                View Blog
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </MaxWidthWrapper>
    )
}

export default Blogs
