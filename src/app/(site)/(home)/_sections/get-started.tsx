import { type FC } from "react"
import Image from "next/image"

import Link from "@/components/ui/link"
import MaxWidthWrapper from "@/components/max-width-wrapper"

interface GetStartedProps {}

const GetStarted: FC<GetStartedProps> = ({}) => {
    return (
        <section className="overflow-hidden bg-gradient-to-t from-primary/50 to-background py-40">
            <MaxWidthWrapper className="relative">
                <h3 className="mx-auto w-full max-w-[600px] text-center text-5xl font-semibold">
                    Create Your First Blog with
                    <br />
                    <span className="bg-gradient-to-b from-primary to-black bg-clip-text text-9xl text-transparent">
                        Fast.
                    </span>
                </h3>
                <div className="mt-8 flex justify-center">
                    <Link href="#" size="xl" className="mx-auto">
                        Get started
                    </Link>
                </div>
                <Image
                    src="/emojistar.png"
                    width={362}
                    height={362}
                    alt="image"
                    className="absolute left-0 top-0 hidden -translate-x-1/2 blur-sm lg:block"
                />
                <Image
                    src="/helix.png"
                    width={363}
                    height={363}
                    alt="image"
                    className="absolute bottom-0 right-0 hidden translate-x-1/2 lg:block"
                />
            </MaxWidthWrapper>
        </section>
    )
}

export default GetStarted
