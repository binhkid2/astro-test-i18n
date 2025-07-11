// Static imports
import en from './en.json';
import zh from './zh.json';
import vi from './vi.json';
import ko from './ko.json';
import tl from './tl.json';
import ne from './ne.json';
import pt from './pt.json';
import id from './id.json';
import my from './my.json';
import zhTw from './zh_tw.json';
import ja from './ja.json';

const languageData = [
  ["zh", "Chinese", "CN"],
  ["vi", "Vietnamese", "VN"],
  ["ko", "Korean", "KR"],
  ["tl", "Philippines", "PH"],
  ["ne", "Nepali", "NP"],
  ["pt", "Brazil", "BR"],
  ["id", "Indonesian", "ID"],
  ["my", "Myanmar", "MM"],
  ["zh_tw", "Taiwan", "TW"],
  ["en", "English", "US"],
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

// Translation mapping
const translationMap: Record<LanguageCode, any> = {
  en: en,
  zh: zh,
  vi: vi,
  ko: ko,
  tl: tl,
  ne: ne,
  pt: pt,
  id: id,
  my: my,
  zh_tw: zhTw,
  ja: ja,
};

export function getTranslations(lang: LanguageCode) {
  return translationMap[lang] || translationMap[defaultLang];
}