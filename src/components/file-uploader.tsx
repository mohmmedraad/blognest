"use client"

import { useCallback, useEffect } from "react"
// import { ScrollArea } from "@/components/ui/scroll-area"
import {
    AudioWaveform,
    File,
    FileImage,
    FolderArchive,
    UploadCloud,
    Video,
    X,
} from "lucide-react"
import Dropzone, {
    type DropzoneProps,
    type FileRejection,
} from "react-dropzone"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import { useControllableState } from "@/hooks/use-controllable-state"
import { Input } from "@/components/ui/input"
import ProgressBar from "@/components/ui/progress"

import { ScrollArea } from "./ui/scroll-area"

interface FileUploaderProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Value of the uploader.
     * @type File[]
     * @default undefined
     * @example value={files}
     */
    value?: File[]

    /**
     * Function to be called when the value changes.
     * @type React.Dispatch<React.SetStateAction<File[]>>
     * @default undefined
     * @example onValueChange={(files) => setFiles(files)}
     */
    onValueChange?: React.Dispatch<React.SetStateAction<File[]>>

    /**
     * Function to be called when files are uploaded.
     * @type (files: File[]) => Promise<void>
     * @default undefined
     * @example onUpload={(files) => uploadFiles(files)}
     */
    onUpload?: (files: File[]) => Promise<void>

    /**
     * Progress of the uploaded files.
     * @type Record<string, number> | undefined
     * @default undefined
     * @example progresses={{ "file1.png": 50 }}
     */
    progresses?: Record<string, number>

    /**
     * Accepted file types for the uploader.
     * @type { [key: string]: string[]}
     * @default
     * ```ts
     * { "image/*": [] }
     * ```
     * @example accept={["image/png", "image/jpeg"]}
     */
    accept?: DropzoneProps["accept"]

    /**
     * Maximum file size for the uploader.
     * @type number | undefined
     * @default 1024 * 1024 * 2 // 2MB
     * @example maxSize={1024 * 1024 * 2} // 2MB
     */
    maxSize?: DropzoneProps["maxSize"]

    /**
     * Maximum number of files for the uploader.
     * @type number | undefined
     * @default 1
     * @example maxFiles={5}
     */
    maxFiles?: DropzoneProps["maxFiles"]

    /**
     * Whether the uploader should accept multiple files.
     * @type boolean
     * @default false
     * @example multiple
     */
    multiple?: boolean

    /**
     * Whether the uploader is disabled.
     * @type boolean
     * @default false
     * @example disabled
     */
    disabled?: boolean
}

enum FileTypes {
    Image = "image",
    Pdf = "pdf",
    Audio = "audio",
    Video = "video",
    Other = "other",
}

const ImageColor = {
    bgColor: "bg-purple-600",
    fillColor: "fill-purple-600",
}

const PdfColor = {
    bgColor: "bg-blue-400",
    fillColor: "fill-blue-400",
}

const AudioColor = {
    bgColor: "bg-yellow-400",
    fillColor: "fill-yellow-400",
}

const VideoColor = {
    bgColor: "bg-green-400",
    fillColor: "fill-green-400",
}

const OtherColor = {
    bgColor: "bg-gray-400",
    fillColor: "fill-gray-400",
}

