'use client'

import { useEffect, useRef } from 'react'

interface FadeInProps {
  children: React.ReactNode
  delay?: number
}

function FadeIn({ children, delay = 0 }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('opacity-100', 'translate-y-0')
              entry.target.classList.remove('opacity-0', 'translate-y-8')
            }, delay)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={ref} className="opacity-0 translate-y-8 transition-all duration-700">
      {children}
    </div>
  )
}

export default function AboutSection() {
  const partners = [
    { name: 'GLOCOM PHARMACY', logo: 'GP', color: 'bg-green-700' },
    { name: 'BRAMA', logo: 'BM', color: 'bg-green-200' },
    { name: 'MINISTRY OF HEALTH', logo: 'MOH', color: 'bg-green-700' },
    { name: 'GLOCOM PHARMACY', logo: 'GP', color: 'bg-green-200' },
    { name: 'BRAMA', logo: 'BM', color: 'bg-green-700' },
    { name: 'KINGS COLLEGE', logo: 'KC', color: 'bg-green-200' },
  ]

  // Duplicate for seamless loop
  const duplicatedPartners = [...partners, ...partners, ...partners]

  return (
    <section id="about" className="py-20 bg-gray-50">
      {/* Logo Slideshow */}
      <div className="overflow-hidden bg-white py-8 mb-16 border-y border-gray-200">
        <div className="flex animate-scroll">
          {duplicatedPartners.map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center flex-shrink-0 mx-8"
              style={{ minWidth: '200px' }}
            >
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 ${partner.color} rounded-full flex items-center justify-center text-white font-bold text-xs`}>
                  {partner.logo}
                </div>
                <span className="text-gray-600 font-medium text-sm whitespace-nowrap">
                  {partner.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Partnership Section */}
        <FadeIn delay={200}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Left Content */}
            <div className="space-y-6">
              {/* Tags */}
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-green-600 text-white text-sm rounded-full font-medium">
               IT Consulting
                </span>
                <span className="px-4 py-2 bg-gray-200 text-gray-700 text-sm rounded-full font-medium">
              Ai Automation
                </span>
                <span className="px-4 py-2 bg-gray-200 text-gray-700 text-sm rounded-full font-medium">
              App Design & Development
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Empowering Solutions Through Partnerships
              </h2>

              <p className="text-lg text-gray-600 leading-relaxed">
                At Glovtech, our strategic alliances enable us to deliver innovative solutions effectively. By collaborating with industry leaders, we enhance our capabilities and ensure our clients receive the best tools for managing disputes.
              </p>
            </div>

            {/* Right Visual */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-green-100 via-green-50 to-white rounded-3xl p-12 shadow-lg">
                {/* Floating Partner Logos */}
                <div className="relative h-96">
                  <div className="absolute top-8 left-12 w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center animate-float">
                    <span className="text-green-600 font-bold text-sm">VALUE</span>
                  </div>
                  
                  <div className="absolute top-20 right-16 w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center animate-float" style={{ animationDelay: '0.5s' }}>
                    <span className="text-green-600 font-bold">TALENT</span>
                  </div>

                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-green-600 rounded-full shadow-xl flex items-center justify-center animate-pulse">
                    <span className="text-white font-bold text-lg">GLOVTECH</span>
                  </div>

                  <div className="absolute bottom-20 left-8 w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center animate-float" style={{ animationDelay: '1s' }}>
                    <span className="text-green-600 font-bold text-sm">NMI</span>
                  </div>

                  <div className="absolute bottom-12 right-20 w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center animate-float" style={{ animationDelay: '1.5s' }}>
                    <span className="text-green-600 font-bold text-sm">ECO</span>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-32 left-24 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                  <div className="absolute bottom-32 right-32 w-2 h-2 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '0.7s' }}></div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}