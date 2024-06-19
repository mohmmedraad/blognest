import { useEffect, useState } from "react"
import { useEditorMounted, useEditorState } from "@udecode/plate-common"

import { useDebounce } from "./use-debounce"

type SaveState = "Saving..." | "Saved" | "Not Saved" | null
export const useSaveArticle = (articleId: string) => {
    const editor = useEditorState()
    const [saving, setSaving] = useState<SaveState>(null)
    const editorValue = useDebounce(editor.children)
    const isMounted = useEditorMounted()
    // TODO: Update article
    useEffect(() => {
        if (!isMounted) return

        console.log({ editorValue })
        setSaving("Saving...")
        setTimeout(() => {
            setSaving("Saved")
        }, 1000)
        setTimeout(() => {
            setSaving(null)
        }, 1500)
    }, [editorValue])

    return {
        saving,
    }
}
