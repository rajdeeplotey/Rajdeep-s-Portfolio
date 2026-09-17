import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import Navbar from './components/Navbar'
import About from './components/About'
import Capabilities from './components/Capabilities'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import TechStack from './components/TechStack'
import WorkflowSequence from './components/WorkflowSequence'
import AboutWorkTransition from './components/AboutWorkTransition'
import ProjectDetail from './components/ProjectDetail'
import { portfolioReturnScrollKey } from './navigation'

gsap.registerPlugin(ScrollToPlugin)

function getProjectSlug(pathname = window.location.pathname) {
  const match = pathname.match(/^\/projects\/([^/]+)\/?$/)
  return match?.[1] || null
}
function getReturnDuration(scrollY) {
  const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
  return Math.min(4, Math.max(1.2, 1.2 + (scrollY / maxScroll) * 2.8))
}

function PortfolioHome() {
  const [isLoading, setIsLoading] = useState(true)
  const [isBackToTopVisible, setIsBackToTopVisible] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [isContactClosing, setIsContactClosing] = useState(false)
  const [contactPosition, setContactPosition] = useState({ top: 92, left: 0, transformOrigin: 'top right' })
  const contactPanelRef = useRef(null)
  const contactCloseTimerRef = useRef(null)
  const returnTweenRef = useRef(null)

  useLayoutEffect(() => {
    window.history.scrollRestoration = 'manual'
    const savedPosition = sessionStorage.getItem(portfolioReturnScrollKey)
    if (savedPosition === null) {
      const resetToTop = () => window.scrollTo(0, 0)
      resetToTop()
      requestAnimationFrame(() => {
        resetToTop()
        requestAnimationFrame(resetToTop)
      })
      return
    }

    sessionStorage.removeItem(portfolioReturnScrollKey)
    let position
    try {
      position = JSON.parse(savedPosition)
    } catch {
      return
    }

    const scrollY = Number(position.scrollY)
    if (!Number.isFinite(scrollY)) return

    const restorePosition = () => {
      window.scrollTo(0, Math.max(0, scrollY))
    }

    restorePosition()
    requestAnimationFrame(() => {
      restorePosition()
      requestAnimationFrame(restorePosition)
    })
  }, [])

  const animateToTop = (startScroll = window.scrollY) => {
    if (startScroll <= 1) return

    returnTweenRef.current?.kill()
    returnTweenRef.current = gsap.to(window, {
      duration: getReturnDuration(startScroll),
      ease: 'power2.inOut',
      scrollTo: { y: 0, autoKill: true },
      onComplete: () => { returnTweenRef.current = null },
    })
  }

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'
    const loadingTimer = window.setTimeout(() => setIsLoading(false), 200)
    let rafId = null
    const updateScrollProgress = () => {
      if (rafId !== null) return

      rafId = window.requestAnimationFrame(() => {
        rafId = null
        const max = document.documentElement.scrollHeight - window.innerHeight
        document.documentElement.style.setProperty('--scroll-progress', `${max ? window.scrollY / max : 0}`)
      })
    }

    updateScrollProgress()
    window.addEventListener('scroll', updateScrollProgress, { passive: true })
    return () => {
      window.removeEventListener('scroll', updateScrollProgress)
      if (rafId !== null) window.cancelAnimationFrame(rafId)
      window.history.scrollRestoration = previousScrollRestoration
      window.clearTimeout(loadingTimer)
    }
  }, [])

  useEffect(() => {
    let rafId = null

    const updateBackToTopVisibility = () => {
      if (rafId !== null) return

      rafId = window.requestAnimationFrame(() => {
        rafId = null
        setIsBackToTopVisible(window.scrollY > window.innerHeight)
      })
    }

    updateBackToTopVisibility()
    window.addEventListener('scroll', updateBackToTopVisibility, { passive: true })
    window.addEventListener('resize', updateBackToTopVisibility)

    return () => {
      window.removeEventListener('scroll', updateBackToTopVisibility)
      window.removeEventListener('resize', updateBackToTopVisibility)
      if (rafId !== null) window.cancelAnimationFrame(rafId)
    }
  }, [])

  useEffect(() => () => window.clearTimeout(contactCloseTimerRef.current), [])

  useEffect(() => {
    if (!isContactOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeContactOptions()
    }
    const handlePointerDown = (event) => {
      if (contactPanelRef.current?.contains(event.target)) return
      if (event.target.closest('.navbar-cta, .contact-cta')) return
      closeContactOptions()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('pointerdown', handlePointerDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [isContactOpen])

  const closeContactOptions = () => {
    if (!isContactOpen || isContactClosing) return
    setIsContactClosing(true)
    contactCloseTimerRef.current = window.setTimeout(() => {
      setIsContactOpen(false)
      setIsContactClosing(false)
    }, 320)
  }

  const openContactOptions = (event) => {
    if (isContactOpen) {
      closeContactOptions()
      return
    }

    window.clearTimeout(contactCloseTimerRef.current)
    setIsContactClosing(false)
    const trigger = event?.currentTarget
    const rect = trigger?.getBoundingClientRect()
    const panelWidth = 132
    const panelHeight = 68
    const gap = 6
    const left = rect ? Math.max(16, Math.min(rect.left + (rect.width - panelWidth) / 2 - 8, window.innerWidth - panelWidth - 16)) : window.innerWidth - panelWidth - 24
    const belowTop = rect ? rect.bottom + gap : 92
    const opensAbove = belowTop + panelHeight > window.innerHeight && rect

    setContactPosition({
      top: opensAbove ? Math.max(16, rect.top - panelHeight - gap) : belowTop,
      left,
      transformOrigin: opensAbove ? 'bottom right' : 'top right',
      offset: opensAbove ? '8px' : '-8px',
      arrowTransform: 'none',
      opensAbove: Boolean(opensAbove),
    })
    setIsContactOpen(true)
  }

  return (
    <div className="site-shell">
      <div className={`page-loader ${isLoading ? '' : 'page-loader-hidden'}`} aria-hidden="true">
        <span />
      </div>
      <div className="scroll-progress" aria-hidden="true" />
      <Navbar onTalkClick={openContactOptions} />

      <main id="home">
        <WorkflowSequence />
        <AboutWorkTransition>
          <About />
          <Capabilities />
        </AboutWorkTransition>
        <Projects />
        <Experience />
        <TechStack />
        <Contact onTalkClick={openContactOptions} />
      </main>

      <Footer />
      <a
        className={`about-up-float ${isBackToTopVisible ? '' : 'about-up-hidden'}`}
        href="#home"
        aria-label="Return to site start"
        title="Return to site start"
        onClick={(event) => {
          event.preventDefault()
          animateToTop()
        }}
      >
        ↑
      </a>
      {isContactOpen && (
        <section
          ref={contactPanelRef}
          className={`contact-modal ${isContactClosing ? 'contact-modal-closing' : ''} ${contactPosition.opensAbove ? 'contact-modal-above' : ''}`}
          role="region"
          aria-label="Contact options"
          style={{ '--contact-top': `${contactPosition.top}px`, '--contact-left': `${contactPosition.left}px`, '--contact-origin': contactPosition.transformOrigin, '--contact-offset': contactPosition.offset, '--contact-arrow-transform': contactPosition.arrowTransform }}
        >
          <div className="contact-modal-options">
            <a href="https://wa.me/919779082731" target="_blank" rel="noreferrer" aria-label="WhatsApp" title="WhatsApp" onClick={() => setIsContactOpen(false)}>
              <i className="contact-modal-icon contact-modal-icon-whatsapp" aria-hidden="true">
                <svg viewBox="0 0 32 32"><path d="M16 3.2a12.8 12.8 0 0 0-11.1 19.2L3.2 29l6.8-1.7A12.8 12.8 0 1 0 16 3.2Zm0 23.2a10.4 10.4 0 0 1-5.3-1.45l-.38-.23-4.03 1 1.08-3.92-.25-.4A10.4 10.4 0 1 1 16 26.4Z" /><path d="M21.7 18.7c-.3-.15-1.78-.88-2.05-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.95 1.18-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.67-2.08-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.68-1.63-.93-2.23-.25-.6-.5-.52-.68-.53h-.58c-.2 0-.52.08-.8.37-.28.3-1.04 1.02-1.04 2.5s1.07 2.9 1.22 3.1c.15.2 2.1 3.2 5.1 4.5.72.3 1.28.48 1.72.61.72.23 1.38.2 1.9.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.17-1.43-.07-.13-.27-.2-.57-.35Z" /></svg>
              </i>
            </a>
            <a href="tel:+919779082731" aria-label="Call" title="Call" onClick={() => setIsContactOpen(false)}>
              <i className="contact-modal-icon contact-modal-icon-phone" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d="M6.6 3.5 9 3l2 4.5-1.7 1.5a13.7 13.7 0 0 0 5.7 5.7l1.5-1.7 4.5 2-.5 2.4c-.2 1-1.1 1.6-2.1 1.6A16.4 16.4 0 0 1 5 6.1c-.1-1 .6-1.9 1.6-2.1Z" /></svg>
              </i>
            </a>
            <a href="mailto:rajdeeplotey21@gmail.com" aria-label="Email" title="Email" onClick={() => setIsContactOpen(false)}>
              <i className="contact-modal-icon contact-modal-icon-email" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d="M3.5 5.5h17v13h-17v-13Zm1.8 1.8 6.7 5.3 6.7-5.3H5.3Zm13.4 9.4v-7l-6.7 5.1-6.7-5.1v7h13.4Z" /></svg>
              </i>
            </a>
          </div>
        </section>
      )}
      <a
        className="whatsapp-float"
        href="https://wa.me/919779082731"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Rajdeep on WhatsApp"
        title="Chat on WhatsApp"
      >
        <svg aria-hidden="true" viewBox="0 0 32 32">
          <path d="M16 3.2a12.8 12.8 0 0 0-11.1 19.2L3.2 29l6.8-1.7A12.8 12.8 0 1 0 16 3.2Zm0 23.2a10.4 10.4 0 0 1-5.3-1.45l-.38-.23-4.03 1 1.08-3.92-.25-.4A10.4 10.4 0 1 1 16 26.4Z" />
          <path d="M21.7 18.7c-.3-.15-1.78-.88-2.05-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.95 1.18-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.67-2.08-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.68-1.63-.93-2.23-.25-.6-.5-.52-.68-.53h-.58c-.2 0-.52.08-.8.37-.28.3-1.04 1.02-1.04 2.5s1.07 2.9 1.22 3.1c.15.2 2.1 3.2 5.1 4.5.72.3 1.28.48 1.72.61.72.23 1.38.2 1.9.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.17-1.43-.07-.13-.27-.2-.57-.35Z" />
        </svg>
      </a>
    </div>
  )
}

export default function App() {
  const [pathname, setPathname] = useState(window.location.pathname)

  useEffect(() => {
    const handlePopState = () => setPathname(window.location.pathname)
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const projectSlug = getProjectSlug(pathname)
  return projectSlug ? <ProjectDetail slug={projectSlug} /> : <PortfolioHome />
}
