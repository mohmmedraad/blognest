"use client"

import { type FC } from "react"

import { useLogin } from "@/hooks/use-login"
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
import { PasswordInput } from "@/components/ui/password-input"

interface LoginFormProps {}

const LoginForm: FC<LoginFormProps> = ({}) => {
    const { form, login, isPending } = useLogin()

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit((values) => login(values))}>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="mohammed@gmail.com"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <PasswordInput
                                    placeholder="********"
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
                    Login
                </Button>
            </form>
        </Form>
    )
}

export default LoginForm
