"use client"

import { type ComponentProps, type FC } from "react"
import { useRouter } from "next/navigation"

import { Button } from "./ui/button"

interface RefreshButtonProps extends ComponentProps<typeof Button> {}

const RefreshButton: FC<RefreshButtonProps> = ({ children, ...props }) => {
    const router = useRouter()
    return (
        <Button {...props} onClick={() => router.refresh()}>
            {children}
        </Button>
    )
}

export default RefreshButton
