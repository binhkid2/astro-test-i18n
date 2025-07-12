import { create } from "zustand"
import { persist } from "zustand/middleware" 

export interface QuickLink {
  id: string
  name: string
  url: string
  favicon: string
  createdAt: Date
}
interface QuickLinksState {
  quickLinks: QuickLink[]
  addQuickLink: (link: Omit<QuickLink, "id" | "createdAt">) => void
  removeQuickLink: (id: string) => void
  updateQuickLink: (id: string, link: Partial<QuickLink>) => void
}

const defaultQuickLinks: QuickLink[] = [
  {
    id: "1",
    name: "Gmail",
    url: "https://gmail.com",
    favicon: "https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico",
    createdAt: new Date(),
  },
  {
    id: "2",
    name: "GitHub",
    url: "https://github.com",
    favicon: "https://github.com/favicon.ico",
    createdAt: new Date(),
  },
  {
    id: "3",
    name: "YouTube",
    url: "https://youtube.com",
    favicon: "https://www.youtube.com/favicon.ico",
    createdAt: new Date(),
  },
  {
    id: "4",
    name: "Twitter",
    url: "https://twitter.com",
    favicon: "https://abs.twimg.com/favicons/twitter.2.ico",
    createdAt: new Date(),
  },
  {
    id: "5",
    name: "LinkedIn",
    url: "https://linkedin.com",
    favicon: "https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca",
    createdAt: new Date(),
  },
  {
    id: "6",
    name: "Yahoo Japan",
    url: "https://yahoo.co.jp",
    favicon: "https://s.yimg.jp/images/top/sp2/cmn/logo-ns-131205.png",
    createdAt: new Date(),
  },
]

export const useQuickLinksStore = create<QuickLinksState>()(
  persist(
    (set) => ({
      quickLinks: defaultQuickLinks,

      addQuickLink: (link) =>
        set((state) => ({
          quickLinks: [
            ...state.quickLinks,
            {
              ...link,
              id: Date.now().toString(),
              createdAt: new Date(),
            },
          ],
        })),

      removeQuickLink: (id) =>
        set((state) => ({
          quickLinks: state.quickLinks.filter((link) => link.id !== id),
        })),

      updateQuickLink: (id, updatedLink) =>
        set((state) => ({
          quickLinks: state.quickLinks.map((link) => (link.id === id ? { ...link, ...updatedLink } : link)),
        })),
    }),
    {
      name: "quick-links-storage",
    },
  ),
)
