import { type FC } from "react"
import {
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface ArticleViewsChartProps {
    data: {
        name: string
        views: number
    }[]
}

export const ArticleViewsChart: FC<ArticleViewsChartProps> = ({ data }) => {
    return (
        <Card className="mt-6">
            <CardHeader>
                <CardTitle>Articles Views</CardTitle>
                <CardDescription>Your Articles Views Overview</CardDescription>
            </CardHeader>
            <CardContent className="pb-4">
                <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={data}
                            margin={{
                                top: 5,
                                right: 10,
                                left: 10,
                                bottom: 0,
                            }}
                        >
                            <XAxis dataKey="name" stroke="rgb(107 114 128)" />
                            <YAxis stroke="rgb(107 114 128)" />
                            <Tooltip
                                content={({ active, payload }) => {
                                    if (active && payload?.length) {
                                        return (
                                            <div className="rounded-lg border bg-background p-2 shadow-sm">
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="flex flex-col">
                                                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                            Views
                                                        </span>
                                                        <span className="font-bold">
                                                            {payload[0]?.value}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }

                                    return null
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="views"
                                strokeWidth={2}
                                activeDot={{
                                    r: 8,
                                    style: { fill: "var(--primary)" },
                                }}
                                style={
                                    {
                                        stroke: "var(--primary)",
                                        "--primary": `hsl(262.1 83.3% 57.8%)`,
                                    } as React.CSSProperties
                                }
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}
