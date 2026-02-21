'use client'

import { useState, useEffect } from 'react'

export default function HostelWaitlistPage() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [message])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (message) setMessage(null)
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    await new Promise(resolve => setTimeout(resolve, 1500))

    try {
      const res = await fetch('/api/hostel-waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      if (res.ok) {
        setMessage({
          type: 'success',
          text: "🎉 Welcome aboard! You're on the waitlist for Glovtech Hostel Management System."
        })
        setForm({ fullName: '', email: '', phone: '', location: '' })
      } else {
        setMessage({
          type: 'error',
          text: 'Oops! Something went wrong. Please try again.'
        })
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Network error. Please check your connection and try again.'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-black to-green-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-200 rounded-full blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-200 rounded-full blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div
        className={`relative w-full max-w-5xl grid lg:grid-cols-2 gap-8 items-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="text-center lg:text-left space-y-6 px-4">
          <div className="inline-block px-4 py-2 bg-green-100 rounded-full text-green-700 text-sm font-semibold mb-4">
            🚀 Launching soon
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Join the{' '}
            <span className="bg-green-600 bg-clip-text text-transparent">
              Waitlist
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 leading-relaxed">
            Be among the first to experience Glovtech Hostel Management System, the ultimate solution for modern hostel and accommodation operations.
          </p>

          <div className="space-y-4 pt-6">
            {[
              { text: 'Smart room booking & reservations' },
              { text: 'Real-time occupancy analytics' },
              { text: 'Seamless tenant management' },
              { text: 'Multi-property support' }
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 text-gray-400"
                style={{
                  animation: `fadeInLeft 0.6s ease-out ${0.2 + index * 0.1}s both`
                }}
              >
                <span className="font-medium">{feature.text}</span>
              </div>
            ))}
          </div>

          <div className="pt-6 flex items-center gap-4 justify-center lg:justify-start">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-gray-600 border-2 border-white"
                ></div>
              ))}
            </div>
            <div className="text-sm text-gray-400">
              <span className="font-bold text-gray-400">10+</span> already joined
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="bg-gray-400 rounded-3xl shadow-1xl p-6 sm:p-8 lg:p-10 border border-gray-300">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Get Early Access</h2>
              <p className="text-gray-800">Fill in your details and we&apos;ll notify you first!</p>
            </div>

            <div className="space-y-5">
              <div className="group">
                <div className="relative">
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter your full name"
                    required
                    value={form.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pl-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500"
                  />
                </div>
              </div>

              <div className="group">
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pl-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500"
                  />
                </div>
              </div>

              <div className="group">
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pl-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500"
                  />
                </div>
              </div>

              <div className="group">
                <div className="relative">
                  <input
                    type="text"
                    name="location"
                    placeholder="Enter your location"
                    required
                    value={form.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pl-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500"
                  />
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full py-4 px-6 rounded-full font-semibold text-white transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl'
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2 rounded-xl">
                    Join Waitlist
                  </span>
                )}
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex items-center justify-center gap-4 text-xs text-gray-800 font-medium">
                <span className="flex items-center gap-1">
                  Secure & Private
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  Instant Confirmation
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {message && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setMessage(null)}
          ></div>

          <div
            className={`relative bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full animate-scaleIn ${
              message.type === 'success'
                ? 'border-2 border-green-600'
                : 'border-2 border-red-500'
            }`}
          >
            <button
              onClick={() => setMessage(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
              message.type === 'success' ? 'bg-green-100' : 'bg-red-100'
            }`}>
              <span className="text-4xl">
                {message.type === 'success' ? '🎉' : '❌'}
              </span>
            </div>

            <h3 className={`text-2xl font-bold text-center mb-3 ${
              message.type === 'success' ? 'text-green-600' : 'text-red-600'
            }`}>
              {message.type === 'success' ? 'Success!' : 'Oops!'}
            </h3>

            <p className="text-gray-700 text-center mb-6 leading-relaxed">
              {message.text}
            </p>

            <button
              onClick={() => setMessage(null)}
              className={`w-full py-3 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                message.type === 'success'
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              Got it!
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}