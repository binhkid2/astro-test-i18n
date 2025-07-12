"use client"

import { useState } from "react"
import { TrendingUp, TrendingDown, Plus, X, ChevronDown } from "lucide-react"

interface CurrencyRate {
  id: string
  currency: string
  rate: number
  change: number
  flag: string
}

const availableCurrencies = [
  { currency: "USD", flag: "🇺🇸", rate: 0.0067, change: -0.2 },
  { currency: "EUR", flag: "🇪🇺", rate: 0.0061, change: 0.1 },
  { currency: "GBP", flag: "🇬🇧", rate: 0.0053, change: -0.1 },
  { currency: "CNY", flag: "🇨🇳", rate: 0.048, change: 0.3 },
  { currency: "KRW", flag: "🇰🇷", rate: 8.9, change: -0.5 },
]

export function CurrencyWidget() {
  const [rates, setRates] = useState<CurrencyRate[]>([
    { id: "1", currency: "USD", rate: 0.0067, change: -0.2, flag: "🇺🇸" },
    { id: "2", currency: "EUR", rate: 0.0061, change: 0.1, flag: "🇪🇺" },
    { id: "3", currency: "GBP", rate: 0.0053, change: -0.1, flag: "🇬🇧" },
    { id: "4", currency: "CNY", rate: 0.048, change: 0.3, flag: "🇨🇳" },
    { id: "5", currency: "KRW", rate: 8.9, change: -0.5, flag: "🇰🇷" },
  ])
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState("")
  const [showDropdown, setShowDropdown] = useState(false)

  const addCurrency = () => {
    const currency = availableCurrencies.find((curr) => curr.currency === selectedCurrency)
    if (currency && !rates.find((rate) => rate.currency === selectedCurrency)) {
      const newRate: CurrencyRate = {
        id: Date.now().toString(),
        currency: currency.currency,
        rate: currency.rate,
        change: currency.change,
        flag: currency.flag,
      }
      setRates([...rates, newRate])
      setSelectedCurrency("")
      setShowAddForm(false)
    }
  }

  const removeCurrency = (id: string) => {
    setRates(rates.filter((rate) => rate.id !== id))
  }

  const availableOptions = availableCurrencies.filter((curr) => !rates.find((rate) => rate.currency === curr.currency))

  return (
    <div className="bg-white border border-gray-200 shadow-lg rounded-lg">
      <div className="p-6 pb-3">
        <div className="text-gray-900 flex items-center justify-between text-lg font-semibold">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Yen Rates
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="h-6 w-6 p-0 bg-transparent hover:bg-gray-100 rounded-md transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="px-6 pb-6 space-y-3">
        {showAddForm && (
          <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-full flex items-center justify-between border border-gray-300 rounded-md px-3 py-2 text-sm bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <span className="text-gray-500">
                  {selectedCurrency ? (
                    <div className="flex items-center gap-2">
                      <span>{availableCurrencies.find(c => c.currency === selectedCurrency)?.flag}</span>
                      <span>{selectedCurrency}</span>
                    </div>
                  ) : (
                    "Select currency..."
                  )}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
              {showDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                  {availableOptions.map((curr) => (
                    <button
                      key={curr.currency}
                      onClick={() => {
                        setSelectedCurrency(curr.currency)
                        setShowDropdown(false)
                      }}
                      className="w-full px-3 py-2 text-left hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span>{curr.flag}</span>
                        <span>{curr.currency}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={addCurrency}
                disabled={!selectedCurrency}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
              >
                Add
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {rates.map((rate) => (
          <div
            key={rate.id}
            className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg transition-all duration-200 group"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">{rate.flag}</span>
              <span className="text-gray-900 text-sm">1 JPY = </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-right">
                <div className="text-gray-900 font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                  {rate.rate.toFixed(4)} {rate.currency}
                </div>
                <div
                  className={`text-xs flex items-center gap-1 mt-1 ${
                    rate.change >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {rate.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {Math.abs(rate.change)}%
                </div>
              </div>
              {rates.length > 1 && (
                <button
                  onClick={() => removeCurrency(rate.id)}
                  className="opacity-0 group-hover:opacity-100 text-gray-600 hover:text-red-600 h-6 w-6 p-0 transition-all duration-200 bg-transparent hover:bg-gray-100 rounded-md"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}