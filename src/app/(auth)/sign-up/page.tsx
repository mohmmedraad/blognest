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

import SingUpForm from "./_components/sign-up-form"

interface SignUpPageProps {}

const SignUpPage: FC<SignUpPageProps> = async ({}) => {
    return (
        <div className="relative h-screen">
            <MaxWidthWrapper className="flex min-h-screen items-center justify-center">
                <Card className="w-full max-w-[400px]">
                    <CardHeader>
                        <Logo />
                        <CardTitle>Sign up</CardTitle>
                        <CardDescription>
                            Create your first blog by signing up
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

                        <SingUpForm />
                    </CardContent>
                    <CardFooter className="block">
                        <Separator className="my-4" />
                        <p className="text-sm text-gray-500">
                            Already have an account?{" "}
                            <Link
                                href={"/login"}
                                className="text-primary hover:underline hover:underline-offset-4"
                            >
                                Go to Login
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </MaxWidthWrapper>
            <Background />
        </div>
    )
}

export default SignUpPage
