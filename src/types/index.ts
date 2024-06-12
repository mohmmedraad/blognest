import { type SVGProps } from "react"
import { type BuiltInProviderType } from "next-auth/providers/index"
import { type ClientUploadedFileData } from "uploadthing/types"
import { type z } from "zod"

import {
    type getAuthorsSchema,
    type siteDetailsActionSchema,
} from "@/lib/validations/sites"

export type Icon = (props: SVGProps<SVGSVGElement>) => JSX.Element

export type OAuthProvider = {
    name: string
    strategy: BuiltInProviderType
    label: string
    Icon: Icon
}

export type EmailOptions = {
    to: string
    subject: string
    html: string
}

export type SearchParams = Record<string, string>

export interface UploadedFile<T = unknown> extends ClientUploadedFileData<T> {}

export type SiteDetailsActionSchema = z.infer<typeof siteDetailsActionSchema>
export type SiteEditDetailsFormDefaultValues = Omit<
    SiteDetailsActionSchema,
    "logo"
> & {
    logo: string | null
}

export type GetAuthorsSchema = z.infer<typeof getAuthorsSchema>
