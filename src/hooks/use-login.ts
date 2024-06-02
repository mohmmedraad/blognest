import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { type z } from "zod"

import { loginSchema } from "@/lib/validations/auth"

export const useLogin = () => {
    const router = useRouter()
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const { mutate, isPending } = useMutation({
        mutationFn: async (payload: z.infer<typeof loginSchema>) => {
            const response = await signIn("credentials", {
                email: payload.email,
                password: payload.password,
                redirect: false,
            })

            if (!response?.ok) {
                throw new Error("INVALID_CREDENTIALS")
            }
        },
        onSuccess: () => {
            toast.success("Your are successfully logged in")
            return router.push("/dashboard")
        },
        onError: () => {
            return toast.error(
                "Something went wrong please check your Email or Password"
            )
        },
    })

    return {
        form,
        login: mutate,
        isPending,
    }
}
