export interface DetailedBusinessModel {
  id: string;
  title: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  potentialUserStruggles: {
    title: string;
    description: string;
  }[];
  counteractingStruggles: {
    title: string;
    description: string;
  }[];
  bestFitPersonality: string[];
  marketSize: string;
  incomeTiers: {
    tier: string;
    timeframe?: string;
    income: string;
  }[];
  resources: {
    platforms?: string[];
    suppliers?: string[];
    marketing?: string[];
    analytics?: string[];
    affiliatePrograms?: string[];
  };
}

export const detailedBusinessModels: DetailedBusinessModel[] = [
  {
    id: 'dropshipping',
    title: 'Dropshipping Store',
    description: 'Dropshipping is an e-commerce model where you sell physical products online without holding inventory. When a customer places an order, it\'s forwarded to a third-party supplier (often overseas), who ships the product directly to the customer. You handle marketing, customer service, and branding while the supplier fulfills the order.',
    strengths: [
      'Low startup cost (no inventory needed)',
      'No need to manage warehousing, packaging, or shipping',
      'Easy to test multiple products and niches',
      'Scalable through paid ads, influencer marketing, or SEO',
      'Can be managed from anywhere (location independent)'
    ],
    weaknesses: [
      'Lower profit margins due to third-party fulfillment',
      'Shipping times can be long, especially with international suppliers',
      'Quality control and customer experience depend on your supplier',
      'High competition, especially in saturated niches',
      'Platform policy risks (e.g., ad account bans, payment processor holds)'
    ],
    potentialUserStruggles: [
      {
        title: 'Impatience with Setup',
        description: 'Users expecting instant success may struggle with the trial-and-error period of testing products, creatives, and ad campaigns.'
      },
      {
        title: 'Managing Refunds & Complaints',
        description: 'With longer shipping times or supplier errors, users may struggle to handle support and reputation issues.'
      },
      {
        title: 'Paid Ad Complexity',
        description: 'Understanding and optimizing Facebook, TikTok, or Google Ads can overwhelm users with no digital marketing background.'
      },
      {
        title: 'Product Selection Pressure',
        description: 'Constant need to find winning products can feel uncertain and frustrating for new users.'
      }
    ],
    counteractingStruggles: [
      {
        title: 'Set Realistic Financial Expectations',
        description: 'Emphasize testing budgets ($200–$1,000), learning curve, and that success typically comes after launching multiple products.'
      },
      {
        title: 'Choose Good Suppliers',
        description: 'Use vetted platforms (e.g., CJ Dropshipping, Zendrop, or private agents) with fast shipping, tracking, and communication.'
      },
      {
        title: 'Use Prebuilt Store Templates',
        description: 'Lower the barrier to entry with done-for-you Shopify themes, product page templates, and app setups.'
      },
      {
        title: 'AI-Assisted Ads',
        description: 'Recommend using AI tools to generate copy, creatives, and analyze ad data to optimize campaigns faster.'
      },
      {
        title: 'Lean into Micro-Brands',
        description: 'Teach users to differentiate with better branding, niche targeting, or influencer partnerships—don\'t just copy trending TikTok products.'
      }
    ],
    bestFitPersonality: [
      'High openness (for product and market testing)',
      'High conscientiousness (to manage fulfillment, refunds, ads)',
      'Low neuroticism (resilience under uncertain results)',
      'Growth-oriented and performance-driven',
      'Moderate extroversion (helpful for influencer outreach and networking)'
    ],
    marketSize: 'The global dropshipping market was valued at ~$243 billion in 2023 and is projected to reach over $500 billion by 2027, with booming interest in niche e-commerce and direct-to-consumer brands.',
    incomeTiers: [
      {
        tier: 'Beginner',
        timeframe: 'Monthly',
        income: '$0 – $1,000'
      },
      {
        tier: 'Average',
        timeframe: 'Monthly',
        income: '$1,000 – $5,000'
      },
      {
        tier: 'Experienced',
        timeframe: 'Monthly',
        income: '$10,000 – $50,000+'
      }
    ],
    resources: {
      platforms: ['Shopify', 'CJ Dropshipping', 'DSers', 'Zendrop', 'AutoDS', 'Oberlo (legacy)'],
      suppliers: ['CJ Dropshipping', 'Zendrop', 'AutoDS', 'SourcinBox', 'EcomOps', 'EcommHub'],
      marketing: ['TikTok Creative Center', 'Canva', 'AdSpy', 'Minea', 'BigSpy', 'PPSpy'],
      analytics: ['AdCreative.ai', 'Copy.ai', 'Triple Whale (analytics)', 'Taplio', 'Instantly.ai (email outreach)'],
      affiliatePrograms: [
        'YouTube channels: Jordan Welch, Biaheza, @EcomKing for tactical advice',
        'Course-based learning (but vet carefully)',
        'AI Tools for ad creation and optimization',
        'Fulfillment and branding services'
      ]
    }
  }
];