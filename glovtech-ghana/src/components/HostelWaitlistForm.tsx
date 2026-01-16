'use client'

import { useState, useEffect } from 'react'
import {
  Building2,
  Calendar,
  Users,
  TrendingUp,
  ArrowLeft,
} from 'lucide-react'

export default function HostelWaitlistForm() {
  const [form, setForm] = useState({
    hostelName: '',
    email: '',
    phone: '',
    numberOfRooms: '',
    location: '',
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{
    type: 'success' | 'error'
    text: string
  } | null>(null)

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (message) setMessage(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const res = await fetch('/api/hostel-waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          product: 'Hostel Management System',
        }),
      })

      if (!res.ok) throw new Error()

      setMessage({
        type: 'success',
        text: "🎉 You're on the waitlist for Hostel Management System!",
      })

      setForm({
        hostelName: '',
        email: '',
        phone: '',
        numberOfRooms: '',
        location: '',
      })
    } catch {
      setMessage({
        type: 'error',
        text: 'Something went wrong. Please try again.',
      })
    } finally {
      setLoading(false)
    }
  }

  const features = [
    { icon: <Calendar className="w-6 h-6" />, text: 'Smart booking & reservations' },
    { icon: <Users className="w-6 h-6" />, text: 'Tenant management made easy' },
    { icon: <TrendingUp className="w-6 h-6" />, text: 'Revenue tracking & analytics' },
    { icon: <Building2 className="w-6 h-6" />, text: 'Multi-property support' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-green-50 relative overflow-hidden">
      {/* Back */}
      <button
        onClick={() => window.history.back()}
        className="absolute top-6 left-6 bg-white p-3 rounded-full shadow hover:scale-110 transition"
      >
        <ArrowLeft className="w-5 h-5 text-green-600" />
      </button>

      <div className="max-w-6xl mx-auto px-4 py-14">
        <div
          className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* LEFT */}
          <div className="space-y-8">
            <span className="inline-block px-4 py-2 bg-green-100 rounded-full text-green-700 text-sm font-semibold">
              🏨 Launching Soon
            </span>

            <h1 className="text-5xl font-bold">
              Hostel Management{' '}
              <span className="bg-green-600 bg-clip-text text-transparent">
                Simplified
              </span>
            </h1>

            <p className="text-xl text-black">
              AI-powered booking optimization and seamless hostel operations.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-5 bg-white rounded-2xl shadow"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                    {f.icon}
                  </div>
                  <span className="text-sm font-medium text-black">
                    {f.text}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-green-600">50+</div>
                <div className="text-sm text-gray-600">Hostels Interested</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600">95%</div>
                <div className="text-sm text-gray-600">Efficiency Boost</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600">24/7</div>
                <div className="text-sm text-gray-600">Support</div>
              </div>
            </div>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-3xl text-black shadow-xl space-y-5"
          >
            <h2 className="text-3xl font-bold">Join the Waitlist</h2>

            <input
              name="hostelName"
              placeholder="Hostel Name"
              required
              value={form.hostelName}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border text-black bg-gray-50"
            />

            <input
              name="email"
              type="email"
              placeholder="Email Address"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 text-black rounded-xl border bg-gray-50"
            />

            <input
              name="phone"
              placeholder="Phone Number"
              required
              value={form.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 text-black rounded-xl border bg-gray-50"
            />

            <select
              name="numberOfRooms"
              required
              value={form.numberOfRooms}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border text-black bg-gray-50"
            >
              <option value="">Number of Rooms</option>
              <option value="1-10">1–10</option>
              <option value="11-25">11–25</option>
              <option value="26-50">26–50</option>
              <option value="51-100">51–100</option>
              <option value="100+">100+</option>
            </select>

            <input
              name="location"
              placeholder="City, Country"
              required
              value={form.location}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border bg-gray-50"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-green-600 text-white font-semibold hover:scale-105 transition"
            >
              {loading ? 'Processing…' : 'Join Hostel Waitlist 🏨'}
            </button>

            {message && (
              <div
                className={`p-4 rounded-xl ${
                  message.type === 'success'
                    ? 'bg-green-50 text-green-700'
                    : 'bg-red-50 text-red-700'
                }`}
              >
                {message.text}
              </div>
            )}

            <p className="text-xs text-center text-gray-500 pt-2">
              🔒 Your data is secure and never shared
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
