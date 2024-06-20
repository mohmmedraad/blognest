"use client"

import React, { useRef } from "react"
import { cn } from "@udecode/cn"
import { CommentsProvider } from "@udecode/plate-comments"
import { Plate, type TElement } from "@udecode/plate-common"
// import { ELEMENT_PARAGRAPH } from "@udecode/plate-paragraph"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

import { commentsUsers, myUserId } from "@/lib/plate/comments"
import { MENTIONABLES } from "@/lib/plate/mentionables"
import { plugins } from "@/lib/plate/plate-plugins"
import { CommentsPopover } from "@/components/plate-ui/comments-popover"
import { CursorOverlay } from "@/components/plate-ui/cursor-overlay"
import { Editor } from "@/components/plate-ui/editor"
import { FixedToolbar } from "@/components/plate-ui/fixed-toolbar"
import { FixedToolbarButtons } from "@/components/plate-ui/fixed-toolbar-buttons"
import { FloatingToolbar } from "@/components/plate-ui/floating-toolbar"
import { FloatingToolbarButtons } from "@/components/plate-ui/floating-toolbar-buttons"
import { MentionCombobox } from "@/components/plate-ui/mention-combobox"

interface PlateEditorProps {
    initialValue?: TElement[]
    articleId: string
}

export default function PlateEditor({
    initialValue,
    articleId,
}: PlateEditorProps) {
    const containerRef = useRef(null)

    return (
        <DndProvider backend={HTML5Backend}>
            <CommentsProvider users={commentsUsers} myUserId={myUserId}>
                <Plate plugins={plugins} initialValue={initialValue}>
                    <div
                        ref={containerRef}
                        className={cn(
                            "relative",
                            // Block selection
                            "[&_.slate-start-area-left]:!w-[64px] [&_.slate-start-area-right]:!w-[64px] [&_.slate-start-area-top]:!h-4"
                        )}
                    >
                        <FixedToolbar>
                            <FixedToolbarButtons articleId={articleId} />
                        </FixedToolbar>

                        <Editor
                            className="min-h-screen px-[96px] py-16"
                            autoFocus
                            focusRing={false}
                            variant="ghost"
                            size="md"
                        />

                        <FloatingToolbar>
                            <FloatingToolbarButtons />
                        </FloatingToolbar>

                        <MentionCombobox items={MENTIONABLES} />

                        <CommentsPopover />

                        <CursorOverlay containerRef={containerRef} />
                    </div>
                </Plate>
            </CommentsProvider>
        </DndProvider>
    )
}