"use client"

import React, { useRef } from "react"
import { type Prisma } from "@prisma/client"
import { Plate, type TElement } from "@udecode/plate-common"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

import { plugins } from "@/lib/plate/plate-plugins"
import { cn } from "@/lib/utils"

import { Editor } from "./editor"

interface RenderPlateContentProps {
    content: Prisma.JsonValue
}

export default function RenderPlateContent({
    content,
}: RenderPlateContentProps) {
    const containerRef = useRef(null)

    return (
        <DndProvider backend={HTML5Backend}>
            <Plate
                plugins={plugins}
                initialValue={content as unknown as TElement[]}
                readOnly
            >
                <div
                    ref={containerRef}
                    className={cn(
                        "relative",
                        // Block selection
                        "[&_.slate-start-area-left]:!w-[64px] [&_.slate-start-area-right]:!w-[64px] [&_.slate-start-area-top]:!h-4"
                    )}
                >
                    <Editor
                        className="min-h-screen overflow-hidden"
                        autoFocus
                        focusRing={false}
                        variant="ghost"
                        size="md"
                    />
                </div>
            </Plate>
        </DndProvider>
    )
}
