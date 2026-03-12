// Site configuration - OmegaTVKY
export const siteConfig = {
  name: 'OmegaTVKY',
  tagline: 'Watch Anywhere',
  siteName: 'Omega TV Kentucky',
  domain: 'omegatvky.com',
  supportEmail: 'support@omegatvky.com',
  
  // Payment info
  cashAppTag: '$wirelesskinect',
  cryptoWallets: {
    btc: '', // Add BTC address
    usdt: '', // Add USDT address (TRC20 or ERC20)
  },
  
  // Brand colors
  colors: {
    primary: '#DC2626', // Red
    secondary: '#000000', // Black
    accent: '#FFFFFF', // White
  },
  
  // Pricing plans - OmegaTVKY only has 2 annual plans
  plans: {
    trial: [],
    monthly: [],
    annual: [
      { id: 'annual-1', name: '1 Connection', price: 149, connections: 1, duration: 'year' },
      { id: 'annual-5', name: '5 Connections', price: 199, connections: 5, duration: 'year', label: 'Best Value', featured: true },
    ],
    lifetime: [],
  },
  
  // Troubleshooting videos (add YouTube IDs later)
  troubleshootingVideos: [] as TroubleshootingVideo[],
}

export type PlanCategory = 'trial' | 'monthly' | 'annual' | 'lifetime'
export type VideoCategory = 'setup' | 'troubleshooting' | 'account'

export interface TroubleshootingVideo {
  id: string
  title: string
  description: string
  youtubeId: string
  category: VideoCategory
}
