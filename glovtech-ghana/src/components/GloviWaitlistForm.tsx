'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, Globe, Sparkles, Award, ArrowLeft } from 'lucide-react'

export default function GloviWaitlistForm() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    targetLanguage: '',
    currentLevel: '',
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
      const res = await fetch('/api/glovi-waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          product: 'Glovi – AI Language Tutor',
        }),
      })

      if (!res.ok) throw new Error()

      setMessage({
        type: 'success',
        text: "🎉 You're officially on the Glovi waitlist!",
      })

      setForm({
        fullName: '',
        email: '',
        phone: '',
        targetLanguage: '',
        currentLevel: '',
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
    {
      icon: <MessageCircle className="w-6 h-6" />,
      text: 'Interactive AI conversations',
      color: 'from-green-400 to-emerald-500',
    },
    {
      icon: <Globe className="w-6 h-6" />,
      text: '50+ languages supported',
      color: 'from-blue-400 to-cyan-500',
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      text: 'Personalized learning path',
      color: 'from-purple-400 to-pink-500',
    },
    {
      icon: <Award className="w-6 h-6" />,
      text: 'Progress tracking & rewards',
      color: 'from-yellow-400 to-orange-500',
    },
  ]

  const languages = [
    'Spanish',
    'French',
    'German',
    'Italian',
    'Portuguese',
    'Chinese (Mandarin)',
    'Japanese',
    'Korean',
    'Arabic',
    'Russian',
    'Hindi',
    'Other',
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
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
            <span className="inline-flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full text-green-700 text-sm font-semibold">
              <Sparkles className="w-4 h-4" />
              AI-Powered Learning
            </span>

            <h1 className="text-5xl font-bold">
              Meet{' '}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Glovi
              </span>
            </h1>

            <p className="text-xl text-gray-600">
              Your Personal AI Language Tutor
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-5 bg-white rounded-2xl shadow"
                >
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${f.color} rounded-xl flex items-center justify-center text-white`}
                  >
                    {f.icon}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {f.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="bg-white text-black p-8 rounded-3xl shadow-xl space-y-5"
          >
            <h2 className="text-3xl font-bold">Join the Waitlist</h2>

            <input
              name="fullName"
              placeholder="Full Name"
              required
              value={form.fullName}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border text-black bg-gray-50"
            />

            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl text-black border bg-gray-50"
            />

            <input
              name="phone"
              placeholder="Phone Number"
              required
              value={form.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border bg-gray-50"
            />

            <select
              name="targetLanguage"
              required
              value={form.targetLanguage}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border bg-gray-50"
            >
              <option value="">Target Language</option>
              {languages.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>

            <select
              name="currentLevel"
              required
              value={form.currentLevel}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border bg-gray-50"
            >
              <option value="">Current Level</option>
              <option value="A1">Beginner (A1)</option>
              <option value="A2">Elementary (A2)</option>
              <option value="B1">Intermediate (B1)</option>
              <option value="B2">Upper Intermediate (B2)</option>
              <option value="C1">Advanced (C1)</option>
              <option value="C2">Proficient (C2)</option>
            </select>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold hover:scale-105 transition"
            >
              {loading ? 'Processing…' : 'Join Glovi Waitlist 🤖'}
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
          </form>
        </div>
      </div>
    </div>
  )
}
