'use client'

import { useEffect, useState } from 'react'

interface FadeInTextProps {
  children: React.ReactNode
  delay?: number
}

function FadeInText({ children, delay = 0 }: FadeInTextProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div
      className={`transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      {children}
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col bg-white pt-24 md:pt-32">
      {/* Main Content */}
      <div className="flex-1 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            
            {/* Left Column - Text Content */}
            <div className="order-2 lg:order-1 space-y-6">
              <FadeInText delay={200}>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Empowering Dispute Management Through Advanced tech Solutions
                </h1>
              </FadeInText>

              <FadeInText delay={400}>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Using Predictive digital tech solutions to Streamline Conflict Management and Enhance Customer Efficiency
                </p>
              </FadeInText>

              <FadeInText delay={600}>
                <button className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors shadow-lg">
                  Get Started Today →
                </button>
              </FadeInText>

              <FadeInText delay={800}>
                <div className="flex items-center gap-3 pt-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold">i</span>
                  </div>
                  <span className="text-gray-600">Discover How We Can Help You</span>
                </div>
              </FadeInText>
            </div>

            {/* Right Column - Globe Card */}
            <FadeInText delay={400}>
              <div className="order-1 lg:order-2 relative">
                <div className="relative bg-gradient-to-br from-green-900 via-green-800 to-green-700 rounded-3xl shadow-2xl overflow-hidden aspect-square max-w-lg mx-auto">
                  
                  {/* Header Bar */}
                  <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-xs text-white font-medium z-10">
                    Contact Us
                  </div>

                  {/* Globe Visualization */}
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="relative w-full h-full max-w-md max-h-md">
                      {/* Africa Map Dots Pattern */}
                      <div className="absolute inset-0 opacity-40">
                        <svg viewBox="0 0 400 400" className="w-full h-full">
                          {/* Dotted pattern simulating Africa */}
                          {Array.from({ length: 80 }).map((_, i) => (
                            <circle
                              key={i}
                              cx={150 + Math.random() * 100}
                              cy={120 + Math.random() * 160}
                              r="1.5"
                              fill="rgba(74, 222, 128, 0.6)"
                            />
                          ))}
                        </svg>
                      </div>

                      {/* Orbital Rings */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-4/5 h-4/5 border-2 border-green-400/20 rounded-full" style={{ transform: 'rotateX(60deg) rotateZ(20deg)' }}></div>
                        <div className="absolute w-3/5 h-3/5 border-2 border-green-400/30 rounded-full animate-pulse" style={{ transform: 'rotateX(60deg) rotateZ(-20deg)' }}></div>
                      </div>

                      {/* Connection Lines */}
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                        <line x1="100" y1="150" x2="280" y2="100" stroke="rgba(74, 222, 128, 0.4)" strokeWidth="2" />
                        <line x1="200" y1="80" x2="250" y2="280" stroke="rgba(74, 222, 128, 0.4)" strokeWidth="2" />
                        <line x1="120" y1="250" x2="300" y2="200" stroke="rgba(74, 222, 128, 0.4)" strokeWidth="2" />
                      </svg>

                      {/* Connection Points */}
                      <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                      <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-green-300 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
                      <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-green-200 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
                    </div>
                  </div>

                  {/* Bottom Info Card */}
                  <div className="absolute bottom-6 left-6 right-6 bg-black/40 backdrop-blur-md rounded-2xl p-4 z-10">
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2">
                        <div className="w-8 h-8 rounded-full bg-green-400 border-2 border-white"></div>
                        <div className="w-8 h-8 rounded-full bg-blue-400 border-2 border-white"></div>
                        <div className="w-8 h-8 rounded-full bg-purple-400 border-2 border-white"></div>
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">Over 90% Business Growth</p>
                        <p className="text-green-200 text-xs">Cape Bank of Africa</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInText>
          </div>
        </div>
      </div>
    </section>
  )
}