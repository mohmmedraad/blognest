"use client"

import { type FC } from "react"
import type { SiteEditDetailsFormDefaultValues } from "@/types"

import { useSiteDetails } from "@/hooks/use-site-details"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import FileUploader from "@/components/file-uploader"
import { UserAvatar } from "@/components/user-avatar"

const SiteEditDetailsForm: FC<SiteEditDetailsFormDefaultValues> = (
    defaultValues
) => {
    const {
        form,
        isPending,
        isUploading,
        uploadedFiles,
        uploadFiles,
        editSite,
    } = useSiteDetails({
        id: defaultValues.id,
        title: defaultValues.title,
        description: defaultValues.description,
        subdomain: defaultValues.subdomain,
        subheading: defaultValues.subheading,
        heading: defaultValues.heading,
        logo: defaultValues.logo,
    })
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit((values) =>
                    editSite({
                        id: defaultValues.id,
                        title: values.title,
                        description: values.description,
                        subdomain: values.subdomain,
                        logo: uploadedFiles[0]?.url ?? defaultValues.logo!,
                        heading: values.heading,
                        subheading: values.subheading,
                    })
                )}
            >
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem className="flex max-w-screen-lg flex-wrap justify-between gap-x-8 gap-y-1.5">
                            <FormLabel className="w-full max-w-[280px]">
                                Title
                            </FormLabel>
                            <div className="w-full lg:max-w-[512px]">
                                <FormControl>
                                    <Input
                                        placeholder="Site"
                                        disabled={isPending}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="mt-2" />
                            </div>
                        </FormItem>
                    )}
                />
                <Separator className="my-5" />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem className="flex max-w-screen-lg flex-wrap justify-between gap-x-8 gap-y-1.5">
                            <FormLabel className="w-full max-w-[280px]">
                                Description
                            </FormLabel>
                            <div className="w-full lg:max-w-[512px]">
                                <FormControl>
                                    <Textarea
                                        placeholder="This is a site"
                                        rows={4}
                                        disabled={isPending}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="mt-2" />
                            </div>
                        </FormItem>
                    )}
                />
                <Separator className="my-5" />
                <FormField
                    control={form.control}
                    name="heading"
                    render={({ field }) => (
                        <FormItem className="flex max-w-screen-lg flex-wrap justify-between gap-x-8 gap-y-1.5">
                            <FormLabel className="w-full max-w-[280px]">
                                Site Heading
                            </FormLabel>
                            <div className="w-full lg:max-w-[512px]">
                                <FormControl>
                                    <Textarea
                                        placeholder="This is a heading"
                                        rows={4}
                                        disabled={isPending}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="mt-2" />
                            </div>
                        </FormItem>
                    )}
                />
                <Separator className="my-5" />
                <FormField
                    control={form.control}
                    name="subheading"
                    render={({ field }) => (
                        <FormItem className="flex max-w-screen-lg flex-wrap justify-between gap-x-8 gap-y-1.5">
                            <FormLabel className="w-full max-w-[280px]">
                                Subheading
                            </FormLabel>
                            <div className="w-full lg:max-w-[512px]">
                                <FormControl>
                                    <Textarea
                                        placeholder="This is a subheading"
                                        rows={4}
                                        disabled={isPending}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="mt-2" />
                            </div>
                        </FormItem>
                    )}
                />
                <Separator className="my-5" />
                <FormField
                    control={form.control}
                    name="subdomain"
                    render={({ field }) => (
                        <FormItem className="flex max-w-screen-lg flex-wrap justify-between gap-x-8 gap-y-1.5">
                            <FormLabel className="w-full max-w-[280px]">
                                Subdomain
                            </FormLabel>
                            <div className="w-full lg:max-w-[512px]">
                                <FormControl>
                                    <Input
                                        placeholder="Site"
                                        disabled={isPending}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="mt-2" />
                            </div>
                        </FormItem>
                    )}
                />
                <Separator className="my-5" />
                <FormField
                    control={form.control}
                    name="logo"
                    render={({ field }) => (
                        <FormItem className="flex max-w-screen-lg flex-wrap justify-between gap-x-8 gap-y-1.5">
                            <FormLabel className="w-full max-w-[280px]">
                                Logo
                            </FormLabel>
                            <div className="w-full lg:max-w-[512px]">
                                <FormControl>
                                    <div className="flex w-full flex-col gap-4 lg:flex-row lg:gap-5">
                                        <UserAvatar
                                            name={defaultValues.title}
                                            imageUrl={
                                                uploadedFiles[0]?.url ??
                                                defaultValues.logo!
                                            }
                                            className="size-16"
                                        />
                                        <FileUploader
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            onUpload={uploadFiles}
                                            disabled={isPending}
                                            className="w-full"
                                        />
                                    </div>
                                </FormControl>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Separator className="my-5" />
                <div className="flex justify-end gap-3">
                    <Button
                        type="button"
                        variant={"outline"}
                        onClick={() => form.reset()}
                        disabled={isPending || isUploading}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isPending || isUploading}>
                        Save
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default SiteEditDetailsForm
