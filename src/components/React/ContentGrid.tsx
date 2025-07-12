"use client"

import { useState } from "react"
import { Bookmark, ExternalLink, X, Crown, Lock } from "lucide-react"
import { AddWidgetModal } from "./AddWidgetModal" 
import { useUserStore } from "@/store/userStore"
import { useWidgetStore } from "@/store/widgetStore"

export function ContentGrid() {
  const { widgets, removeWidget } = useWidgetStore()
  const { isSignedIn, user, setShowSignInPopup } = useUserStore()
  const [showDeleteButtons, setShowDeleteButtons] = useState(false)

  // Add pro status to some widgets for demo
  const widgetsWithPro = widgets.map((widget, index) => ({
    ...widget,
    isPro: index % 3 === 0, // Every 3rd widget is pro
  }))

  const handleWidgetClick = (widget: any) => {
    if (widget.isPro && (!isSignedIn || !user?.isPro)) {
      setShowSignInPopup(true)
      return
    }
    window.open(widget.url, "_blank")
  }

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-gray-900 font-semibold text-xl flex items-center gap-2">
          <Bookmark className="w-5 h-5" />
          Featured Content
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowDeleteButtons(!showDeleteButtons)}
            className="text-xs px-3 py-1.5 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            {showDeleteButtons ? "Done" : "Edit"}
          </button>
          <AddWidgetModal />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {widgetsWithPro.map((widget, index) => (
          <div key={widget.id} className="relative group">
            <div
              className={`bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 cursor-pointer group overflow-hidden shadow-md hover:shadow-lg rounded-lg ${
                widget.isPro && (!isSignedIn || !user?.isPro) ? "opacity-75" : ""
              }`}
              onClick={() => handleWidgetClick(widget)}
            >
              {/* Pro Badge */}
              {widget.isPro && (
                <div className="absolute top-3 left-3 z-10">
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-yellow-500 text-white shadow-lg">
                    <Crown className="w-3 h-3 mr-1" />
                    PRO
                  </span>
                </div>
              )}

              <div
                className="aspect-video bg-cover bg-center relative overflow-hidden"
                style={{ backgroundImage: `url(${widget.backgroundImage})` }}
              >
                <div className="absolute inset-0 bg-black/20"></div>

                {/* Lock overlay for non-pro users */}
                {widget.isPro && (!isSignedIn || !user?.isPro) && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="text-center">
                      <Lock className="w-8 h-8 text-white/80 mx-auto mb-2" />
                      <p className="text-white/80 text-sm font-medium">Pro Only</p>
                    </div>
                  </div>
                )}

                <div className="absolute top-3 right-3">
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-white/90 text-gray-900">
                    {widget.category}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="w-4 h-4 text-white" />
                </div>
              </div>
              
              <div className="p-4">
                <h4 className="font-semibold text-gray-900 mb-2 line-clamp-1">{widget.name}</h4>
                <p className="text-gray-600 text-sm line-clamp-2">{widget.description}</p>
              </div>
            </div>

            {showDeleteButtons && widgets.length > 1 && (
              <button
                onClick={() => removeWidget(widget.id)}
                className="absolute -top-2 -right-2 h-6 w-6 p-0 bg-red-500 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 z-10 flex items-center justify-center"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}