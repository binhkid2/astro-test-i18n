 export interface SiteMetadata {
  title: string
  description: string
  ogImage: string
  favicon: string
}

export async function fetchSiteMetadata(url: string): Promise<SiteMetadata> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const mockData: { [key: string]: SiteMetadata } = {
    "github.com": {
      title: "GitHub",
      description: "Where the world builds software",
      ogImage: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400&h=300&fit=crop",
      favicon: "https://github.com/favicon.ico",
    },
    "youtube.com": {
      title: "YouTube",
      description: "Enjoy the videos and music you love",
      ogImage: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop",
      favicon: "https://www.youtube.com/favicon.ico",
    },
    "google.com": {
      title: "Google",
      description: "Search the world's information",
      ogImage: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=400&h=300&fit=crop",
      favicon: "https://www.google.com/favicon.ico",
    },
    default: {
      title: "Website",
      description: "A great website with amazing content",
      ogImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      favicon: "🌐",
    },
  }

  const domain = new URL(url).hostname.replace("www.", "")
  const metadata = mockData[domain] || mockData.default

  return {
    ...metadata,
    title: metadata.title + " - " + domain,
  }
}

export function getFaviconUrl(url: string): string {
  try {
    const domain = new URL(url).origin
    return `${domain}/favicon.ico`
  } catch {
    return "🌐"
  }
}
