import { type ComponentProps, type FC } from "react"
import Link from "next/link"

import { buildPath, capitalizeFirstLetter } from "@/lib/utils"
import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface CustomBreadcrumbProps extends ComponentProps<typeof Breadcrumb> {
    pathname: string
}

interface CustomBreadcrumbDropdownMenuProps {
    pathSegments: string[]
}

const CustomBreadcrumbDropdownMenu: FC<CustomBreadcrumbDropdownMenuProps> = ({
    pathSegments,
}) => (
    <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-1">
            <BreadcrumbEllipsis className="size-4" />
            <span className="sr-only">Toggle menu</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
            {pathSegments.map((segment) => (
                <DropdownMenuItem key={segment}>
                    <Link href={buildPath(segment, pathSegments)}>
                        {capitalizeFirstLetter(segment)}
                    </Link>
                </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
    </DropdownMenu>
)

const CustomBreadcrumb: FC<CustomBreadcrumbProps> = ({
    pathname,
    className,
}) => {
    const pathSegments = pathname.split("/").filter(Boolean)
    const currentPage = pathSegments.pop()
    const previousPage = pathSegments.pop()
    return (
        <Breadcrumb className={className}>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                {pathSegments.length > 0 ? (
                    <>
                        <BreadcrumbItem>
                            <CustomBreadcrumbDropdownMenu
                                pathSegments={pathSegments}
                            />
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </>
                ) : null}

                {previousPage ? (
                    <>
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/${previousPage}`}>
                                {capitalizeFirstLetter(previousPage)}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </>
                ) : null}

                <BreadcrumbItem>
                    <BreadcrumbPage>
                        {capitalizeFirstLetter(currentPage!)}
                    </BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}

export default CustomBreadcrumb
