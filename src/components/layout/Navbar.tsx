import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ThemedButton } from '../common/ThemedButton'

interface NavItem {
  label: string
  href: string
  type?: 'anchor' | 'route'
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/', type: 'route' },
  { label: 'Industries', href: '#industries', type: 'anchor' },
  { label: 'Products', href: '#products', type: 'anchor' },
  { label: 'Blog', href: '#blog', type: 'anchor' },
  { label: 'Contact Us', href: '#contact', type: 'anchor' },
  { label: 'About Us', href: '/about', type: 'route' }
]

const ACTIVE_ITEM = 'Home'

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  // const [isScrolled, setIsScrolled] = useState(false)
  const [activeItem, setActiveItem] = useState(ACTIVE_ITEM)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

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

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    e.preventDefault()
    setActiveItem(item.label)
    setIsMenuOpen(false)

    // Navigate to home page first if not already there
    if (location.pathname !== '/') {
      // Use navigate for SPA navigation
      window.location.assign(`/${item.href}`)
    } else {
      // Smooth scroll to section on home page
      const targetId = item.href.replace('#', '')
      const element = document.getElementById(targetId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  const handleGetDemoClick = () => {
    console.info('Get a demo CTA triggered')
  }

  useEffect(() => {
    const updateActiveItem = () => {
      if (location.pathname === '/about') {
        if (activeItem !== 'About Us') {
          setActiveItem('About Us')
        }
        return
      }

      if (location.pathname === '/') {
        const currentItem = NAV_ITEMS.find((item) => item.label === activeItem)
        if (!currentItem || currentItem.type === 'route') {
          if (activeItem !== 'Home') {
            setActiveItem('Home')
          }
        }
      }
    }

    const timeoutId = setTimeout(updateActiveItem, 0)
    return () => clearTimeout(timeoutId)
  }, [location.pathname, activeItem])

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
            src="/logo.png"
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
              const linkClasses = `inline-flex h-full items-center pt-[2px] transition-colors duration-150 ${
                isActive ? 'text-hero-title' : 'hover:text-hero-title'
              } ${isActive ? 'font-medium' : 'font-normal'}`

              return (
                <li key={item.label} className="relative border-none">
                  {item.type === 'route' ? (
                    <Link
                      to={item.href}
                      onClick={() => handleNavClick(item)}
                      className={linkClasses}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <span>{item.label}</span>
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      onClick={(e) => handleAnchorClick(e, item)}
                      className={linkClasses}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <span>{item.label}</span>
                    </a>
                  )}
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
            const mobileClasses = `flex items-center rounded-[12px] px-3 py-2 transition-colors duration-150 ${
              isActive
                ? 'bg-hero-title/10 text-hero-title'
                : 'hover:bg-hero-title/5 hover:text-hero-title'
            }`

            if (item.type === 'route') {
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => handleNavClick(item)}
                  className={mobileClasses}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              )
            }

            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleAnchorClick(e, item)}
                className={mobileClasses}
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