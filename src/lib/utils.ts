import { env } from "@/env"
import { type TElement } from "@udecode/plate-common"
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

type GetUpdatedValuesReturn<T> =
    | {
          sameEntries: true
          updatedValues: undefined
      }
    | { sameEntries: false; updatedValues: Partial<T> }

export function getUpdatedValues<T extends Record<string, unknown>>(
    oldValues: Partial<T>,
    newValues: T
): GetUpdatedValuesReturn<T> {
    const updatedValues: Partial<T> = {}
    for (const key in newValues) {
        if (newValues[key] !== oldValues[key]) {
            updatedValues[key] = newValues[key]
        }
    }
    if (Object.keys(updatedValues).length === 0) {
        return { sameEntries: true, updatedValues: undefined }
    }
    return {
        sameEntries: false,
        updatedValues,
    }
}

export function dataURLtoFile(dataUrl: string, filename: string) {
    const arr = dataUrl.split(",")
    // @ts-expect-error error
    const mime = arr[0]?.match(/:(.*?);/)[1]
    // @ts-expect-error error
    const bstr = atob(arr[arr.length - 1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename, { type: mime })
}

export const getValidSubdomain = (host?: string | null) => {
    if (!host) {
        return null
    }
    const url = new URL(env.VERCEL_URL)

    const [subdomain] = host?.split(".")
    const isValidSubdomain = subdomain && !subdomain.includes(url.hostname)

    if (isValidSubdomain) {
        return subdomain
    }

    return null
}

export function extractArticleImage(content: TElement[]) {
    const image = content.find((item) => item.type === "img")
    return (image?.url as string) || null
}
