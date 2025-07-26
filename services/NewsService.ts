// News API requires an API key. Get one from https://newsapi.org/
// For development purposes, we're using a mock response
// In production, replace this with actual API calls

export interface NewsArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

// Default fallback article if everything else fails
const fallbackArticle: NewsArticle = {
  source: { id: null, name: "News App" },
  author: null,
  title: "Service Temporarily Unavailable",
  description: "We're currently experiencing technical difficulties. Please check back later for the latest news updates.",
  url: "",
  urlToImage: null,
  publishedAt: new Date().toISOString(),
  content: null
};

// Ensure articles are valid to prevent rendering errors
const validateArticles = (articles: any[]): NewsArticle[] => {
  if (!Array.isArray(articles)) return [fallbackArticle];
  
  return articles.filter(article => {
    // Filter out articles with missing required fields
    return article && 
      typeof article === 'object' && 
      typeof article.title === 'string' &&
      article.source && 
      typeof article.source === 'object';
  }).map(article => {
    // Ensure all fields have valid types
    return {
      source: {
        id: article.source?.id || null,
        name: article.source?.name || 'Unknown Source'
      },
      author: typeof article.author === 'string' ? article.author : null,
      title: article.title || 'Untitled Article',
      description: typeof article.description === 'string' ? article.description : null,
      url: typeof article.url === 'string' ? article.url : '',
      urlToImage: typeof article.urlToImage === 'string' ? article.urlToImage : null,
      publishedAt: typeof article.publishedAt === 'string' ? article.publishedAt : new Date().toISOString(),
      content: typeof article.content === 'string' ? article.content : null
    };
  });
};

const mockNewsData: NewsResponse = {
  status: "ok",
  totalResults: 10,
  articles: [
    {
      source: { id: "tech-crunch", name: "TechCrunch" },
      author: "Sarah Johnson",
      title: "New AI Breakthrough Changes Everything",
      description: "Researchers have developed a new AI model that can understand complex human emotions from text.",
      url: "https://example.com/ai-breakthrough",
      urlToImage: "https://picsum.photos/id/237/800/600",
      publishedAt: "2023-11-25T09:45:00Z",
      content: "A team of researchers has announced a breakthrough in artificial intelligence that allows machines to better understand human emotions..."
    },
    {
      source: { id: "wired", name: "Wired" },
      author: "James Smith",
      title: "The Future of Electric Vehicles",
      description: "New battery technology could double the range of electric vehicles.",
      url: "https://example.com/ev-future",
      urlToImage: "https://picsum.photos/id/1071/800/600",
      publishedAt: "2023-11-24T14:30:00Z",
      content: "A new battery technology developed by researchers could potentially double the range of electric vehicles..."
    },
    {
      source: { id: "bbc-news", name: "BBC News" },
      author: "Emma Wilson",
      title: "Global Climate Summit Reaches Historic Agreement",
      description: "World leaders have agreed to ambitious new climate targets at the annual summit.",
      url: "https://example.com/climate-summit",
      urlToImage: "https://picsum.photos/id/1059/800/600",
      publishedAt: "2023-11-23T18:15:00Z",
      content: "In a historic agreement, world leaders at the Global Climate Summit have committed to ambitious new targets..."
    },
    {
      source: { id: "the-verge", name: "The Verge" },
      author: "Michael Brown",
      title: "New Smartphone Redefines Mobile Photography",
      description: "The latest flagship smartphone comes with a revolutionary camera system.",
      url: "https://example.com/smartphone-camera",
      urlToImage: "https://picsum.photos/id/160/800/600",
      publishedAt: "2023-11-22T10:00:00Z",
      content: "The newly released flagship smartphone features a revolutionary camera system that could redefine mobile photography..."
    },
    {
      source: { id: "scientific-american", name: "Scientific American" },
      author: "Dr. Jennifer Lee",
      title: "Scientists Discover New Species in Amazon Rainforest",
      description: "A team of biologists has identified several previously unknown species during an expedition.",
      url: "https://example.com/amazon-species",
      urlToImage: "https://picsum.photos/id/176/800/600",
      publishedAt: "2023-11-21T12:30:00Z",
      content: "During a recent expedition to the Amazon rainforest, a team of biologists discovered several previously unknown species..."
    }
  ]
};

