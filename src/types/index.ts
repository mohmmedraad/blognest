import { type SVGProps } from "react"
import { type BuiltInProviderType } from "next-auth/providers/index"

export type Icon = (props: SVGProps<SVGSVGElement>) => JSX.Element

export type OAuthProvider = {
    name: string
    strategy: BuiltInProviderType
    label: string
    Icon: Icon
}
