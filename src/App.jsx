import { useEffect } from 'react'
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

export default function App() {
  useEffect(() => {
    const updateScrollProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      document.documentElement.style.setProperty('--scroll-progress', `${max ? window.scrollY / max : 0}`)
    }
    updateScrollProgress()
    window.addEventListener('scroll', updateScrollProgress, { passive: true })
    return () => window.removeEventListener('scroll', updateScrollProgress)
  }, [])

  return (
    <div className="site-shell">
      <div className="scroll-progress" aria-hidden="true" />
      <Navbar />

      <main id="home">
        <WorkflowSequence />
        <AboutWorkTransition>
          <About />
          <Capabilities />
        </AboutWorkTransition>
        <Projects />
        <Experience />
        <TechStack />
        <Contact />
      </main>

      <Footer />
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
