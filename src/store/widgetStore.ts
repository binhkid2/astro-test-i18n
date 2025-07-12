import { create } from "zustand"
import { persist } from "zustand/middleware" 
export interface Widget {
  id: string
  name: string
  description: string
  url: string
  category: string
  backgroundImage: string
  favicon?: string
  createdAt: Date
}
interface WidgetState {
  widgets: Widget[]
  addWidget: (widget: Omit<Widget, "id" | "createdAt">) => void
  removeWidget: (id: string) => void
  updateWidget: (id: string, widget: Partial<Widget>) => void
  reorderWidgets: (fromIndex: number, toIndex: number) => void
}

const defaultWidgets: Widget[] = [
  {
    id: "1",
    name: "The Dawn of Innovation",
    description: "Explore the birth of groundbreaking ideas and inventions.",
    url: "https://example.com/innovation",
    category: "Technology",
    backgroundImage: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=300&fit=crop",
    createdAt: new Date(),
  },
  {
    id: "2",
    name: "Digital Revolution",
    description: "Dive into the transformative power of technology.",
    url: "https://example.com/digital",
    category: "Digital",
    backgroundImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop",
    createdAt: new Date(),
  },
  {
    id: "3",
    name: "The Power of Communication",
    description: "Understand the impact of effective communication in our lives.",
    url: "https://example.com/communication",
    category: "Social",
    backgroundImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
    createdAt: new Date(),
  },
  {
    id: "4",
    name: "Spirit of Adventure",
    description: "Embark on exciting journeys and thrilling discoveries.",
    url: "https://example.com/adventure",
    category: "Travel",
    backgroundImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    createdAt: new Date(),
  },
]

export const useWidgetStore = create<WidgetState>()(
  persist(
    (set) => ({
      widgets: defaultWidgets,

      addWidget: (widget) =>
        set((state) => ({
          widgets: [
            ...state.widgets,
            {
              ...widget,
              id: Date.now().toString(),
              createdAt: new Date(),
            },
          ],
        })),

      removeWidget: (id) =>
        set((state) => ({
          widgets: state.widgets.filter((widget) => widget.id !== id),
        })),

      updateWidget: (id, updatedWidget) =>
        set((state) => ({
          widgets: state.widgets.map((widget) => (widget.id === id ? { ...widget, ...updatedWidget } : widget)),
        })),

      reorderWidgets: (fromIndex, toIndex) =>
        set((state) => {
          const newWidgets = [...state.widgets]
          const [removed] = newWidgets.splice(fromIndex, 1)
          newWidgets.splice(toIndex, 0, removed)
          return { widgets: newWidgets }
        }),
    }),
    {
      name: "widget-storage",
    },
  ),
)
