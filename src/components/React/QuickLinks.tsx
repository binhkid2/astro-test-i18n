"use client"
import { Star, X } from "lucide-react"
import { useState } from "react"  
import { useQuickLinksStore } from "@/store/QuickLinkStore"
import { AddQuickLinkModal } from "./AddQuickLinkModal"

export function QuickLinks() {
  const { quickLinks, removeQuickLink } = useQuickLinksStore()
  const [showDeleteButtons, setShowDeleteButtons] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 text-yellow-500" />
          <span className="text-sm font-medium">Quick Access</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowDeleteButtons(!showDeleteButtons)}
            className="text-xs px-2 py-1 rounded hover:bg-gray-100 transition-colors"
          >
            {showDeleteButtons ? "Done" : "Edit"}
          </button>
          <AddQuickLinkModal />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {quickLinks.map((link) => (
          <div
            key={link.id}
            className="group relative flex flex-col items-center gap-2 p-3 rounded-lg border hover:bg-gray-50 transition-all duration-200 cursor-pointer"
            onClick={() => window.open(link.url, "_blank")}
          >
            <div className="flex items-center justify-center w-8 h-8 text-lg">
              {link.favicon.startsWith("http") ? (
                <>
                  <img
                    src={link.favicon}
                    alt=""
                    className="w-full h-full object-cover rounded"
                    onError={(e) => {
                      e.currentTarget.style.display = "none"
                      e.currentTarget.nextElementSibling!.textContent = "🌐"
                    }}
                  />
                  <span className="hidden">🌐</span>
                </>
              ) : (
                link.favicon
              )}
            </div>
            <span className="text-xs text-center truncate w-full">
              {link.name}
            </span>
            
            {showDeleteButtons && quickLinks.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  removeQuickLink(link.id)
                }}
                className="absolute -top-2 -right-2 h-6 w-6 p-0 bg-red-500 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}