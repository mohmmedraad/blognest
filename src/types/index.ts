import { type SVGProps } from "react"
import { type BuiltInProviderType } from "next-auth/providers/index"
import { type ClientUploadedFileData } from "uploadthing/types"
import { type z } from "zod"

import { type updateArticleSchema } from "@/lib/validations/articles"
import {
    type deleteAuthorSchema,
    type editAuthorActionSchema,
    type editAuthorFormSchema,
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
export type SiteEditDetailsFormDefaultValues = {
    id: string
    subdomain: string
    title: string
    description: string
    logo: string | null
}

export type GetAuthorsSchema = z.infer<typeof getAuthorsSchema>
export type EditAuthorFormSchema = z.infer<typeof editAuthorFormSchema>
export type EditAuthorActionSchema = z.infer<typeof editAuthorActionSchema>
export type DeleteAuthorSchema = z.infer<typeof deleteAuthorSchema>

export type EditArticleSchema = z.infer<typeof updateArticleSchema>
