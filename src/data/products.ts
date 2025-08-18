export interface Product {
  id: string;
  name: string;
  description: string;
  fullDescription: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  featured: boolean;
  trending: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  count: number;
}

export const categories: Category[] = [
  {
    id: "youtube",
    name: "YouTube Growth",
    icon: "🎬",
    description: "Subscribers, views, watch time",
    count: 24,
  },
  {
    id: "instagram",
    name: "Instagram Boost",
    icon: "📸",
    description: "Followers, likes, comments",
    count: 18,
  },
  {
    id: "facebook",
    name: "Facebook Services",
    icon: "👍",
    description: "Likes, followers, engagement",
    count: 20,
  },
  {
    id: "tiktok",
    name: "TikTok Growth",
    icon: "🎵",
    description: "Followers, likes, views",
    count: 16,
  },
  {
    id: "linkedin",
    name: "LinkedIn Boost",
    icon: "💼",
    description: "Connections, engagement",
    count: 12,
  },
  {
    id: "telegram",
    name: "Telegram Growth",
    icon: "✈️",
    description: "Channel members, post views",
    count: 10,
  },
  {
    id: "spotify",
    name: "Spotify Promotion",
    icon: "🎵",
    description: "Plays, followers, monthly listeners",
    count: 8,
  }
];

export const products: Product[] = [
  {
    id: "p1",
    name: "YouTube 1,000 Views Package",
    description: "Boost your YouTube video with 1,000 high-retention views",
    fullDescription: "Our YouTube Views Package delivers 1,000 genuine, high-retention views to your YouTube videos. These views come from real users across various devices and locations, helping improve your video's engagement metrics and visibility in search results. The views will be delivered gradually over 2-3 days to ensure they appear natural to YouTube's algorithm. Perfect for content creators looking to increase their video's reach and credibility.",
    price: 999,
    category: "youtube",
    image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868",
    rating: 4.8,
    reviews: 125,
    featured: true,
    trending: true,
  },
  {
    id: "p2",
    name: "Instagram 500 Followers",
    description: "Grow your Instagram following with 500 real-looking followers",
    fullDescription: "Our Instagram Followers Package helps you grow your Instagram profile with 500 high-quality followers. These followers have profile pictures, posts, and look like genuine Instagram users. The followers will be delivered gradually over 1-2 days to ensure they appear natural to Instagram's algorithm. This service is perfect for individuals and businesses looking to build social proof and increase their Instagram presence quickly.",
    price: 1500,
    category: "instagram",
    image: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb",
    rating: 4.9,
    reviews: 89,
    featured: true,
    trending: false,
  },
  {
    id: "p3",
    name: "SEO Keyword Optimization",
    description: "Optimize your website for 10 targeted keywords",
    fullDescription: "Our SEO Keyword Optimization service helps you rank higher in search engines for 10 targeted keywords relevant to your business. Our experts will analyze your website, implement on-page optimization techniques, and provide a detailed report with recommendations for further improvements. This service includes keyword research, meta tag optimization, content suggestions, and basic link building strategies to improve your website's visibility and organic traffic.",
    price: 2500,
    category: "seo",
    image: "https://images.unsplash.com/photo-1571786256017-aee7a0c009b6",
    rating: 4.7,
    reviews: 42,
    featured: false,
    trending: true,
  },
  {
    id: "p4",
    name: "1,000 Website Visitors",
    description: "Drive 1,000 targeted visitors to your website",
    fullDescription: "Our Website Traffic Package delivers 1,000 real visitors to your website from your target audience. You can specify the geographical location, interests, and browsing devices of your visitors to ensure they match your ideal customer profile. The traffic will be distributed over 7 days to create a natural traffic pattern. This service is perfect for businesses looking to increase their website's visibility, test conversion rates, or boost ad revenue through increased pageviews.",
    price: 1999,
    category: "website",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    rating: 4.5,
    reviews: 78,
    featured: true,
    trending: true,
  },
  {
    id: "p5",
    name: "Social Media Management Tool",
    description: "30-day access to our premium SMM dashboard",
    fullDescription: "Get 30-day access to our comprehensive Social Media Management Tool that helps you schedule posts, analyze performance, and grow your social media presence across multiple platforms. This tool includes features like post scheduling, audience analytics, competitor analysis, hashtag research, and engagement tracking. Perfect for social media managers, influencers, and businesses looking to streamline their social media marketing efforts and achieve better results with less time investment.",
    price: 2999,
    category: "tools",
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0",
    rating: 4.6,
    reviews: 36,
    featured: false,
    trending: true,
  },
  {
    id: "p6",
    name: "Twitter Account Growth",
    description: "Gain 300 Twitter followers and 500 tweet engagements",
    fullDescription: "Our Twitter Account Growth package helps you build your Twitter presence with 300 new followers and 500 engagements (likes and retweets) on your recent tweets. This service uses safe, white-hat methods to attract relevant followers to your profile and increase engagement on your content. The growth will be delivered gradually over 5-7 days to maintain a natural growth pattern. Ideal for individuals and businesses looking to expand their Twitter influence and reach.",
    price: 1800,
    category: "accounts",
    image: "https://images.unsplash.com/photo-1611605698335-8b1569810432",
    rating: 4.8,
    reviews: 54,
    featured: true,
    trending: false,
  },
  {
    id: "p7",
    name: "TikTok 1000 Followers",
    description: "Boost your TikTok profile with real-looking followers",
    fullDescription: "Get 1000 high-quality TikTok followers to boost your profile's credibility. Our service delivers followers gradually over 3-5 days to maintain natural growth patterns and comply with TikTok's guidelines.",
    price: 1999,
    category: "tiktok",
    image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868",
    rating: 4.7,
    reviews: 42,
    featured: true,
    trending: true,
  },
  {
    id: "p8",
    name: "Facebook Page Likes",
    description: "Grow your Facebook page with 500 genuine likes",
    fullDescription: "Increase your Facebook page's credibility with 500 high-quality page likes. Our service ensures gradual delivery and uses real-looking profiles to maintain authenticity.",
    price: 1499,
    category: "facebook",
    image: "https://images.unsplash.com/photo-1611162616071-b39a2ec055fb",
    rating: 4.8,
    reviews: 65,
    featured: true,
    trending: false,
  },
  {
    id: "p9",
    name: "Spotify Monthly Listeners",
    description: "Boost your Spotify profile with 1000 monthly listeners",
    fullDescription: "Enhance your Spotify presence with 1000 monthly listeners. Our service helps increase your music's visibility and improves your artist profile's credibility.",
    price: 2499,
    category: "spotify",
    image: "https://images.unsplash.com/photo-1611339555312-e607c8352fd7",
    rating: 4.6,
    reviews: 31,
    featured: false,
    trending: true,
  },
  {
    id: "p10",
    name: "Telegram Channel Members",
    description: "Add 1000 members to your Telegram channel",
    fullDescription: "Grow your Telegram channel with 1000 new members. Our service provides real-looking members who will help increase your channel's visibility and engagement.",
    price: 1799,
    category: "telegram",
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0",
    rating: 4.5,
    reviews: 28,
    featured: false,
    trending: true,
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getRelatedProducts = (category: string, currentId: string): Product[] => {
  return products.filter(product => product.category === category && product.id !== currentId).slice(0, 4);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getTrendingProducts = (): Product[] => {
  return products.filter(product => product.trending);
};

export const formatPrice = (price: number): string => {
  return `Rs. ${price.toLocaleString()}`;
};
