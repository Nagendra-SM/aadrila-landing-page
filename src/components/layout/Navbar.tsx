import React, { useEffect, useRef, useState } from 'react'
import { ThemedButton } from '../common/ThemedButton'

interface NavItem {
  label: string
  href: string
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Industries', href: '#industries' },
  { label: 'Products', href: '#products' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact Us', href: '#contact' },
  { label: 'About Us', href: '#about' }
]

const ACTIVE_ITEM = 'About Us'

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeItem, setActiveItem] = useState(ACTIVE_ITEM)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12)
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  const handleNavClick = (item: NavItem) => {
    setActiveItem(item.label)
    setIsMenuOpen(false)
  }

  const handleGetDemoClick = () => {
    // TODO: wire up analytics or navigation when backend integration is ready
    console.info('Get a demo CTA triggered')
  }

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className={`fixed top-[11px] left-[3px] right-[3px] z-50 h-[85px] transition-all duration-300 ease-out bg-[FFFFFF0];
 backdrop-blur-[20px] rounded-[18px]`}
    >
      <div className="mx-auto flex h-full w-full max-w-[1439.78px] items-center justify-between px-[32px]">
        <a
          href="/"
          className="flex items-center gap-2 text-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#96B5F1]"
          aria-label="Aadrila Technologies home"
        >
          <img
            src="/images/logo.png"
            alt="Aadrila Technologies logo"
            className="h-[48px] w-auto object-contain"
            draggable={false}
          />
          <span className="flex flex-col leading-tight">
            <span className="text-[28px] font-medium tracking-[0.15em] font-raleway text-black ">AADRILA</span>
            <span className="text-[11px] font-semibold tracking-[0.46em] font-raleway text-black">TECHNOLOGIES</span>
          </span>
        </a>

        <div className="hidden lg:flex h-full items-center">
          <ul className="flex items-center gap-[32px] text-base leading-4 font-normal tracking-[0.02em] font-manrope text-nav">
            {NAV_ITEMS.map((item) => {
              const isActive = activeItem === item.label
              return (
                <li key={item.label} className="relative border-none">
                  <a
                    href={item.href}
                    onClick={() => handleNavClick(item)}
                    className={`inline-flex h-full items-center pt-[2px] transition-colors duration-150 ${
                      isActive ? 'text-hero-title' : 'hover:text-hero-title'
                    } ${
                      isActive ? 'font-medium' : 'font-normal'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span>{item.label}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="hidden lg:flex items-center">
          <ThemedButton onClick={handleGetDemoClick}>
            Get a Demo
          </ThemedButton>
        </div>

        <div className="flex h-full items-center lg:hidden">
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/8 bg-white/60 text-[#2F2F2F] shadow-[0_8px_16px_rgba(32,41,58,0.06)] transition-colors duration-200 backdrop-blur-[12px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#96B5F1]"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <svg
              className={`h-5 w-5 transition-transform duration-200 ${isMenuOpen ? 'rotate-90' : ''}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={mobileMenuRef}
        id="mobile-menu"
        className={`lg:hidden overflow-hidden border-t border-white/50 bg-white/95 backdrop-blur-[20px] transition-all duration-300 ease-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="space-y-1 px-6 py-4 text-[16px] font-medium font-manrope text-body">
          {NAV_ITEMS.map((item) => {
            const isActive = activeItem === item.label
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={() => handleNavClick(item)}
                className={`flex items-center rounded-[12px] px-3 py-2 transition-colors duration-150 ${
                  isActive
                    ? 'bg-hero-title/10 text-hero-title'
                    : 'hover:bg-hero-title/5 hover:text-hero-title'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </a>
            )
          })}

          <ThemedButton onClick={handleGetDemoClick} className="mt-4 w-full">
            Get a Demo
          </ThemedButton>
        </div>
      </div>
    </nav>
  )
}

export default Navbar