import { env } from "@/env"
import { db } from "@/server/db"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { compare } from "bcrypt"
import {
    getServerSession,
    type DefaultSession,
    type NextAuthOptions,
} from "next-auth"
import { type Adapter } from "next-auth/adapters"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

import { loginSchema } from "@/lib/validations/auth"

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id: string
            // ...other properties
            // role: UserRole;
        } & DefaultSession["user"]
    }

    // interface User {
    //   // ...other properties
    //   // role: UserRole;
    // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    callbacks: {
        session: ({ session, token }) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                },
            }
        },
        async jwt({ token, user }) {
            const dbUser = await db.user.findFirst({
                where: {
                    email: token.email,
                },
            })

            if (!dbUser) {
                token.id = user.id
                return token
            }

            return {
                id: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                picture: dbUser.image,
            }
        },
    },
    pages: {
        signIn: "/login",
    },
    adapter: PrismaAdapter(db) as Adapter,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                const { success, data } = loginSchema.safeParse(credentials)

                if (!success) {
                    return null
                }
                const user = await db.user.findFirst({
                    select: {
                        id: true,
                        name: true,
                        password: true,
                        emailVerified: true,
                    },
                    where: {
                        email: data.email,
                    },
                })

                if (!user?.password) {
                    return null
                }

                const isPasswordMatch = await compare(
                    data.password,
                    user.password
                )

                if (!isPasswordMatch) {
                    return null
                }

                return user
            },
        }),
        GoogleProvider({
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
        }),
    ],
}

export const getServerAuthSession = () => getServerSession(authOptions)
