"use client"

import { useState, useEffect } from "react"
import { TrendingUp, ExternalLink, RefreshCw } from "lucide-react"
import { mockNewsData, getTimeAgo } from "../../mockData/newsData"
export interface NewsItem {
  id: string
  title: string
  description: string
  url: string
  imageUrl: string
  source: string
  publishedAt: Date
  category: string
}
 

export function HottestNewsWidget() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const categories = ["all", "Technology", "Environment", "Science", "Finance", "Health"]

  useEffect(() => {
    loadNews()
  }, [])

  const loadNews = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    setNews(mockNewsData)
    setIsLoading(false)
  }

  const filteredNews = selectedCategory === "all" ? news : news.filter((item) => item.category === selectedCategory)

  const refreshNews = () => {
    loadNews()
  }

  return (
    <div className="bg-white border border-gray-200 shadow-lg rounded-lg">
      <div className="p-6 pb-3">
        <div className="text-gray-900 flex items-center justify-between text-lg font-semibold">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Latest News
          </div>
          <button
            onClick={refreshNews}
            disabled={isLoading}
            className="h-6 w-6 p-0 bg-transparent hover:bg-gray-100 rounded-md transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>
      <div className="px-6 pb-6 space-y-4">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-1">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`text-xs h-6 px-2 transition-all duration-200 rounded-md ${
                selectedCategory === category
                  ? "bg-blue-100 text-blue-900"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* News List */}
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="flex gap-3">
                    <div className="w-16 h-12 bg-gray-200 rounded"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            filteredNews.map((item) => (
              <div
                key={item.id}
                className="group cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-all duration-200"
                onClick={() => window.open(item.url, "_blank")}
              >
                <div className="flex gap-3">
                  <div
                    className="w-16 h-12 bg-cover bg-center rounded flex-shrink-0"
                    style={{ backgroundImage: `url(${item.imageUrl})` }}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-gray-900 text-sm font-medium line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="bg-gray-100 text-gray-700 text-xs px-1 py-0 rounded-md">
                        {item.source}
                      </span>
                      <span className="text-gray-500 text-xs">{getTimeAgo(item.publishedAt)}</span>
                    </div>
                  </div>
                  <ExternalLink className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}