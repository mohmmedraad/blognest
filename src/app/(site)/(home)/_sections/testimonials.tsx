import Image from "next/image"

import { cn } from "@/lib/utils"
import Marquee from "@/components/ui/marquee"
import MaxWidthWrapper from "@/components/max-width-wrapper"

const REVIEWS = [
    {
        name: "Sarah Johnson",
        username: "@jack",
        body: "Blognest's templates are stunning, and my readership has grown significantly!",
        img: "https://avatar.vercel.sh/jack",
    },
    {
        name: "David Martinez",
        username: "@jill",
        body: "The writing tools and analytics on BlogNest are top-notch. It's my go-to platform!",
        img: "https://avatar.vercel.sh/jill",
    },
    {
        name: "Emily Carter",
        username: "@john",
        body: "I love how easy it is to share my recipes on Blognest. My followers love it!",
        img: "https://avatar.vercel.sh/john",
    },
    {
        name: "Mark Thompson",
        username: "@jane",
        body: "Blognest helped me reach a wider audience with its excellent SEO tools!",
        img: "https://avatar.vercel.sh/jane",
    },
    {
        name: "Lisa Kim",
        username: "@jenny",
        body: "Creating and customizing my blog on Blognest is so easy and fun!",
        img: "https://avatar.vercel.sh/jenny",
    },
    {
        name: "John Doe",
        username: "@james",
        body: "Blognest offers fantastic support and resources for tech bloggers like me!",
        img: "https://avatar.vercel.sh/james",
    },
]

const FIRST_ROW = REVIEWS.slice(0, REVIEWS.length / 2)
const SECOND_ROW = REVIEWS.slice(REVIEWS.length / 2)

const Testimonials = () => {
    return (
        <section>
            <MaxWidthWrapper className="pt-40">
                <h2 className="mx-auto w-full max-w-[600px] text-center text-5xl font-semibold ">
                    What Our User Say About Us
                </h2>
                <div className="relative flex size-full flex-col items-center justify-center overflow-hidden py-10">
                    <Marquee pauseOnHover className="[--duration:20s]">
                        {FIRST_ROW.map((review) => (
                            <ReviewCard key={review.username} {...review} />
                        ))}
                    </Marquee>
                    <Marquee reverse pauseOnHover className="[--duration:20s]">
                        {SECOND_ROW.map((review) => (
                            <ReviewCard key={review.username} {...review} />
                        ))}
                    </Marquee>
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
                </div>
            </MaxWidthWrapper>
        </section>
    )
}

const ReviewCard = ({
    img,
    name,
    username,
    body,
}: {
    img: string
    name: string
    username: string
    body: string
}) => {
    return (
        <figure
            className={cn(
                "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
                // light styles
                "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                // dark styles
                "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
            )}
        >
            <div className="flex flex-row items-center gap-2">
                <Image
                    className="rounded-full"
                    width="32"
                    height="32"
                    alt=""
                    src={img}
                />
                <div className="flex flex-col">
                    <figcaption className="text-sm font-medium dark:text-white">
                        {name}
                    </figcaption>
                    <p className="text-xs font-medium dark:text-white/40">
                        {username}
                    </p>
                </div>
            </div>
            <blockquote className="mt-2 text-sm">{body}</blockquote>
        </figure>
    )
}

export default Testimonials
