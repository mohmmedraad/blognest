import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "group/button relative inline-flex items-center justify-center overflow-hidden rounded-md px-4 py-1.5 text-xs font-medium transition-all duration-300 ease-in-out disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default:
                    "bg-primary text-primary-foreground shadow hover:bg-primary/90 hover:scale-105 hover:shadow-lg hover:shadow-primary/30",
                destructive:
                    "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 hover:scale-105 hover:shadow-lg hover:shadow-primary/30",
                outline:
                    "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground hover:scale-105 hover:shadow-lg hover:shadow-primary/30",
                secondary:
                    "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 hover:scale-105 hover:shadow-lg hover:shadow-primary/30",
                ghost: "hover:bg-accent hover:text-accent-foreground hover:scale-105 hover:shadow-lg hover:shadow-primary/30",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-9 px-4 py-2",
                sm: "h-8 rounded-md px-3 text-xs",
                lg: "h-10 rounded-md px-8",
                icon: "h-9 w-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        { className, variant = "default", size, asChild = false, ...props },
        ref
    ) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            >
                {props.children}
                {variant === "default" ? (
                    <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                        <div className="relative h-full w-8 bg-white/20" />
                    </div>
                ) : null}
            </Comp>
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
