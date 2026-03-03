'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { siteConfig, VideoCategory } from '@/config/site'

const categories: { id: VideoCategory; label: string; icon: string }[] = [
  { id: 'setup', label: 'Setup Guides', icon: '📱' },
  { id: 'troubleshooting', label: 'Troubleshooting', icon: '🔧' },
  { id: 'account', label: 'Account Help', icon: '👤' },
]

export default function SupportPage() {
  const [activeCategory, setActiveCategory] = useState<VideoCategory | 'all'>('all')
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)

  const filteredVideos = activeCategory === 'all' 
    ? siteConfig.troubleshootingVideos 
    : siteConfig.troubleshootingVideos.filter(v => v.category === activeCategory)

  const currentVideo = selectedVideo 
    ? siteConfig.troubleshootingVideos.find(v => v.id === selectedVideo)
    : null

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/dashboard" className="text-gray-500 hover:text-black text-sm font-medium transition-colors">
            ← Back to Dashboard
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <Logo className="w-6 h-6" />
            <span className="font-bold text-sm tracking-tight">OMEGA TV</span>
          </Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">HELP & SUPPORT</h1>
          <p className="text-gray-500 text-lg">
            Watch our video guides to get started or troubleshoot issues
          </p>
        </div>

        {/* Video Player Modal */}
        {currentVideo && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setSelectedVideo(null)}>
            <div className="bg-white w-full max-w-4xl" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h3 className="font-bold">{currentVideo.title}</h3>
                <button 
                  onClick={() => setSelectedVideo(null)}
                  className="text-gray-500 hover:text-black text-2xl"
                >
                  ×
                </button>
              </div>
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${currentVideo.youtubeId}?autoplay=1`}
                  title={currentVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="p-4 border-t border-gray-200">
                <p className="text-gray-500">{currentVideo.description}</p>
              </div>
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeCategory === 'all'
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Videos
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-3 font-medium transition-colors ${
                activeCategory === cat.id
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        {/* Video Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map(video => (
            <div 
              key={video.id}
              onClick={() => setSelectedVideo(video.id)}
              className="border border-gray-200 hover:border-black cursor-pointer transition-colors group"
            >
              {/* Thumbnail */}
              <div className="aspect-video bg-gray-100 relative overflow-hidden">
                <img
                  src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  onError={(e) => {
                    // Fallback to medium quality if maxres not available
                    (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`
                  }}
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                    <span className="text-2xl ml-1">▶</span>
                  </div>
                </div>
                <span className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 uppercase tracking-wide">
                  {categories.find(c => c.id === video.category)?.label}
                </span>
              </div>
              {/* Info */}
              <div className="p-4">
                <h3 className="font-bold mb-2 group-hover:text-black transition-colors">{video.title}</h3>
                <p className="text-gray-500 text-sm">{video.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 text-center border-t border-gray-200 pt-12">
          <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-gray-500 mb-6">
            Can't find what you're looking for? Contact our support team directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`mailto:${siteConfig.supportEmail}`}
              className="btn-primary"
            >
              📧 Email Support
            </a>
            <Link href="/dashboard" className="btn-secondary">
              Go to Dashboard
            </Link>
          </div>
          <p className="text-gray-400 text-sm mt-6">
            Email: {siteConfig.supportEmail}
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-200 mt-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-500">
            <Logo className="w-5 h-5" />
            <span className="text-sm font-medium">{siteConfig.siteName}</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="/login" className="hover:text-black transition-colors">Login</Link>
            <Link href="/signup" className="hover:text-black transition-colors">Sign Up</Link>
            <Link href="/support" className="hover:text-black transition-colors">Support</Link>
          </div>
          <p className="text-sm text-gray-400">© 2026 {siteConfig.siteName}</p>
        </div>
      </footer>
    </div>
  )
}
