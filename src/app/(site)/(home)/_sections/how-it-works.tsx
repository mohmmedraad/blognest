import { type FC } from "react"

import MaxWidthWrapper from "@/components/max-width-wrapper"

interface HowItWorksProps {}
const STEPS = [
    {
        title: "Sign Up for Free",
    },
    {
        title: "Create and Customize Your Blog",
    },
    {
        title: "Publish and Share Your Stories",
    },
]
const HowItWorks: FC<HowItWorksProps> = ({}) => {
    return (
        <MaxWidthWrapper>
            <h2 className="text-center text-5xl font-semibold">How it Works</h2>

            <div className="grid gap-8 pt-10 sm:grid-cols-2 lg:grid-cols-3">
                {STEPS.map((step, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center text-center"
                    >
                        <div className="text-base text-gray-500">
                            Steps {index + 1}
                        </div>
                        <h3 className="pt-4 text-2xl font-semibold text-gray-900">
                            {step.title}
                        </h3>
                    </div>
                ))}
            </div>
        </MaxWidthWrapper>
    )
}

export default HowItWorks
