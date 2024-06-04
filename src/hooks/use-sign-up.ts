import Link from "next/link"
import { useRouter } from "next/navigation"
import { signUpAction } from "@/actions/auth/sign-up-actions"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { type z } from "zod"

import { handleGenericError } from "@/lib/utils"
import { signUpSchema } from "@/lib/validations/auth"

export const useSignUp = () => {
    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    const router = useRouter()

    const { mutate, isPending } = useMutation({
        mutationFn: signUpAction,
        onSuccess: () => {
            toast.success("Check your inbox to verify your account", {
                action: {
                    label: "Go to inbox",
                    onClick: () =>
                        router.push("https://mail.google.com/mail/u/0/#inbox"),
                },
            })
        },
        onError: (error) => {
            console.log(error)
            if (error.message === "CONFLICT") {
                return form.setError("email", {
                    message: "This email is already exist",
                })
            }

            if (error.message === "INVALID_DATA") {
                return toast.error("Your data is invalid")
            }
            return handleGenericError()
        },
    })

    return {
        form,
        signUp: mutate,
        isPending,
    }
}
