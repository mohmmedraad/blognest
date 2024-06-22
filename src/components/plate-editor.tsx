"use client"

import React, { useRef } from "react"
import { type Prisma } from "@prisma/client"
import { cn } from "@udecode/cn"
import { Plate, type TElement } from "@udecode/plate-common"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

import { MENTIONABLES } from "@/lib/plate/mentionables"
import { plugins } from "@/lib/plate/plate-plugins"
import { CursorOverlay } from "@/components/plate-ui/cursor-overlay"
import { Editor } from "@/components/plate-ui/editor"
import { FloatingToolbar } from "@/components/plate-ui/floating-toolbar"
import { FloatingToolbarButtons } from "@/components/plate-ui/floating-toolbar-buttons"
import { MentionCombobox } from "@/components/plate-ui/mention-combobox"

interface PlateEditorProps {
    content: Prisma.JsonValue
    children: React.ReactNode
}

export default function PlateEditor({ content, children }: PlateEditorProps) {
    const containerRef = useRef(null)

    return (
        <DndProvider backend={HTML5Backend}>
            <Plate
                plugins={plugins}
                initialValue={content as unknown as TElement[]}
            >
                <div
                    ref={containerRef}
                    className={cn(
                        "relative",
                        // Block selection
                        "[&_.slate-start-area-left]:!w-[64px] [&_.slate-start-area-right]:!w-[64px] [&_.slate-start-area-top]:!h-4"
                    )}
                >
                    {children}

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

                    <CursorOverlay containerRef={containerRef} />
                </div>
            </Plate>
        </DndProvider>
    )
}
