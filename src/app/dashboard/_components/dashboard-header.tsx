import { type FC } from "react"
import Link from "next/link"
import { Info, PanelLeftIcon } from "lucide-react"

import { site } from "@/config/site"
import { getCachedUser } from "@/lib/cached-data"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Logo from "@/components/logo"
import { ModeToggle } from "@/components/mode-toggle"
import { UserAccountNav } from "@/components/user-account-nav"

import DashboardMobileNavLinks from "./dashboard-mobile-nav-links"

interface DashboardHeaderProps {}

const DashboardHeader: FC<DashboardHeaderProps> = async ({}) => {
    const user = await getCachedUser()
    if (!user) return null
    // const user = {
    //     name: "mohammed raad",
    //     image: "/placeholder.png",
    // }
    return (
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-0 border-b bg-background px-4 lg:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button className="p-0" size="icon" variant="outline">
                        <PanelLeftIcon className="size-5" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent className="sm:max-w-xs" side="left">
                    <nav className="grid gap-6 text-lg font-medium">
                        <Link className="px-1.5" href="/" prefetch={false}>
                            <Logo className="size-8" />
                            <span className="sr-only">{site.name}</span>
                        </Link>
                        <DashboardMobileNavLinks />
                    </nav>
                </SheetContent>
            </Sheet>
            <div className="ml-auto flex items-center justify-center gap-5">
                <div className="flex items-center gap-3">
                    <ModeToggle />
                    <Info className="size-[1.2rem] text-muted-foreground" />
                </div>
                <UserAccountNav
                    name={user.name!}
                    imageUrl={user.image!}
                    email={user.email!}
                />
            </div>
        </header>
    )
}

export default DashboardHeader
