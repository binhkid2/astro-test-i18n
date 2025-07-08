import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";

import {
  languages,
  languageCodes,
  defaultLang,
  type LanguageCode,
  countryMap,
} from "../i18n/config";

export default function LanguageSelect() {
  const currentPath = window.location.pathname;
  const currentLang =
    (currentPath.split("/")[1] as LanguageCode) || defaultLang;
  const restPath = currentPath.split("/").slice(2).join("/");

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLanguageChange = (selectedLang: any) => {
    setIsDropdownOpen(false);
    window.location.href = `/${selectedLang}/${restPath}`;
  };

  return (
    <div className="  mx-auto p-6 space-y-6">
      {/* Custom Dropdown */}
      <div className="relative  mx-auto">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full flex items-center justify-between gap-3 p-4 bg-white border-2 border-gray-200 rounded-xl shadow-sm hover:border-blue-400 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <div className="flex items-center gap-3">
            <img
              src={`https://flagcdn.com/w40/${countryMap[
                currentLang
              ].toLowerCase()}.png`}
              alt={currentLang}
              className="w-8 h-6 object-cover rounded-sm shadow-sm"
            />

            <span className="font-medium text-gray-800">
              {languages[currentLang]}
            </span>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-80 overflow-y-auto">
            {languageCodes.map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 transition-colors first:rounded-t-xl last:rounded-b-xl ${
                  lang === currentLang
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700"
                }`}
              >
                <img
                  src={`https://flagcdn.com/w40/${countryMap[
                    lang
                  ].toLowerCase()}.png`}
                  alt={lang}
                  className="w-7 h-5 object-cover rounded-sm shadow-sm"
                />

                <span className="font-medium">{languages[lang]}</span>
                {lang === currentLang && (
                  <Check className="w-5 h-5 ml-auto text-blue-600" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
