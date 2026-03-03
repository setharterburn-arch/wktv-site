'use client'

import Link from 'next/link'
import Image from 'next/image'
import { siteConfig } from '@/config/site'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/wktv-logo.jpg" alt="WKTV" width={50} height={50} className="rounded" />
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="nav-link">Features</a>
            <a href="#pricing" className="nav-link">Pricing</a>
            <Link href="/support" className="nav-link">Support</Link>
            <Link href="/login" className="nav-link">Login</Link>
            <Link href="/signup" className="btn-primary">
              Get Started
            </Link>
          </nav>
          <Link href="/signup" className="md:hidden btn-primary text-sm px-4 py-2">
            Start
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="section text-center">
        <div className="max-w-4xl mx-auto">
          <Image src="/wktv-logo.jpg" alt="WKTV" width={120} height={120} className="mx-auto mb-8 rounded-lg" />
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up">
            <span className="text-red-600">WATCH</span><br />
            <span className="text-white">ANYWHERE.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-10 animate-fade-in-up delay-100">
            10,000+ channels. Movies. Sports. Live TV.<br />
            Stream on any device, anywhere in the USA.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-200">
            <Link href="/signup?plan=trial-free" className="btn-primary">
              Start Free Trial
            </Link>
            <a href="#pricing" className="btn-secondary">
              View Pricing
            </a>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="divider max-w-6xl mx-auto" />

      {/* Features */}
      <section id="features" className="section">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 tracking-tight">
            WHAT YOU <span className="text-red-600">GET</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">📺</div>
              <h3 className="text-lg font-bold mb-2 uppercase tracking-wide">Live TV</h3>
              <p className="text-gray-400">
                10,000+ channels including local networks, news, sports, and entertainment worldwide.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🎬</div>
              <h3 className="text-lg font-bold mb-2 uppercase tracking-wide">On Demand</h3>
              <p className="text-gray-400">
                Thousands of movies and TV shows. New releases added daily.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🏈</div>
              <h3 className="text-lg font-bold mb-2 uppercase tracking-wide">Sports</h3>
              <p className="text-gray-400">
                NFL, NBA, MLB, NHL, UFC, soccer, and more. Never miss a game.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="divider max-w-6xl mx-auto" />

      {/* Pricing */}
      <section id="pricing" className="section">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 tracking-tight">
            <span className="text-red-600">SIMPLE</span> PRICING
          </h2>
          <p className="text-gray-400 text-center mb-4">
            Pick the plan that works for you. No hidden fees. $50 activation fee waived!
          </p>
          <p className="text-gray-500 text-center text-sm mb-12">
            A concurrent connection lets you stream on multiple devices at the same time.
          </p>
          
          {/* Trial Plans */}
          <div className="mb-12">
            <h3 className="text-xl font-bold mb-6 text-center text-gray-300">🎁 TRY IT FIRST</h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div className="card text-center">
                <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Free Trial</h4>
                <p className="text-4xl font-bold mb-2 text-red-500">FREE</p>
                <p className="text-gray-500 text-sm mb-4">24 hours</p>
                <ul className="text-gray-400 text-sm space-y-2 mb-6">
                  <li>1 connection</li>
                  <li>Full access to all channels</li>
                  <li>No credit card required</li>
                </ul>
                <Link href="/signup?plan=trial-free" className="btn-primary w-full block text-center">
                  Start Free
                </Link>
              </div>
              <div className="card text-center">
                <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">1-Month Trial</h4>
                <p className="text-4xl font-bold mb-2">$15</p>
                <p className="text-gray-500 text-sm mb-4">1 month</p>
                <ul className="text-gray-400 text-sm space-y-2 mb-6">
                  <li>1 connection</li>
                  <li>Full access to all channels</li>
                  <li>Perfect for testing</li>
                </ul>
                <Link href="/signup?plan=trial-1mo" className="btn-secondary w-full block text-center">
                  Select
                </Link>
              </div>
            </div>
          </div>

          {/* Monthly Plan */}
          <div className="mb-12">
            <h3 className="text-xl font-bold mb-6 text-center text-gray-300">📅 MONTH-TO-MONTH</h3>
            <div className="max-w-md mx-auto">
              <div className="card text-center">
                <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Monthly</h4>
                <p className="text-4xl font-bold mb-2">$25<span className="text-lg text-gray-500">/mo</span></p>
                <ul className="text-gray-400 text-sm space-y-2 mb-4">
                  <li>1 connection included</li>
                  <li>Cancel anytime</li>
                  <li className="text-red-400">+$15/mo per additional connection</li>
                </ul>
                <Link href="/signup?plan=monthly-1" className="btn-secondary w-full block text-center">
                  Select
                </Link>
              </div>
            </div>
          </div>

          {/* Annual Plans */}
          <div className="mb-12">
            <h3 className="text-xl font-bold mb-6 text-center text-gray-300">🔥 ANNUAL PLANS <span className="text-red-500">(Best Value)</span></h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="card text-center">
                <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">1 Connection</h4>
                <p className="text-4xl font-bold mb-2">$150</p>
                <p className="text-gray-500 text-sm mb-4">per year</p>
                <ul className="text-gray-400 text-sm space-y-2 mb-6">
                  <li>1 device</li>
                  <li>All channels</li>
                  <li>12 months</li>
                </ul>
                <Link href="/signup?plan=annual-1" className="btn-secondary w-full block text-center">
                  Select
                </Link>
              </div>
              <div className="card text-center">
                <span className="inline-block bg-gray-700 text-gray-300 text-xs font-bold uppercase tracking-widest px-3 py-1 mb-4">
                  Family
                </span>
                <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">2 Connections</h4>
                <p className="text-4xl font-bold mb-2">$200</p>
                <p className="text-gray-500 text-sm mb-4">per year</p>
                <ul className="text-gray-400 text-sm space-y-2 mb-6">
                  <li>2 devices</li>
                  <li>All channels</li>
                  <li>12 months</li>
                </ul>
                <Link href="/signup?plan=annual-2" className="btn-secondary w-full block text-center">
                  Select
                </Link>
              </div>
              <div className="card text-center">
                <span className="inline-block bg-gray-700 text-gray-300 text-xs font-bold uppercase tracking-widest px-3 py-1 mb-4">
                  Family
                </span>
                <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">3 Connections</h4>
                <p className="text-4xl font-bold mb-2">$230</p>
                <p className="text-gray-500 text-sm mb-4">per year</p>
                <ul className="text-gray-400 text-sm space-y-2 mb-6">
                  <li>3 devices</li>
                  <li>All channels</li>
                  <li>12 months</li>
                </ul>
                <Link href="/signup?plan=annual-3" className="btn-secondary w-full block text-center">
                  Select
                </Link>
              </div>
              <div className="card card-highlight text-center relative">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 badge-featured">
                  Best Value
                </span>
                <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4 mt-2">5 Connections</h4>
                <p className="text-4xl font-bold mb-2 text-red-500">$280</p>
                <p className="text-gray-500 text-sm mb-4">per year</p>
                <ul className="text-gray-400 text-sm space-y-2 mb-6">
                  <li>5 devices</li>
                  <li>All channels</li>
                  <li>12 months</li>
                </ul>
                <Link href="/signup?plan=annual-5" className="btn-primary w-full block text-center">
                  Select
                </Link>
              </div>
            </div>
          </div>

          {/* Lifetime Plans */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-center text-gray-300">♾️ LIFETIME PLANS</h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div className="card text-center">
                <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Lifetime · 1 Connection</h4>
                <p className="text-4xl font-bold mb-2">$600</p>
                <p className="text-gray-500 text-sm mb-4">one-time payment</p>
                <ul className="text-gray-400 text-sm space-y-2 mb-6">
                  <li>1 device</li>
                  <li>Pay once, watch forever</li>
                  <li>No renewals</li>
                </ul>
                <Link href="/signup?plan=lifetime-1" className="btn-secondary w-full block text-center">
                  Select
                </Link>
              </div>
              <div className="card text-center">
                <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Lifetime · 5 Connections</h4>
                <p className="text-4xl font-bold mb-2">$850</p>
                <p className="text-gray-500 text-sm mb-4">one-time payment</p>
                <ul className="text-gray-400 text-sm space-y-2 mb-6">
                  <li>5 devices</li>
                  <li>Pay once, watch forever</li>
                  <li>No renewals</li>
                </ul>
                <Link href="/signup?plan=lifetime-5" className="btn-secondary w-full block text-center">
                  Select
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Devices */}
      <section className="section bg-gray-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 tracking-tight">
            WORKS ON <span className="text-red-600">ALL DEVICES</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-12 text-gray-400">
            <div>
              <div className="text-4xl mb-2">📱</div>
              <p className="text-sm uppercase tracking-wide font-medium">Mobile</p>
            </div>
            <div>
              <div className="text-4xl mb-2">🔥</div>
              <p className="text-sm uppercase tracking-wide font-medium">Firestick</p>
            </div>
            <div>
              <div className="text-4xl mb-2">📺</div>
              <p className="text-sm uppercase tracking-wide font-medium">Smart TV</p>
            </div>
            <div>
              <div className="text-4xl mb-2">💻</div>
              <p className="text-sm uppercase tracking-wide font-medium">Browser</p>
            </div>
            <div>
              <div className="text-4xl mb-2">🎮</div>
              <p className="text-sm uppercase tracking-wide font-medium">Android Box</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-red-600 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
            READY TO START?
          </h2>
          <p className="text-red-100 mb-8">
            Join thousands of happy customers streaming their favorite content.
          </p>
          <Link 
            href="/signup?plan=trial-free" 
            className="inline-block bg-white text-red-600 px-8 py-4 font-semibold uppercase tracking-wide text-sm hover:bg-gray-100 transition-colors"
          >
            Start Your Free Trial
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-500">
            <Image src="/wktv-logo.jpg" alt="WKTV" width={30} height={30} className="rounded" />
            <span className="text-sm font-medium">WKTV - Watch Anywhere</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="/login" className="hover:text-white transition-colors">Login</Link>
            <Link href="/signup" className="hover:text-white transition-colors">Sign Up</Link>
            <Link href="/support" className="hover:text-white transition-colors">Support</Link>
          </div>
          <p className="text-sm text-gray-600">© 2026 WKTV</p>
        </div>
      </footer>
    </div>
  )
}
