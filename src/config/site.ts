// Site configuration - WKTV
export const siteConfig = {
  name: 'WKTV',
  tagline: 'Watch Anywhere',
  siteName: 'WKTV - Watch Anywhere',
  domain: 'wktv.com', // Update when domain is purchased
  supportEmail: 'support@wktv.com',
  
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
  
  // Pricing plans
  plans: {
    trial: [
      { id: 'trial-free', name: 'Free 24-Hour Trial', price: 0, connections: 1, duration: '24 hours' },
      { id: 'trial-1mo', name: '1-Month Trial', price: 15, connections: 1, duration: '1 month' },
    ],
    monthly: [
      { id: 'monthly-1', name: 'Monthly', price: 25, connections: 1, duration: 'month', extra: '+$15/additional connection' },
    ],
    annual: [
      { id: 'annual-1', name: '1 Connection', price: 150, connections: 1, duration: 'year' },
      { id: 'annual-2', name: '2 Connections', price: 200, connections: 2, duration: 'year', label: 'Family' },
      { id: 'annual-3', name: '3 Connections', price: 230, connections: 3, duration: 'year', label: 'Family' },
      { id: 'annual-5', name: '5 Connections', price: 280, connections: 5, duration: 'year', label: 'Best Value', featured: true },
    ],
    lifetime: [
      { id: 'lifetime-1', name: '1 Connection', price: 600, connections: 1, duration: 'lifetime' },
      { id: 'lifetime-5', name: '5 Connections', price: 850, connections: 5, duration: 'lifetime' },
    ],
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
