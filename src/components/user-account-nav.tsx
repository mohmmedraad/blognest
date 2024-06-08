"use client"

import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { signOut } from "next-auth/react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserAvatar } from "@/components/user-avatar"

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
    name: string
    imageUrl: string
    email: string
}

export function UserAccountNav({ name, imageUrl, email }: UserAccountNavProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="flex items-center gap-[2px]">
                    <UserAvatar
                        name={name}
                        imageUrl={imageUrl}
                        className="size-8 shadow-md"
                    />
                    <ChevronDown className="size-3 text-gray-500" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white" align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{name}</p>
                        <p className="w-[200px] truncate text-sm text-muted-foreground">
                            {email}
                        </p>
                    </div>
                </div>
                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="cursor-pointer"
                    onSelect={(event) => {
                        event.preventDefault()
                        void signOut({
                            callbackUrl: "/",
                        })
                    }}
                >
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
