import { useEffect, useState } from "react"
import { updateArticleContentAction } from "@/actions/articles/update-article-content-action"
import { useEditorMounted, useEditorState } from "@udecode/plate-common"
import { usePrevious } from "@uidotdev/usehooks"
import { toast } from "sonner"

import { useServerActionMutation } from "./server-action-hooks"
import { useDebounce } from "./use-debounce"
import { useOnlineStatus } from "./use-is-online-hook"

type SaveState = "Saved" | "Not Saved" | null
export const useSaveArticleContent = (articleId: string) => {
    const [saving, setSaving] = useState<SaveState>(null)
    const isOnline = useOnlineStatus()
    const prevIsOnline = usePrevious(isOnline)
    const editor = useEditorState()
    const editorValue = useDebounce(editor.children, 1000)
    const isMounted = useEditorMounted()

    const { mutate: saveContent, mutateAsync: saveContentAsync } =
        useServerActionMutation(updateArticleContentAction, {
            onMutate: () => {
                setSaving(null)
            },
            onError: (error) => {
                const errorCode = error.code
                setSaving("Not Saved")

                if (errorCode === "NOT_FOUND") {
                    return toast.error(
                        "Article not found. Try refreshing the page."
                    )
                }

                toast.error(
                    "Something went wrong. Try to the article manually by pressing Ctrl + S."
                )
            },
        })

    // Save content when user presses Ctrl + S
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.key === "s") {
                event.preventDefault()
                handleSaveContentAsync()
            }
        }

        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Save content when editor value changes
    useEffect(() => {
        if (!isMounted) return
        handleSaveContent()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editorValue])

    // Save content when user goes offline and comes back online
    useEffect(() => {
        if (isOnline && prevIsOnline === false) {
            handleSaveContentAsync()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOnline])

    function handleSaveContent() {
        if (!isOnline) {
            return handleIsOffline()
        }

        if (editor.children.length === 0) {
            return handleIsEditorEmpty()
        }

        saveContent({ id: articleId, content: editor.children })
    }

    function handleSaveContentAsync() {
        if (!isOnline) {
            return handleIsOffline()
        }

        if (editor.children.length === 0) {
            return handleIsEditorEmpty()
        }

        toast.promise(
            saveContentAsync({ id: articleId, content: editor.children }),
            {
                loading: "Saving your changes...",
                success: () => {
                    setSaving("Saved")
                    return "Your changes have been saved."
                },
            }
        )
    }

    // Show toast message when user try to save content while offline
    function handleIsOffline() {
        toast.error(
            "You are offline. Please check your internet connection. Your changes will be saved once you are back online."
        )
    }

    // Show toast message when user try to save content while editor is empty
    function handleIsEditorEmpty() {
        toast.error("Article content cannot be empty.")
    }
    return {
        saving,
    }
}
