"use client"

import { type ComponentProps, type FC } from "react"

import { useCreateSite } from "@/hooks/use-create-site"
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
import { Textarea } from "@/components/ui/textarea"

interface AddSiteDialogProps extends ComponentProps<typeof Button> {}

const AddSiteDialog: FC<AddSiteDialogProps> = ({ children, ...props }) => {
    const { form, isPending, open, setOpen, createSite } = useCreateSite()

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button {...props}>{children}</Button>
            </DialogTrigger>
            <DialogContent>
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
                                            placeholder="Blognes"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            rows={4}
                                            placeholder="This is new site"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="subdomain"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Subdomain</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="blognest"
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
                            Create
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default AddSiteDialog
