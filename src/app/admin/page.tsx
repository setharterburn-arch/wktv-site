'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface PendingSignup {
  id: string
  user_id: string
  name: string
  email: string
  phone: string | null
  plan_id: string
  plan_name: string
  amount_cents: number
  payment_method: string
  cashapp_name: string
  status: string
  notes: string | null
  created_at: string
}

export default function AdminPage() {
  const [pendingSignups, setPendingSignups] = useState<PendingSignup[]>([])
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState<'pending' | 'approved' | 'all'>('pending')

  useEffect(() => {
    fetchPendingSignups()
  }, [filter])

  async function fetchPendingSignups() {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/signups?status=${filter}`)
      const data = await res.json()
      if (data.error) {
        setError(data.error)
      } else {
        setPendingSignups(data.signups || [])
      }
    } catch (err) {
      setError('Failed to fetch data')
    } finally {
      setLoading(false)
    }
  }

  async function approveSignup(signupId: string) {
    setProcessing(signupId)
    try {
      const res = await fetch('/api/admin/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ signupId }),
      })
      const data = await res.json()
      if (data.error) {
        alert(data.error)
      } else {
        alert('Approved! Account created.')
        fetchPendingSignups()
      }
    } catch (err) {
      alert('Failed to approve')
    } finally {
      setProcessing(null)
    }
  }

  async function rejectSignup(signupId: string) {
    if (!confirm('Are you sure you want to reject this signup?')) return
    
    setProcessing(signupId)
    try {
      const res = await fetch('/api/admin/reject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ signupId }),
      })
      const data = await res.json()
      if (data.error) {
        alert(data.error)
      } else {
        alert('Rejected')
        fetchPendingSignups()
      }
    } catch (err) {
      alert('Failed to reject')
    } finally {
      setProcessing(null)
    }
  }

  function formatDate(dateStr: string) {
    const date = new Date(dateStr)
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Image src="/wktv-logo.jpg" alt="WKTV" width={40} height={40} className="rounded" />
            </Link>
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
          </div>
          <Link href="/" className="text-gray-400 hover:text-white text-sm">
            ← Back to Site
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="card text-center">
            <p className="text-4xl font-bold text-yellow-500">
              {pendingSignups.filter(s => s.status === 'pending').length}
            </p>
            <p className="text-gray-400 text-sm mt-1">Pending</p>
          </div>
          <div className="card text-center">
            <p className="text-4xl font-bold text-green-500">
              {pendingSignups.filter(s => s.status === 'approved').length}
            </p>
            <p className="text-gray-400 text-sm mt-1">Approved Today</p>
          </div>
          <div className="card text-center">
            <p className="text-4xl font-bold text-gray-500">
              {pendingSignups.length}
            </p>
            <p className="text-gray-400 text-sm mt-1">Total</p>
          </div>
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded ${filter === 'pending' ? 'bg-red-600' : 'bg-gray-800'}`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter('approved')}
            className={`px-4 py-2 rounded ${filter === 'approved' ? 'bg-red-600' : 'bg-gray-800'}`}
          >
            Approved
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-red-600' : 'bg-gray-800'}`}
          >
            All
          </button>
          <button
            onClick={() => fetchPendingSignups()}
            className="px-4 py-2 rounded bg-gray-800 ml-auto"
          >
            🔄 Refresh
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="p-4 bg-red-900/30 border border-red-700 text-red-400 mb-6 rounded">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading...</div>
        ) : pendingSignups.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No {filter === 'all' ? '' : filter} signups found
          </div>
        ) : (
          /* Signups Table */
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800 text-left text-gray-400 text-sm">
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Customer</th>
                  <th className="pb-3 font-medium">Plan</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Cash App</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingSignups.map((signup) => (
                  <tr key={signup.id} className="border-b border-gray-800/50">
                    <td className="py-4 text-sm text-gray-400">
                      {formatDate(signup.created_at)}
                    </td>
                    <td className="py-4">
                      <div className="font-medium">{signup.name}</div>
                      <div className="text-sm text-gray-500">{signup.email}</div>
                      {signup.phone && (
                        <div className="text-sm text-gray-500">{signup.phone}</div>
                      )}
                    </td>
                    <td className="py-4">
                      <div className="font-medium">{signup.plan_name}</div>
                      <div className="text-sm text-gray-500">{signup.plan_id}</div>
                    </td>
                    <td className="py-4">
                      <span className="text-green-400 font-bold">
                        ${(signup.amount_cents / 100).toFixed(2)}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className="bg-green-900/30 text-green-400 px-2 py-1 rounded text-sm">
                        {signup.cashapp_name}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        signup.status === 'pending' ? 'bg-yellow-900/30 text-yellow-400' :
                        signup.status === 'approved' ? 'bg-green-900/30 text-green-400' :
                        'bg-red-900/30 text-red-400'
                      }`}>
                        {signup.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-4">
                      {signup.status === 'pending' && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => approveSignup(signup.id)}
                            disabled={processing === signup.id}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
                          >
                            {processing === signup.id ? '...' : '✓ Approve'}
                          </button>
                          <button
                            onClick={() => rejectSignup(signup.id)}
                            disabled={processing === signup.id}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
                          >
                            ✗
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
