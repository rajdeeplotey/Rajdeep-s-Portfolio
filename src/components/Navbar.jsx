import { useEffect, useRef, useState } from 'react'

const links = [
  { label: 'About', href: '#about', target: '#about' },
  { label: 'What I Build', href: '#work', target: '.what-builds-section' },
  { label: 'Projects', href: '#work', target: '.projects' },
  { label: 'Experience', href: '#experience', target: '#experience' },
  { label: 'Tech Stack', href: '#tech-stack', target: '#tech-stack' },
]

const cta = { label: "Let's Talk", href: '#contact', target: '#contact' }

export default function Navbar({ onTalkClick }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const isScrolledRef = useRef(false)

  useEffect(() => {
    let rafId = null

    const updateHeader = () => {
      if (rafId !== null) return

      rafId = window.requestAnimationFrame(() => {
        rafId = null
        const nextIsScrolled = window.scrollY > 40
        if (nextIsScrolled === isScrolledRef.current) return
        isScrolledRef.current = nextIsScrolled
        setIsScrolled(nextIsScrolled)
      })
    }

    updateHeader()
    window.addEventListener('scroll', updateHeader, { passive: true })

    return () => {
      window.removeEventListener('scroll', updateHeader)
      if (rafId !== null) window.cancelAnimationFrame(rafId)
    }
  }, [])

  useEffect(() => {
    if (!isOpen) return undefined

    const handleOutsidePointer = (event) => {
      if (!event.target.closest('.navbar')) closeMenu()
    }

    document.addEventListener('pointerdown', handleOutsidePointer)
    return () => document.removeEventListener('pointerdown', handleOutsidePointer)
  }, [isOpen])

  const closeMenu = () => setIsOpen(false)

  const openContactOptions = (event) => {
    event.preventDefault()
    closeMenu()
    onTalkClick(event)
  }

  const navigateTo = (event, target) => {
    const section = document.querySelector(target)
    if (!section) return

    event.preventDefault()
    section.scrollIntoView({ behavior: 'auto', block: 'start' })
    window.history.replaceState(null, '', target.startsWith('#') ? target : `#${section.id || 'work'}`)
    closeMenu()
  }

  return (
    <header className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <a className="navbar-brand" href="#home" aria-label="RAJDEEP SINGH home" onClick={closeMenu}>
        <span className="navbar-name">RAJDEEP SINGH</span>
      </a>
      <button
        className={`navbar-toggle ${isOpen ? 'navbar-toggle-open' : ''}`}
        type="button"
        aria-expanded={isOpen}
        aria-controls="primary-navigation"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span />
        <span />
        <span className="sr-only">Toggle navigation</span>
      </button>
      <nav id="primary-navigation" className={`navbar-links ${isOpen ? 'navbar-links-open' : ''}`} aria-label="Primary navigation">
        {links.map(({ label, href, target }) => (
          <a href={href} key={label} onClick={(event) => navigateTo(event, target)}>{label}</a>
        ))}
      </nav>
      <a className="navbar-cta navbar-link-prominent" href={cta.href} onClick={openContactOptions}>{cta.label}</a>
    </header>
  )
}
