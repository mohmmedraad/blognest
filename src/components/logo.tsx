import { type ComponentProps, type FC } from "react"
import Image from "next/image"

interface LogoProps extends Omit<ComponentProps<typeof Image>, "alt" | "src"> {}

const Logo: FC<LogoProps> = ({ width = 40, height = 40, ...props }) => {
    return (
        <Image
            src="/logo.png"
            alt="logo"
            width={width}
            height={height}
            {...props}
        />
    )
}

export default Logo
