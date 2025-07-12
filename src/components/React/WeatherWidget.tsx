"use client"

import { MapPin, Eye, Wind, Thermometer } from "lucide-react" 

interface WeatherData {
  location: string
  temperature: number
  condition: string
  humidity: number
  windSpeed: number
  visibility: number
  icon: string
}

interface WeatherWidgetProps {
  weatherData: WeatherData
  locationPermission: string
  onRequestLocation: () => void
}

export function WeatherWidget({ weatherData, locationPermission, onRequestLocation }: WeatherWidgetProps) {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 rounded-lg">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-white" />
            <span className="text-white text-sm">{weatherData.location}</span>
          </div>
          {locationPermission === "prompt" && (
            <button
              onClick={onRequestLocation}
              className="px-3 py-1 text-xs text-white hover:bg-white/20 rounded-md transition-all duration-300 bg-transparent border-0 cursor-pointer"
            >
              Get Location
            </button>
          )}
        </div>

        <div className="flex items-center gap-4 mb-3">
          <span className="text-4xl animate-bounce">{weatherData.icon}</span>
          <div>
            <div className="text-2xl font-bold text-white">{weatherData.temperature}°C</div>
            <div className="text-white/70 text-sm">{weatherData.condition}</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="flex items-center gap-1 text-white/70">
            <Eye className="w-3 h-3" />
            <span>{weatherData.visibility}km</span>
          </div>
          <div className="flex items-center gap-1 text-white/70">
            <Wind className="w-3 h-3" />
            <span>{weatherData.windSpeed}km/h</span>
          </div>
          <div className="flex items-center gap-1 text-white/70">
            <Thermometer className="w-3 h-3" />
            <span>{weatherData.humidity}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}