const categoryData: Record<string, NewsResponse> = {
  business: {
    ...mockNewsData,
    articles: [
      {
        source: { id: "financial-times", name: "Financial Times" },
        author: "Robert Johnson",
        title: "Markets React to Federal Reserve Decision",
        description: "Global markets show mixed reactions following the latest Federal Reserve interest rate announcement.",
        url: "https://example.com/markets-fed",
        urlToImage: "https://picsum.photos/id/201/800/600",
        publishedAt: "2023-11-25T16:45:00Z",
        content: "Global financial markets showed mixed reactions on Thursday following the Federal Reserve's latest announcement on interest rates..."
      },
      {
        source: { id: "bloomberg", name: "Bloomberg" },
        author: "Lisa Chen",
        title: "Tech Giant Announces Major Acquisition",
        description: "One of the world's largest tech companies has announced a $10 billion acquisition of an AI startup.",
        url: "https://example.com/tech-acquisition",
        urlToImage: "https://picsum.photos/id/42/800/600",
        publishedAt: "2023-11-24T09:30:00Z",
        content: "In a move that shocked industry analysts, one of the world's largest technology companies announced yesterday that it would acquire an AI startup for $10 billion..."
      }
    ]
  },
  technology: {
    ...mockNewsData,
    articles: [
      {
        source: { id: "wired", name: "Wired" },
        author: "David Miller",
        title: "Quantum Computing Reaches New Milestone",
        description: "Researchers have achieved quantum supremacy with a new 128-qubit processor.",
        url: "https://example.com/quantum-milestone",
        urlToImage: "https://picsum.photos/id/119/800/600",
        publishedAt: "2023-11-25T11:20:00Z",
        content: "A team of quantum computing researchers has announced they've reached a new milestone with a 128-qubit processor that achieved quantum supremacy..."
      },
      {
        source: { id: "tech-radar", name: "TechRadar" },
        author: "Sarah Williams",
        title: "Next-Gen VR Headsets Promise Full Immersion",
        description: "New virtual reality technology aims to engage all five senses for complete immersion.",
        url: "https://example.com/vr-immersion",
        urlToImage: "https://picsum.photos/id/96/800/600",
        publishedAt: "2023-11-23T14:15:00Z",
        content: "The next generation of virtual reality headsets promises to engage all five senses, creating a fully immersive experience unlike anything currently available..."
      }
    ]
  },
  sports: {
    ...mockNewsData,
    articles: [
      {
        source: { id: "espn", name: "ESPN" },
        author: "Mike Johnson",
        title: "Underdog Team Wins Championship in Stunning Upset",
        description: "In a shocking turn of events, the underdogs defeated the reigning champions in the final match.",
        url: "https://example.com/sports-upset",
        urlToImage: "https://picsum.photos/id/26/800/600",
        publishedAt: "2023-11-25T22:45:00Z",
        content: "In what many are calling one of the biggest upsets in sports history, the underdogs defeated the reigning champions in the final match of the championship..."
      },
      {
        source: { id: "sports-illustrated", name: "Sports Illustrated" },
        author: "Jane Thompson",
        title: "Star Player Signs Record-Breaking Contract",
        description: "The league's most valuable player has signed a historic contract extension worth millions.",
        url: "https://example.com/player-contract",
        urlToImage: "https://picsum.photos/id/28/800/600",
        publishedAt: "2023-11-24T18:30:00Z",
        content: "The league's most valuable player has signed a historic contract extension that will make them the highest-paid athlete in the sport's history..."
      }
    ]
  },
  health: {
    ...mockNewsData,
    articles: [
      {
        source: { id: "medical-news", name: "Medical News Today" },
        author: "Dr. Susan Brown",
        title: "Breakthrough in Cancer Treatment Shows Promise",
        description: "A new immunotherapy approach has shown remarkable results in early clinical trials.",
        url: "https://example.com/cancer-breakthrough",
        urlToImage: "https://picsum.photos/id/287/800/600",
        publishedAt: "2023-11-25T08:15:00Z",
        content: "Researchers have reported promising results from early clinical trials of a new immunotherapy approach for treating certain types of cancer..."
      },
      {
        source: { id: "health-magazine", name: "Health Magazine" },
        author: "Mark Davis",
        title: "Study Reveals Benefits of Mediterranean Diet",
        description: "New research confirms the long-term health benefits of following a Mediterranean diet.",
        url: "https://example.com/mediterranean-diet",
        urlToImage: "https://picsum.photos/id/292/800/600",
        publishedAt: "2023-11-22T13:45:00Z",
        content: "A comprehensive new study has provided further evidence of the long-term health benefits associated with following a Mediterranean diet..."
      }
    ]
  },
  general: {
    ...mockNewsData
  }
};

export const NewsService = {
  getTopHeadlines: async (category: string = 'general'): Promise<NewsResponse> => {
    // In a real app, you would make an API call like:
    // return fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=YOUR_API_KEY`)
    //   .then(response => response.json());
    
    try {
      // For development, we're returning mock data with a simulated delay
      return new Promise((resolve) => {
        setTimeout(() => {
          const response = categoryData[category] || mockNewsData;
          
          // Validate all articles before returning
          const validatedArticles = validateArticles(response.articles);
          
          resolve({
            status: "ok",
            totalResults: validatedArticles.length,
            articles: validatedArticles
          });
        }, 800);
      });
    } catch (error) {
      console.error('Error in getTopHeadlines:', error);
      // Return fallback data in case of any error
      return {
        status: "error",
        totalResults: 1,
        articles: [fallbackArticle]
      };
    }
  },
  
  searchNews: async (query: string): Promise<NewsResponse> => {
    // In a real app, you would make an API call like:
    // return fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=YOUR_API_KEY`)
    //   .then(response => response.json());
    
    try {
      // For development, we're filtering mock data with a simulated delay
      return new Promise((resolve) => {
        setTimeout(() => {
          // Add safety checks
          if (!query || typeof query !== 'string') {
            throw new Error('Invalid search query');
          }
          
          const filteredArticles = mockNewsData.articles.filter(article => 
            (article.title && article.title.toLowerCase().includes(query.toLowerCase())) ||
            (article.description && article.description.toLowerCase().includes(query.toLowerCase()))
          );
          
          const validatedArticles = validateArticles(filteredArticles);
          
          resolve({
            status: "ok",
            totalResults: validatedArticles.length,
            articles: validatedArticles
          });
        }, 800);
      });
    } catch (error) {
      console.error('Error in searchNews:', error);
      // Return fallback data in case of any error
      return {
        status: "error",
        totalResults: 1,
        articles: [fallbackArticle]
      };
    }
  }
}; 