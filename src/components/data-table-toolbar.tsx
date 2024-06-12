"use client"

interface DataTableToolbarProps {
    children?: React.ReactNode
}

export function DataTableToolbar({ children }: DataTableToolbarProps) {
    return (
        <div className="flex items-center justify-between p-6">
            <div className="flex flex-1 items-center space-x-2">{children}</div>
        </div>
    )
}
