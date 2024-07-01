import { type FC } from "react"

import { getCachedUser, getUserCachedSite } from "@/lib/cached-data"
import { Separator } from "@/components/ui/separator"
import DashboardSiteHeading from "@/components/dashboard-site-heading"
import DashboardSiteParagraph from "@/components/dashboard-site-paragraph"

import DeleteSite from "./_components/delete-site"
import ToggleLive from "./_components/toggle-live"

interface SettingPageProps {
    params: {
        subdomain?: string
    }
}

const SettingPage: FC<SettingPageProps> = async ({ params: { subdomain } }) => {
    if (!subdomain) return null

    const user = await getCachedUser()
    if (!user) return null

    const site = await getUserCachedSite(user.id, subdomain)

    if (!site) return null

    return (
        <div>
            <DashboardSiteHeading>Settings</DashboardSiteHeading>
            <DashboardSiteParagraph>
                Edit your site settings here.
            </DashboardSiteParagraph>
            <Separator className="mb-6 mt-5" />
            <div className="flex w-full flex-row items-center justify-between rounded-lg border p-4 sm:p-6">
                <div>
                    <h4 className="break-normal text-lg font-medium sm:text-xl">
                        Toggle live
                    </h4>
                    <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                        Turn your site on or off. When your site is off, it will
                        not be accessible to the public.
                    </p>
                </div>
                <ToggleLive site={{ ...site }} />
            </div>

            <div className="mt-4 w-full rounded-lg border border-destructive p-4 sm:p-6">
                <h4 className="break-normal text-lg font-medium sm:text-xl">
                    Danger Zone
                </h4>
                <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                    The following actions are destructive and cannot be
                    reversed.
                </p>

                <DeleteSite site={{ ...site }} />
            </div>
        </div>
    )
}

export default SettingPage