export default function FileUploader({
    value: valueProp,
    onValueChange,
    onUpload,
    progresses,
    accept = { "image/*": [] },
    maxSize = 1024 * 1024 * 2,
    maxFiles = 1,
    multiple = false,
    disabled = false,
    className,
    ...dropzoneProps
}: FileUploaderProps) {
    const [files, setFiles] = useControllableState({
        prop: valueProp,
        onChange: onValueChange,
    })

    const onDrop = useCallback(
        async (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
            if (!multiple && maxFiles === 1 && acceptedFiles.length > 1) {
                toast.error("Cannot upload more than 1 file at a time")
                return
            }

            if ((files?.length ?? 0) + acceptedFiles.length > maxFiles) {
                toast.error(`Cannot upload more than ${maxFiles} files`)
                return
            }

            const newFiles = acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                })
            )
            const updatedFiles = files ? [...files, ...newFiles] : newFiles

            setFiles(updatedFiles)

            if (rejectedFiles.length > 0) {
                rejectedFiles.forEach(({ file }) => {
                    toast.error(`File ${file.name} was rejected`)
                })
            }

            if (
                onUpload &&
                updatedFiles.length > 0 &&
                updatedFiles.length <= maxFiles
            ) {
                const target =
                    updatedFiles.length > 0
                        ? `${updatedFiles.length} files`
                        : `file`

                toast.promise(onUpload(updatedFiles), {
                    loading: `Uploading ${target}...`,
                    success: () => {
                        setFiles([])
                        return `${target} uploaded`
                    },
                    error: `Failed to upload ${target}`,
                })
            }
        },
        [files, maxFiles, multiple, onUpload, setFiles]
    )

    function onRemove(index: number) {
        if (!files) return
        const newFiles = files.filter((_, i) => i !== index)
        setFiles(newFiles)
        onValueChange?.(newFiles)
    }

    // Revoke preview url when component unmounts
    useEffect(() => {
        return () => {
            if (!files) return
            files.forEach((file) => {
                if (isFileWithPreview(file)) {
                    URL.revokeObjectURL(file.preview)
                }
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const isDisabled = disabled || (files?.length ?? 0) >= maxFiles

    return (
        <div>
            <Dropzone
                onDrop={onDrop}
                accept={accept}
                maxSize={maxSize}
                maxFiles={maxFiles}
                multiple={maxFiles > 1 || multiple}
                disabled={isDisabled}
            >
                {({ getRootProps, getInputProps, isDragActive }) => (
                    <div>
                        <div
                            {...getRootProps()}
                            className={cn(
                                "relative flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 py-6 hover:bg-gray-100",
                                className
                            )}
                            {...dropzoneProps}
                        >
                            <div className=" text-center">
                                <div className=" mx-auto max-w-min rounded-md border p-2">
                                    <UploadCloud size={20} />
                                </div>
                                {isDragActive ? (
                                    <p className="font-semibold">
                                        Drop the files here
                                    </p>
                                ) : (
                                    <>
                                        <p className="mt-2 text-sm text-gray-600">
                                            <span className="font-semibold">
                                                Drag files
                                            </span>
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Click to upload files &#40;files
                                            should be under 10 MB &#41;
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>

                        <Input
                            {...getInputProps()}
                            id="dropzone-file"
                            accept="image/png, image/jpeg"
                            type="file"
                            className="hidden"
                        />
                    </div>
                )}
            </Dropzone>
            {files?.length ? (
                <div>
                    <ScrollArea className="h-40">
                        <p className="my-2 mt-6 text-sm font-medium text-muted-foreground">
                            Files to upload
                        </p>
                        <div className="space-y-2 pr-3">
                            {files?.map((file, index) => {
                                return (
                                    <FileCard
                                        key={index}
                                        file={file}
                                        progress={progresses?.[file.name]}
                                        onRemove={() => onRemove(index)}
                                    />
                                )
                            })}
                        </div>
                    </ScrollArea>
                </div>
            ) : null}
        </div>
    )
}

interface FileCardProps {
    file: File
    onRemove: () => void
    progress?: number
}

function FileCard({ file, progress, onRemove }: FileCardProps) {
    return (
        <div className="group flex justify-between gap-2 overflow-hidden rounded-lg border border-slate-100 pr-2 hover:pr-0">
            <div className="flex flex-1 items-center p-2">
                <div className="text-white">
                    {getFileIconAndColor(file).icon}
                </div>

                <div className="ml-2 w-full space-y-1">
                    <div className="flex justify-between text-sm">
                        <p className="text-muted-foreground ">
                            {file.name.slice(0, 25)}
                        </p>
                        <span className="text-xs">{progress}%</span>
                    </div>
                    <ProgressBar
                        progress={progress!}
                        className={getFileIconAndColor(file).color}
                    />
                </div>
            </div>
            <button
                onClick={onRemove}
                className="hidden cursor-pointer items-center justify-center bg-red-500 px-2 text-white transition-all group-hover:flex"
            >
                <X size={20} />
            </button>
        </div>
    )
}

function isFileWithPreview(file: File): file is File & { preview: string } {
    return "preview" in file && typeof file.preview === "string"
}

function getFileIconAndColor(file: File) {
    if (file.type.includes(FileTypes.Image)) {
        return {
            icon: <FileImage size={40} className={ImageColor.fillColor} />,
            color: ImageColor.bgColor,
        }
    }

    if (file.type.includes(FileTypes.Pdf)) {
        return {
            icon: <File size={40} className={PdfColor.fillColor} />,
            color: PdfColor.bgColor,
        }
    }

    if (file.type.includes(FileTypes.Audio)) {
        return {
            icon: <AudioWaveform size={40} className={AudioColor.fillColor} />,
            color: AudioColor.bgColor,
        }
    }

    if (file.type.includes(FileTypes.Video)) {
        return {
            icon: <Video size={40} className={VideoColor.fillColor} />,
            color: VideoColor.bgColor,
        }
    }

    return {
        icon: <FolderArchive size={40} className={OtherColor.fillColor} />,
        color: OtherColor.bgColor,
    }
}
