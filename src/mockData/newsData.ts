import type { NewsItem } from "@components/React/HottestNewsWidget"

 

export const mockNewsData: NewsItem[] = [
  {
    id: "1",
    title: "Revolutionary AI Breakthrough Changes Everything",
    description:
      "Scientists announce major breakthrough in artificial intelligence that could transform how we work and live.",
    url: "https://example.com/ai-breakthrough",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop",
    source: "Tech News",
    publishedAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    category: "Technology",
  },
  {
    id: "2",
    title: "Global Climate Summit Reaches Historic Agreement",
    description: "World leaders unite on unprecedented climate action plan with binding commitments.",
    url: "https://example.com/climate-summit",
    imageUrl: "https://images.unsplash.com/photo-1569163139394-de44cb5894c6?w=400&h=200&fit=crop",
    source: "World News",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    category: "Environment",
  },
  {
    id: "3",
    title: "Space Mission Discovers Potential Signs of Life",
    description: "NASA's latest Mars rover findings suggest possible microbial life on the red planet.",
    url: "https://example.com/mars-discovery",
    imageUrl: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=200&fit=crop",
    source: "Space Today",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    category: "Science",
  },
  {
    id: "4",
    title: "Cryptocurrency Market Sees Major Surge",
    description: "Bitcoin and other major cryptocurrencies experience significant gains following regulatory clarity.",
    url: "https://example.com/crypto-surge",
    imageUrl: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=200&fit=crop",
    source: "Finance Daily",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    category: "Finance",
  },
  {
    id: "5",
    title: "New Medical Treatment Shows Promise",
    description: "Clinical trials reveal breakthrough treatment for previously incurable disease.",
    url: "https://example.com/medical-breakthrough",
    imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop",
    source: "Health News",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
    category: "Health",
  },
]

export function getTimeAgo(date: Date): string {
  const now = new Date()
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`
  } else if (diffInMinutes < 1440) {
    return `${Math.floor(diffInMinutes / 60)}h ago`
  } else {
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }
}
