import { type FC } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Background from "@/components/background"
import { Icons } from "@/components/icons"
import Logo from "@/components/logo"
import MaxWidthWrapper from "@/components/max-width-wrapper"

import LoginForm from "./_components/login-form"

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
    return (
        <div className="relative h-screen">
            <MaxWidthWrapper className="flex min-h-screen items-center justify-center">
                <Card className="w-full max-w-[400px]">
                    <CardHeader>
                        <Logo />
                        <CardTitle>Login</CardTitle>
                        <CardDescription>
                            Access your account and manage your blog
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button
                            variant={"outline"}
                            className="flex w-full gap-1"
                        >
                            <Icons.Google className="size-6" />
                            Sing in with Google
                        </Button>
                        <div className="relative my-4">
                            <p className="absolute left-1/2 top-1/2 size-7 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background p-1 text-sm text-gray-600">
                                or
                            </p>
                            <Separator />
                        </div>

                        <LoginForm />
                    </CardContent>
                    <CardFooter className="block">
                        <Button
                            className="w-full"
                            type="submit"
                            form="login-up"
                        >
                            Login
                        </Button>
                        <Separator className="my-4" />
                        <p className="text-sm text-gray-500">
                            Don&apos;t have an account?{" "}
                            <Link
                                href={"/sign-up"}
                                className="text-primary hover:underline hover:underline-offset-4"
                            >
                                Go to sign up
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </MaxWidthWrapper>
            <Background />
        </div>
    )
}

export default Page
