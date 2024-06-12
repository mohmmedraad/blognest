"use client"

import { type Dispatch, type SetStateAction } from "react"
import { MoveLeft, MoveRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface DataTablePaginationProps {
    hasNextPage: boolean
    hasPreviousPage: boolean
    setPage: Dispatch<SetStateAction<number>>
}

export function DataTablePagination({
    hasNextPage,
    hasPreviousPage,
    setPage,
}: DataTablePaginationProps) {
    return (
        <div className="p-6">
            <div>
                <div className="flex items-center justify-between">
                    <Button
                        className={cn({
                            "pointer-events-none opacity-50": !hasPreviousPage,
                        })}
                        variant={"outline"}
                        disabled={!hasPreviousPage}
                        onClick={() => setPage((prev) => prev - 1)}
                    >
                        <span className="sr-only">Go to previous page</span>
                        <MoveLeft className="mr-2 size-4" />
                        <span className="xs:block hidden">Previous</span>
                    </Button>
                    <Button
                        className={cn({
                            "pointer-events-none opacity-50": !hasNextPage,
                        })}
                        variant={"outline"}
                        disabled={!hasNextPage}
                        onClick={() => setPage((prev) => prev + 1)}
                    >
                        <span className="sr-only">Go to next page</span>
                        <span className="xs:block hidden">Next</span>

                        <MoveRight className="ml-2 size-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
