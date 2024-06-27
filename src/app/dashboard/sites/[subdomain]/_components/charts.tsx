"use client"

import { type FC } from "react"
import { type Site } from "@prisma/client"

import { ArticleViewsChart } from "./articles-views-chart"
import { SiteVisitersChart } from "./site-visiters-chart"

interface ChartsProps {
    site: Pick<Site, "title">
    siteVisiters: {
        name: string
        visiters: number
    }[]

    articlesViews: {
        name: string
        views: number
    }[]
}

const Charts: FC<ChartsProps> = ({ site, siteVisiters, articlesViews }) => {
    return (
        <div className="mt-8">
            <SiteVisitersChart data={siteVisiters} site={site} />
            <ArticleViewsChart data={articlesViews} site={site} />
        </div>
    )
}

export default Charts
