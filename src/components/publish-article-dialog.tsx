"use client"

import { type ReactNode, type FC } from "react"
import type { EditArticleSchema } from "@/types"

import { usePublishArticle } from "@/hooks/use-publish-article"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { AuthorSelect } from "./author-select"
import { SiteSelect } from "./site-select"
import MultiSelect from "./ui/multi-select"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select"

interface PublishArticleDialogProps{
    editArticleValues: EditArticleSchema
    children: ReactNode
}

const PublishArticleDialog: FC<PublishArticleDialogProps> = ({
    children,
    editArticleValues,
}) => {
    const { form, isPending, open, setOpen, createSite } = usePublishArticle({
        ...editArticleValues,
    })

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Create new site</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        onSubmit={form.handleSubmit((values) =>
                            createSite(values)
                        )}
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Untitled"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="slug"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Slug</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Slug" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="site"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Site</FormLabel>
                                    <FormControl>
                                        <SiteSelect
                                            defaultValue={field.value}
                                            onValueChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="author"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>author</FormLabel>
                                    <FormControl>
                                        <AuthorSelect
                                            defaultValue={field.value}
                                            onValueChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <FormControl>
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger className="min-w-[180px]">
                                                <SelectValue placeholder="Select article Status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="published">
                                                        <div>Published</div>
                                                    </SelectItem>
                                                    <SelectItem value="unpublished">
                                                        <div>Unpublished</div>
                                                    </SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="topics"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Topics</FormLabel>
                                    <FormControl>
                                        <MultiSelect
                                            placeholder="Select topics"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            className="mt-6 w-full"
                            type="submit"
                            disabled={isPending}
                        >
                            Save
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default PublishArticleDialog
