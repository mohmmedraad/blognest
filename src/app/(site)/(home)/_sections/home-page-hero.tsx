import { type FC } from "react"
import Image from "next/image"

import { site } from "@/config/site"
import Link from "@/components/ui/link"
import MaxWidthWrapper from "@/components/max-width-wrapper"

import { ProjectGithubLInk } from "../_components/projectGithubLInk"

interface HomePageHeroProps {}

const HomePageHero: FC<HomePageHeroProps> = ({}) => {
    return (
        <section className="overflow-x-hidden pb-40">
            <div className="dark:bg-dark-hero-radial-gradient absolute left-0 top-0 z-0 h-[842px] w-full overflow-hidden bg-hero-radial-gradient opacity-20">
                <div
                    style={{
                        inset: "-230px -138px -559px -137px",
                    }}
                    className="absolute opacity-80 mix-blend-overlay"
                >
                    <div className="size-full bg-transparent bg-hero-patterns-gradient bg-blend-luminosity"></div>
                </div>
            </div>
            <MaxWidthWrapper>
                <div className=" p-10">
                    <ProjectGithubLInk
                        className="mx-auto"
                        href={site.githubLink}
                    />
                    <h1
                        className="mx-auto mt-4 w-full max-w-[860px]
          bg-title-gradient
      
          bg-clip-text py-6 text-center text-5xl font-semibold text-transparent sm:text-8xl"
                    >
                        Create Beautiful Blogs with Ease
                    </h1>
                    <p className="mx-auto my-4 max-w-[860px] text-center text-lg text-gray-600 sm:text-xl">
                        Our blog maker app provides a simple and intuitive
                        platform to create and publish your own blog. Customize
                        templates, write content, and analyze your audience.
                    </p>
                    <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                        <Link href={"/dashboard/sign-up"} size={"xl"}>
                            Get Started
                        </Link>
                        <Link
                            href={"/dashboard/sites"}
                            variant={"outline"}
                            size={"xl"}
                        >
                            Create a Site
                        </Link>
                    </div>
                </div>
                <div className="relative my-20 aspect-video w-full">
                    <Image
                        src="/hero.webp"
                        fill
                        alt="image"
                        className="size-full rounded-md object-fill"
                        style={{
                            maskImage: `linear-gradient(to top, transparent, black 30%)`,
                        }}
                        loading="eager"
                    />
                    <Image
                        src="/torus.png"
                        alt="image"
                        className="absolute bottom-0 left-0 hidden -translate-x-1/2 -translate-y-1/4 lg:block"
                        width={248}
                        height={248}
                    />
                    <Image
                        src="/pyramid.png"
                        alt="image"
                        className="absolute right-0 top-0 hidden translate-x-1/2 translate-y-1/4 blur-sm lg:block"
                        width={262}
                        height={262}
                    />
                </div>
            </MaxWidthWrapper>
        </section>
    )
}

export default HomePageHero
