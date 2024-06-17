/** @type {import('next').NextConfig} */
import MillionLint from "@million/lint"
import million from "million/compiler"

await import("./src/env.js")

const nextConfig = {
    images: {
        domains: ["avatar.vercel.sh", "utfs.io"],
    },
}

export default MillionLint.next({ rsc: true })(nextConfig)
