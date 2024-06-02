"use client"

import { useState, type FC, type HTMLAttributes } from "react"
import type { OAuthProvider } from "@/types"
import { signIn } from "next-auth/react"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

const OAUTH_PROVIDERS: OAuthProvider[] = [
    {
        name: "Google",
        strategy: "google",
        label: "Sing in with Google",
        Icon: Icons.Google,
    },
]
interface OAuthProvidersProps extends HTMLAttributes<HTMLDivElement> {}

const OAuthProviders: FC<OAuthProvidersProps> = ({ className, ...props }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const login = async (strategy: OAuthProvider["strategy"]) => {
        setIsLoading(true)

        try {
            await signIn(strategy)
        } catch (error) {
            toast.error("There was an error logging in with Google")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div
            className={cn("flex flex-col justify-center gap-2", className)}
            {...props}
        >
            {OAUTH_PROVIDERS.map(({ name, strategy, label, Icon }) => (
                <Button
                    aria-label={`Sign in with ${name}`}
                    variant={"outline"}
                    className="flex w-full gap-1"
                    key={name}
                    disabled={isLoading}
                    onClick={() => login(strategy)}
                >
                    <Icon className="size-6" />
                    {label}
                </Button>
            ))}
        </div>
    )
}

export default OAuthProviders
