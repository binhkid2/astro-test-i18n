"use client"

import type React from "react"
import { useState } from "react"
import { Plus, Loader2, ExternalLink, X } from "lucide-react" 
import { useQuickLinksStore } from "@/store/QuickLinkStore"
import { fetchSiteMetadata } from "@/mockData/quickLink"

export function AddQuickLinkModal() {
  const { addQuickLink } = useQuickLinksStore()
  const [isOpen, setIsOpen] = useState(false)
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [customData, setCustomData] = useState({
    name: "",
    favicon: "",
  })
  const [showCustomization, setShowCustomization] = useState(false)

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url.trim()) return

    setIsLoading(true)
    try {
      const metadata = await fetchSiteMetadata(url)
      setCustomData({
        name: metadata.title,
        favicon: metadata.favicon,
      })
      setShowCustomization(true)
    } catch (error) {
      console.error("Failed to fetch metadata:", error)
      setCustomData({
        name: new URL(url).hostname,
        favicon: "🌐",
      })
      setShowCustomization(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = () => {
    if (!customData.name || !url) return

    addQuickLink({
      name: customData.name,
      url: url.startsWith("http") ? url : `https://${url}`,
      favicon: customData.favicon,
    })

    setUrl("")
    setCustomData({ name: "", favicon: "" })
    setShowCustomization(false)
    setIsOpen(false)
  }

  const handleClose = () => {
    setUrl("")
    setCustomData({ name: "", favicon: "" })
    setShowCustomization(false)
    setIsOpen(false)
  }

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center h-9 px-3 bg-white border border-gray-200 text-gray-900 hover:bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
      >
        <Plus className="w-4 h-4" />
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
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Add Quick Link</h2>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {!showCustomization ? (
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
              ) : (
                <div className="space-y-4">
                  {/* Preview */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-900">Preview</label>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
                        {customData.favicon.startsWith("http") ? (
                          <>
                            <img
                              src={customData.favicon || "/placeholder.svg"}
                              alt="favicon"
                              className="w-8 h-8 rounded"
                              onError={(e) => {
                                e.currentTarget.style.display = "none"
                                e.currentTarget.nextElementSibling!.textContent = "🌐"
                              }}
                            />
                            <span className="hidden">🌐</span>
                          </>
                        ) : (
                          customData.favicon
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900 font-medium">{customData.name}</p>
                        <p className="text-gray-600 text-sm">{url}</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>

                  {/* Customization */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                        Display Name
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
                      <label htmlFor="favicon" className="block text-sm font-medium text-gray-900">
                        Icon (Emoji or URL)
                      </label>
                      <input
                        id="favicon"
                        value={customData.favicon}
                        onChange={(e) => setCustomData({ ...customData, favicon: e.target.value })}
                        placeholder="🌐 or https://example.com/favicon.ico"
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
                      onClick={handleSave}
                      disabled={!customData.name.trim()}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Add Link
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