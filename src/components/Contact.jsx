import { useEffect, useRef } from 'react'

export default function Contact() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const revealElements = section.querySelectorAll('.contact-reveal')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealElements.forEach((element) => element.classList.add('is-visible'))
      return undefined
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' })

    revealElements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="contact" className="contact-section" aria-labelledby="contact-title">
      <div className="contact-atmosphere" aria-hidden="true" />
      <div className="contact-inner">
        <div className="contact-kicker contact-reveal"><p>Let&apos;s build</p></div>
        <div className="contact-main">
          <h2 id="contact-title" className="contact-title contact-reveal">Have an idea?<br /><em>Let&apos;s build it.</em></h2>
          <p className="contact-support contact-reveal">Whether it&apos;s a full-stack application, an AI-powered system, an automated workflow, or an interactive web experience — I&apos;m open to building ambitious digital products.</p>
          <a className="contact-cta contact-reveal" href="mailto:rajdeeplotey21@gmail.com">Let&apos;s talk <span>→</span></a>
        </div>
      </div>
    </section>
  )
}
