"use client"

import Image from "next/image"
import { type AvatarProps } from "@radix-ui/react-avatar"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface UserAvatarProps extends AvatarProps {
    name: string
    imageUrl: string
}

export const UserAvatar = ({ name, imageUrl, ...props }: UserAvatarProps) => {
    return (
        <Avatar {...props}>
            {imageUrl ? (
                <div className="relative aspect-square size-full">
                    <Image
                        fill
                        src={imageUrl}
                        alt="profile picture"
                        referrerPolicy="no-referrer"
                        loading="eager"
                    />
                </div>
            ) : (
                <AvatarFallback>
                    <span className="sr-only">{name}</span>
                </AvatarFallback>
            )}
        </Avatar>
    )
}
