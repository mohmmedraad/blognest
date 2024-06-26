import { type FC } from "react"
import Link from "next/link"

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
import Logo from "@/components/logo"
import MaxWidthWrapper from "@/components/max-width-wrapper"
import OAuthProviders from "@/components/oAuth-providers"

import LoginForm from "./_components/login-form"

interface LoginPageProps {}

const LoginPage: FC<LoginPageProps> = async ({}) => {
    return (
        <div className="relative">
            <MaxWidthWrapper className="flex min-h-screen items-center justify-center py-8">
                <Card className="w-full max-w-[400px]">
                    <CardHeader>
                        <Logo />
                        <CardTitle>Login</CardTitle>
                        <CardDescription>
                            Access your account and manage your blog
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-0">
                        <OAuthProviders />
                        <div className="relative my-4">
                            <p className="absolute left-1/2 top-1/2 flex size-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-background p-1 text-sm text-gray-600">
                                or
                            </p>
                            <Separator />
                        </div>

                        <LoginForm />
                    </CardContent>
                    <CardFooter className="block">
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

export default LoginPage
