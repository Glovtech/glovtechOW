'use client'

import { useState, useEffect } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [menuOpen])

  const navLinks = [
    { label: 'About us', href: '#about' },
    { label: 'Products & Services', href: '#products' },
    { label: 'Partner Portal', href: '#partner' },
    { label: 'Technical Information', href: '#technical' },
    { label: 'Developer Portal', href: '#developer' },
    { label: 'Contact & Support', href: '#contact' },
  ]

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-6 md:px-12 py-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 mb-6">
                  <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-xl">G</span>
                  </div>
                  <h2 className="text-2xl font-bold text-black">lovtech</h2>
                </div>
           
          </div>

          {/* Menu Button */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors"
          >
            Menu {menuOpen ? '✕' : '→'}
          </button>

          {/* Support Button */}
          <a 
            href="#support"
            className="hidden md:block border border-gray-300 px-6 py-2 rounded-full text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Support →
          </a>
        </div>
      </nav>

      {/* Full Screen Dropdown Menu */}
      <div 
        className={`fixed inset-0 z-40 bg-white transition-all duration-500 ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        style={{ top: '88px' }} // Offset for navbar height
      >
        <div className="flex items-center justify-center min-h-full px-6 py-12">
          <nav className="space-y-8 text-center">
            {navLinks.map((link, index) => (
              <div
                key={link.href}
                className={`transition-all duration-500 delay-${index * 100} ${
                  menuOpen 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-4'
                }`}
              >
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block text-3xl md:text-4xl lg:text-5xl font-medium text-gray-800 hover:text-green-600 transition-colors"
                >
                  {link.label}
                </a>
              </div>
            ))}

            {/* Mobile Support Link */}
            <div className="pt-8 md:hidden">
              <a
                href="#support"
                onClick={() => setMenuOpen(false)}
                className="inline-block border border-gray-300 px-8 py-3 rounded-full text-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Support →
              </a>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}