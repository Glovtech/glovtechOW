'use client'

import { useEffect, useRef, useState } from 'react'

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

interface Product {
  title: string
  description: string
  icon: string
  link: string
  gradient: string
  details: string
}

export default function ProductsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const products: Product[] = [
    {
      title: 'Pharmacy Management System',
      description: 'Glovtech specializes in the medTech space, offering cutting-edge technology that streamlines Pharmacy management and minimizes loss.',
      icon: '💊',
      link: 'https://glovtechghana.com/pharma-erp',
      gradient: 'from-blue-500 to-blue-700',
      details: 'Secure pharmacy transactions and inventory management with expiry date tracking',
    },
    {
      title: 'Hostel Management System',
      description: 'We optimize hostel booking and management with our innovative platform for seamless operations.',
      icon: '🏨',
      link: 'https://glovtechghana.com/hostel-management',
      gradient: 'from-purple-500 to-purple-700',
      details: 'AI-driven booking optimization and seamless management tools for hostels',
    },
    {
      title: 'Glovi - AI Language Tutor',
      description: 'Custom AI friend tailored to assist you in learning a new language with ease and fun through interactive conversations.',
      icon: '🤖',
      link: 'https://glovtechghana.com/glovi',
      gradient: 'from-green-500 to-green-700',
      details: 'Personalized AI language learning companion with interactive features',
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header with Motion Div Effect */}
        <FadeIn delay={100}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="text-gray-900">GLOVTECH is a top provider</span>{' '}
              <span className="text-gray-400">of innovative</span>
              <br />
              <span className="text-gray-400">management solutions</span>{' '}
              <span className="text-gray-900">that help individuals and businesses</span>
              <br />
              <span className="text-gray-900">manage</span>{' '}
              <span className="relative inline-flex items-center">
                <span className="relative z-10 text-gray-900 px-2">operations</span>
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="w-16 h-16 bg-green-500 rounded-full opacity-70 animate-pulse"></span>
                </span>
              </span>{' '}
              <span className="text-gray-400">and activities</span>
              <br />
              <span className="text-gray-400">efficiently</span>
            </h2>
          </div>
        </FadeIn>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <FadeIn key={index} delay={200 + index * 100}>
              <a
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div
                  className={`relative bg-gradient-to-br ${product.gradient} rounded-3xl shadow-lg overflow-hidden transition-all duration-500 ${
                    hoveredIndex === index
                      ? 'scale-105 shadow-2xl z-10'
                      : 'scale-100'
                  }`}
                  style={{
                    height: hoveredIndex === index ? '420px' : '340px',
                  }}
                >
                  {/* Pharmacy Icon Visual - Pills */}
                  {index === 0 && (
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                      <div className="absolute top-20 right-12 w-16 h-8 bg-white rounded-full transform rotate-45"></div>
                      <div className="absolute top-32 right-24 w-12 h-6 bg-white rounded-full transform -rotate-12"></div>
                      <div className="absolute bottom-24 left-16 w-20 h-10 bg-white rounded-full transform rotate-25"></div>
                      <div className="absolute bottom-32 right-20 w-14 h-7 bg-white rounded-full transform -rotate-30"></div>
                    </div>
                  )}

                  {/* Hostel Icon Visual - Building */}
                  {index === 1 && (
                    <div className="absolute inset-0 opacity-15 pointer-events-none">
                      <div className="absolute top-16 right-8 w-32 h-40 bg-white rounded-t-lg">
                        <div className="grid grid-cols-3 gap-2 p-2">
                          <div className="w-full h-6 bg-purple-300 rounded"></div>
                          <div className="w-full h-6 bg-purple-300 rounded"></div>
                          <div className="w-full h-6 bg-purple-300 rounded"></div>
                          <div className="w-full h-6 bg-purple-300 rounded"></div>
                          <div className="w-full h-6 bg-purple-300 rounded"></div>
                          <div className="w-full h-6 bg-purple-300 rounded"></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* AI Tutor Icon Visual - Chat Bubbles */}
                  {index === 2 && (
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                      <div className="absolute top-20 right-12">
                        <div className="w-24 h-16 bg-white rounded-2xl rounded-br-none p-3">
                          <div className="space-y-1">
                            <div className="h-2 bg-green-300 rounded w-full"></div>
                            <div className="h-2 bg-green-300 rounded w-3/4"></div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute bottom-32 left-12">
                        <div className="w-20 h-14 bg-white rounded-2xl rounded-bl-none p-3">
                          <div className="space-y-1">
                            <div className="h-2 bg-green-300 rounded w-full"></div>
                            <div className="h-2 bg-green-300 rounded w-2/3"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Icon Badge */}
                  <div className="absolute top-6 left-6 w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl shadow-lg animate-bounce-slow">
                    {product.icon}
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white bg-gradient-to-t from-black/60 to-transparent">
                    <h3 className="text-2xl font-bold mb-3">{product.title}</h3>
                    
                    <p
                      className={`text-sm leading-relaxed transition-all duration-500 ${
                        hoveredIndex === index
                          ? 'opacity-100 max-h-48'
                          : 'opacity-90 max-h-20 line-clamp-3'
                      }`}
                    >
                      {product.description}
                    </p>

                    {/* Additional Details on Hover */}
                    {hoveredIndex === index && (
                      <div className="mt-4 pt-4 border-t border-white/30 animate-fade-in">
                        <p className="text-xs opacity-90 mb-3">{product.details}</p>
                        <div className="flex items-center gap-2 text-sm font-semibold">
                          <span>Learn More</span>
                          <span className="transform transition-transform group-hover:translate-x-1">→</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>

        {/* Bottom Description */}
        <FadeIn delay={600}>
          <div className="mt-16 text-center">
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
              At Glovtech, we deliver innovative solutions across pharmacy management, hostel operations and AI-powered learning. 
              Our products are designed to help businesses streamline operations, improve efficiency and provide exceptional 
              user experiences through cutting-edge technology.
            </p>
          </div>
        </FadeIn>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-10px) translateX(5px);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </section>
  )
}