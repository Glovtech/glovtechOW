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

export default function SolutionsSection() {
  const solutions = [
    {  text: 'AI-Powered Email Automation' },
    {  text: 'Product Design & Development' },
    {  text: 'SEO Optimization' },
    {  text: 'IT Consulting & Tech Strategy' },
    {  text: 'CMS Integration (WordPress, Shopify)' },
    {  text: 'Social Media Management' },
    {  text: 'Google Ads & Facebook Ads Setup' },
    {  text: 'Custom Web Portals & Dashboards' },
    { text: 'Domain & Hosting Setup' },
    {  text: 'Branding & Graphic Design' },
  ]

  const standoutPoints = [
    {  text: 'Local insight with global tech trends' },
    { text: 'Tailored for African businesses' },
    {  text: 'Intelligent automation solutions' },
    {  text: 'Scale smart, grow faster' },
  ]

  return (
    <section id="solutions" className="relative py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-50 rounded-full blur-3xl opacity-30 translate-x-1/2 translate-y-1/2"></div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <FadeIn delay={100}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Comprehensive Solutions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to transform your business digitally
            </p>
          </div>
        </FadeIn>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Left Column - Solutions List */}
          <FadeIn delay={200}>
            <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Solutions</h3>
              </div>
              
              <div className="space-y-4">
                {solutions.map((solution, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 group cursor-pointer"
                  >
                    <span className="text-gray-700 group-hover:text-blue-600 transition-colors duration-300">
                      {solution.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Center Column - Logo/Video */}
          <FadeIn delay={300}>
            <div className="flex flex-col items-center justify-center h-full">
              <div className="relative group">
                {/* Video Container */}
                <div className="relative w-64 h-64 rounded-full overflow-hidden shadow-2xl ring-8 ring-blue-100 group-hover:ring-blue-200 transition-all duration-300">
                  <video
                    src="/glovtech.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Decorative Rings */}
                <div className="absolute inset-0 -z-10">
                  <div className="absolute inset-0 rounded-full border-2 border-blue-200 animate-ping opacity-20"></div>
                  <div className="absolute inset-0 rounded-full border-2 border-green-200 animate-ping opacity-20" style={{ animationDelay: '1s' }}></div>
                </div>
              </div>

              {/* Brand Text */}
              <div className="mt-8 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Glovtech Ghana</h2>
                <p className="text-gray-600">Innovation meets impact</p>
              </div>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">100+</div>
                  <div className="text-xs text-gray-600 mt-1">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">50+</div>
                  <div className="text-xs text-gray-600 mt-1">Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">5+</div>
                  <div className="text-xs text-gray-600 mt-1">Years</div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Right Column - What Makes Us Stand Out */}
          <FadeIn delay={400}>
            <div className="bg-gray-800 rounded-3xl shadow-lg p-8 text-white hover:shadow-xl transition-shadow duration-300">
             

              <p className="text-white/90 leading-relaxed mb-8">
                We bridge innovation and impact. We deliver intelligent
                automation and digital services tailored for Ghanaian and African businesses.
                Our team combines local insight with global tech trends to help you scale smart.
              </p>

              {/* Standout Points */}
              <div className="space-y-4">
                {standoutPoints.map((point, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-300"
                  >
                  
                    <span className="text-white/90">{point.text}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
             <a 
                href="tel:+233540808755"
                className="block w-full mt-8 px-6 py-4 bg-white text-green-600 font-semibold rounded-full hover:bg-blue-50 transition-colors duration-300 shadow-lg text-center"
              >
                Get Started Today →
              </a>
            </div>
          </FadeIn>
        </div>

        {/* Bottom CTA Section */}
        <FadeIn delay={600}>
          <div className="mt-20 text-center bg-gray-800 rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h3>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Join hundreds of businesses across Africa who trust Glovtech for their digital transformation journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+233540808755"
                className="px-8 py-4 bg-white text-green-600 font-semibold rounded-full hover:bg-blue-50 transition-colors duration-300 shadow-lg"
              >
                Call Us Now
              </a>
              <a
                href="#contact"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white font-semibold rounded-full hover:bg-white/20 transition-colors duration-300"
              >
                Schedule Consultation
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}