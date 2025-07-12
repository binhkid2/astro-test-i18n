"use client"

import type React from "react"
import { useState } from "react"
import { Plus, Zap, ArrowLeft, Loader2, ExternalLink, X } from "lucide-react" 
import { fetchSiteMetadata, type SiteMetadata } from "@/mockData/quickLink"
import { useWidgetStore } from "@/store/widgetStore"
export const WIDGET_TYPES = [
  { id: "weather", name: "Weather", description: "Current weather conditions" },
  { id: "clock", name: "World Clock", description: "Time zones around the world" },
  { id: "currency", name: "Currency", description: "Exchange rates" },
  { id: "dictionary", name: "Dictionary", description: "Language translation" },
  { id: "notes", name: "Notes", description: "Quick notes and reminders" },
  { id: "calendar", name: "Calendar", description: "Upcoming events" },
  { id: "news", name: "News", description: "Latest news headlines" },
  { id: "stocks", name: "Stocks", description: "Stock market updates" },
]

export function AddWidgetModal() {
  const { addWidget } = useWidgetStore()
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState<"category" | "url" | "customize">("category")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [metadata, setMetadata] = useState<SiteMetadata | null>(null)
  const [customData, setCustomData] = useState({
    name: "",
    description: "",
    backgroundImage: "",
  })

  const resetModal = () => {
    setStep("category")
    setSelectedCategory("")
    setUrl("")
    setMetadata(null)
    setCustomData({ name: "", description: "", backgroundImage: "" })
    setIsLoading(false)
  }

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
    setStep("url")
  }

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url.trim()) return

    setIsLoading(true)
    try {
      const siteMetadata = await fetchSiteMetadata(url)
      setMetadata(siteMetadata)
      setCustomData({
        name: siteMetadata.title,
        description: siteMetadata.description,
        backgroundImage: siteMetadata.ogImage,
      })
      setStep("customize")
    } catch (error) {
      console.error("Failed to fetch metadata:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveWidget = () => {
    if (!selectedCategory || !url || !customData.name) return

    addWidget({
      name: customData.name,
      description: customData.description,
      url: url,
      category: selectedCategory,
      backgroundImage: customData.backgroundImage,
    })

    resetModal()
    setIsOpen(false)
  }

  const handleClose = () => {
    resetModal()
    setIsOpen(false)
  }

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Widget
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50"
            onClick={handleClose}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                {step !== "category" && (
                  <button
                    onClick={() => setStep(step === "customize" ? "url" : "category")}
                    className="h-8 w-8 p-0 mr-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                )}
                <Zap className="w-5 h-5" />
                Add New Widget
              </h2>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Step 1: Category Selection */}
              {step === "category" && (
                <div className="space-y-4">
                  <p className="text-gray-600">Choose a category for your widget:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {WIDGET_TYPES.map((widget:any) => (
                      <div
                        key={widget.id}
                        className="bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 cursor-pointer hover:shadow-md rounded-lg overflow-hidden"
                        onClick={() => handleCategorySelect(widget.name)}
                      >
                        <div className="p-4 pb-2">
                          <h3 className="text-gray-900 text-lg flex items-center gap-2 font-semibold">
                            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                              <Zap className="w-4 h-4 text-white" />
                            </div>
                            {widget.name}
                          </h3>
                        </div>
                        <div className="px-4 pb-4">
                          <p className="text-gray-600 text-sm">{widget.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: URL Input */}
              {step === "url" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      Selected category: <span className="text-gray-900 font-semibold">{selectedCategory}</span>
                    </p>
                    <p className="text-gray-600">Enter the website URL for your widget:</p>
                  </div>

                  <form onSubmit={handleUrlSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="url" className="block text-sm font-medium text-gray-900">
                        Website URL
                      </label>
                      <input
                        id="url"
                        type="url"
                        placeholder="https://example.com"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={handleClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={!url.trim() || isLoading}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Fetching...
                          </>
                        ) : (
                          "Next"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Step 3: Customize Widget */}
              {step === "customize" && metadata && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      Category: <span className="text-gray-900 font-semibold">{selectedCategory}</span>
                    </p>
                    <p className="text-gray-600">
                      URL: <span className="text-gray-900 font-semibold">{url}</span>
                    </p>
                  </div>

                  {/* Preview */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-900">Preview</label>
                    <div className="bg-white border border-gray-200 overflow-hidden rounded-lg">
                      <div
                        className="aspect-video bg-cover bg-center relative"
                        style={{ backgroundImage: `url(${customData.backgroundImage})` }}
                      >
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="absolute bottom-3 right-3">
                          <ExternalLink className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">{customData.name}</h4>
                        <p className="text-gray-600 text-sm line-clamp-2">{customData.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Customization Form */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                        Widget Name
                      </label>
                      <input
                        id="name"
                        value={customData.name}
                        onChange={(e) => setCustomData({ ...customData, name: e.target.value })}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="description" className="block text-sm font-medium text-gray-900">
                        Description
                      </label>
                      <textarea
                        id="description"
                        value={customData.description}
                        onChange={(e) => setCustomData({ ...customData, description: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[80px]"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="backgroundImage" className="block text-sm font-medium text-gray-900">
                        Background Image URL
                      </label>
                      <input
                        id="backgroundImage"
                        type="url"
                        value={customData.backgroundImage}
                        onChange={(e) => setCustomData({ ...customData, backgroundImage: e.target.value })}
                        placeholder="https://example.com/image.jpg"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveWidget}
                      disabled={!customData.name.trim()}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Add Widget
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}