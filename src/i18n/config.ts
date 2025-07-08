const languageData = [
  ["zh", "Chinese (Simplified)", "CN"],
  ["vi", "Vietnamese", "VN"],
  ["ko", "Korean", "KR"],
  ["tl", "Tagalog (Philippines)", "PH"],
  ["ne", "Nepali", "NP"],
  ["pt", "Portuguese (Brazil)", "BR"],
  ["id", "Indonesian", "ID"],
  ["my", "Burmese (Myanmar)", "MM"],
  ["zh_tw", "Chinese (Traditional, Taiwan)", "TW"],
  ["en", "English (USA)", "US"],
  ["ja", "Japanese", "JP"],
] as const;

export const languages = Object.fromEntries(
  languageData.map(([code, name]) => [code, name])
) as Record<typeof languageData[number][0], string>;

export type LanguageCode = keyof typeof languages;

export const languageCodes = Object.keys(languages) as LanguageCode[];
export const defaultLang: LanguageCode = "en"; 
export const countryMap: Record<LanguageCode, string> = Object.fromEntries(
  languageData.map(([code, , country]) => [code, country])
) as Record<LanguageCode, string>;
