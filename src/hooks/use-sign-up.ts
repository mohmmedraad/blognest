import { useRouter } from "next/navigation"
import { signUpAction } from "@/actions/auth/sign-up-actions"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { type z } from "zod"

import { handleGenericError } from "@/lib/utils"
import { signUpSchema } from "@/lib/validations/auth"

import { useServerActionMutation } from "./server-action-hooks"

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

    const { mutate, isPending } = useServerActionMutation(signUpAction, {
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
            const errorCode = error.code
            if (errorCode === "CONFLICT") {
                return form.setError("email", {
                    message: "This email is already exist",
                })
            }

            if (errorCode === "INPUT_PARSE_ERROR") {
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
