"use client"

import type React from "react"

import { useState } from "react"
import { BookOpen, Volume2, Search } from "lucide-react"

interface DictionaryResult {
  word: string
  reading?: string
  meanings: string[]
  partOfSpeech: string
  example?: string
}

const mockDictionaryData: { [key: string]: DictionaryResult } = {
  こんにちは: {
    word: "こんにちは",
    reading: "konnichiwa",
    meanings: ["Hello", "Good afternoon"],
    partOfSpeech: "greeting",
    example: "こんにちは、元気ですか？",
  },
  ありがとう: {
    word: "ありがとう",
    reading: "arigatou",
    meanings: ["Thank you"],
    partOfSpeech: "expression",
    example: "手伝ってくれてありがとう。",
  },
  hello: {
    word: "hello",
    meanings: ["こんにちは", "やあ"],
    partOfSpeech: "greeting",
    example: "Hello, how are you?",
  },
}

export function DictionaryWidget() {
  const [dictQuery, setDictQuery] = useState("")
  const [searchResult, setSearchResult] = useState<DictionaryResult | null>(null)
  const [isSearching, setIsSearching] = useState(false)

  const quickPhrases = ["こんにちは", "ありがとう", "すみません", "はじめまして"]

  const handleDictSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (dictQuery.trim()) {
      setIsSearching(true)
      setTimeout(() => {
        const result = mockDictionaryData[dictQuery.toLowerCase().trim()]
        setSearchResult(result || null)
        setIsSearching(false)
      }, 500)
    }
  }

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "ja-JP"
      speechSynthesis.speak(utterance)
    }
  }

  return (
    <div className="bg-white border border-gray-200 shadow-lg rounded-lg">
      <div className="p-6 pb-3">
        <div className="text-gray-900 flex items-center gap-2 text-lg font-semibold">
          <BookOpen className="w-5 h-5" />
          Dictionary
        </div>
      </div>
      <div className="px-6 pb-6">
        <form onSubmit={handleDictSearch} className="space-y-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Japanese/English..."
              value={dictQuery}
              onChange={(e) => setDictQuery(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isSearching}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm flex items-center justify-center"
            >
              {isSearching ? (
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 border border-gray-400 border-t-gray-900 rounded-full animate-spin" />
                  Searching...
                </div>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => speakText(dictQuery)}
              disabled={!dictQuery.trim()}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Search Results */}
        {searchResult && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-gray-900 font-semibold text-lg">{searchResult.word}</h4>
              <button
                onClick={() => speakText(searchResult.word)}
                className="h-6 w-6 p-0 bg-transparent hover:bg-gray-100 rounded-md transition-colors"
              >
                <Volume2 className="w-3 h-3" />
              </button>
            </div>

            {searchResult.reading && <p className="text-gray-600 text-sm italic">[{searchResult.reading}]</p>}

            <div className="space-y-1">
              <p className="text-gray-500 text-xs uppercase">{searchResult.partOfSpeech}</p>
              <ul className="space-y-1">
                {searchResult.meanings.map((meaning, index) => (
                  <li key={index} className="text-gray-900 text-sm">
                    • {meaning}
                  </li>
                ))}
              </ul>
            </div>

            {searchResult.example && (
              <div className="mt-2 p-2 bg-gray-100 rounded">
                <p className="text-gray-600 text-xs mb-1">Example:</p>
                <p className="text-gray-900 text-sm">{searchResult.example}</p>
              </div>
            )}
          </div>
        )}

        {dictQuery && !searchResult && !isSearching && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-sm">No results found for "{dictQuery}"</p>
          </div>
        )}

        {/* Quick phrases */}
        <div className="mt-4 space-y-2">
          <p className="text-gray-600 text-xs">Quick Phrases:</p>
          <div className="flex flex-wrap gap-1">
            {quickPhrases.map((phrase) => (
              <button
                key={phrase}
                onClick={() => setDictQuery(phrase)}
                className="text-xs text-gray-600 hover:text-gray-900 h-6 px-2 bg-transparent hover:bg-gray-100 rounded-md transition-colors"
              >
                {phrase}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}