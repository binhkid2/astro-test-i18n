import { useState } from "react";  
import {
  languages,
  languageCodes,
  defaultLang,
  type LanguageCode,
  countryMap,
} from "../../i18n/config";

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
    <div  id="main-title" className="   mx-auto ">
      {/* Custom Dropdown */}
      <div className="relative    mx-auto">
         <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full flex items-center justify-between gap-3 px-4 bg-transparent border   rounded-xl shadow-sm hover:border-blue-400 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <div className="flex items-center gap-3"> 
            <span className="font-medium text-gray-800 dark:text-white">
              {languages[currentLang]}
            </span>
          </div> 
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute glass thin-scrollbar top-full left-0 right-0 mt-2  border  rounded-xl shadow-lg z-50 max-h-80 overflow-y-auto">
            {languageCodes.map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`w-full flex items-center gap-3 p-3 text-left  transition-colors first:rounded-t-xl last:rounded-b-xl ${
                  lang === currentLang
                    ? " bg-blue-300"
                    : ""
                }`}
              >
                <img
                  src={`https://flagcdn.com/w40/${countryMap[
                    lang
                  ].toLowerCase()}.png`}
                  alt={lang}
                  className="w-7 h-5 object-cover rounded-sm shadow-sm"
                />  
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
