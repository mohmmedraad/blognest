"use client"

import { cn } from "@/lib/utils"
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern"

const Background = () => {
    return (
        <div
            className="absolute left-1/2 top-1/2
        z-[-1] size-full -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg border bg-background md:shadow-xl"
        >
            <AnimatedGridPattern
                numSquares={20}
                maxOpacity={1}
                duration={3}
                repeatDelay={1}
                width={100}
                height={100}
                className={cn(
                    "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)] sm:[mask-image:radial-gradient(500px_circle_at_center,white,transparent)] lg:[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
                    "inset-x-0 h-[200%] skew-y-12",
                    "fill-primary/30 stroke-primary/30 text-primary"
                )}
            />
        </div>
    )
}

export default Background
