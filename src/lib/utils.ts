import { clsx, type ClassValue } from "clsx"
import { toast } from "sonner"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const handleGenericError = () => {
    return toast.error("An error occurred. Please try again later.")
}

export function absoluteUrl(path: string) {
    if (process.env.NEXT_PUBLIC_VERCEL_URL)
        return `${process.env.NEXT_PUBLIC_VERCEL_URL}${path}`
    return `http://localhost:${process.env.PORT ?? 3000}${path}`
}

/**
 * Generates a site URL with a subdomain based on the provided slug.
 * @param {string} slug - The subdomain slug to be added to the URL.
 * @returns A string The generated site URL with the subdomain.
 */
export function siteUrl(slug: string, protocol = true) {
    const url = new URL(process.env.NEXT_PUBLIC_VERCEL_URL!)
    if (protocol) return `${url.protocol}//${slug}.${url.hostname}`
    return `${slug}.${url.hostname}`
}

/**
 * Creates a path string by joining elements of the segments array up to and including the specified targetSegment.
 *
 * @param {targetSegment} The path segment to include in the final path.
 * @param {segments} An array of path segments.
 * @returns A string representing the path up to and including the specified targetSegment.
 */
export function buildPath(targetSegment: string, segments: string[]) {
    const targetIndex = segments.indexOf(targetSegment)
    if (targetIndex === -1) {
        return ""
    }
    return segments.slice(0, targetIndex + 1).join("/")
}

/**
 * Capitalizes the first letter of the given input string.
 *
 * @param {inputString} The string to capitalize.
 * @returns A new string with the first letter capitalized.
 */
export function capitalizeFirstLetter(inputString: string) {
    if (!inputString.trim()) {
        return inputString
    }
    return inputString.charAt(0).toUpperCase() + inputString.slice(1)
}

export function formatBytes(
    bytes: number,
    opts: {
        decimals?: number
        sizeType?: "accurate" | "normal"
    } = {}
) {
    const { decimals = 0, sizeType = "normal" } = opts

    const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
    const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"]
    if (bytes === 0) return "0 Byte"
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
        sizeType === "accurate"
            ? accurateSizes[i] ?? "Bytest"
            : sizes[i] ?? "Bytes"
    }`
}
