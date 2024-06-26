"use client"

import { type FC } from "react"

import { ArticleViewsChart } from "./articles-views-chart"
import { SitesVisitersChart } from "./sites-visiters-chart"

interface ChartsProps {
    sitesVisiters: {
        name: string
        visiters: number
    }[]

    articlesViews: {
        name: string
        views: number
    }[]
}

const Charts: FC<ChartsProps> = ({ sitesVisiters, articlesViews }) => {
    return (
        <div className="mt-8">
            <SitesVisitersChart data={sitesVisiters} />
            <ArticleViewsChart data={articlesViews} />
        </div>
    )
}

export default Charts
