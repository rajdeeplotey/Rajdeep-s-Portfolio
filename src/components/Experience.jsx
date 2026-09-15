import { useEffect, useRef } from 'react'

const entries = [
  {
    number: '01',
    label: 'Experience',
    title: 'FULL-STACK DEVELOPER',
    organization: 'Web Total',
    location: 'Ludhiana, Punjab, India',
    period: 'July 2025 — Present',
    description: 'Building and shipping production websites and full-stack digital products across frontend, backend, databases, AI integrations, deployment, testing, and maintenance.',
    highlights: [
      'Built and deployed production websites end-to-end',
      'React / MERN application development',
      'REST APIs and database integration',
      'AI-powered workflow and automation systems',
      'Deployment, QA, and ongoing maintenance',
    ],
  },
  {
    number: '02',
    label: 'Training',
    title: 'MERN STACK TRAINEE',
    organization: 'Sensation Software Solutions Pvt. Ltd.',
    location: 'Mohali, Punjab',
    period: '45-day offline MERN Stack training',
    description: '45-day offline MERN Stack training focused on responsive full-stack applications, REST APIs, database operations, frontend/backend integration, and Git/GitHub workflows.',
    highlights: ['MERN Stack Training Certificate'],
  },
  {
    number: '03',
    label: 'Education',
    title: 'BCA',
    organization: 'PCTE Group of Institutes',
    location: 'Ludhiana, Punjab',
    period: '2023 — 2026',
    description: '',
    highlights: [],
  },
]

export default function Experience() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const revealElements = section.querySelectorAll('.experience-reveal')
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
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' })

    revealElements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="experience" className="experience-section" aria-labelledby="experience-title">
      <header className="experience-heading experience-reveal">
        <div className="experience-kicker"><p>Experience / Journey</p></div>
        <h2 id="experience-title">Building across the stack,<br /><em>from production websites to intelligent systems.</em></h2>
      </header>

      <div className="experience-timeline">
        {entries.map((entry) => (
          <article className="experience-entry experience-reveal" key={entry.title}>
            <div className="experience-marker"><span>{entry.number}</span><i /></div>
            <div className="experience-entry-main">
              <div className="experience-meta">
                <p>{entry.label}</p>
                <span>{entry.period}</span>
              </div>
              <div className="experience-entry-grid">
                <div>
                  <h3>{entry.title}</h3>
                  <p className="experience-organization">{entry.organization}</p>
                  <p className="experience-location">{entry.location}</p>
                </div>
                <div className="experience-detail">
                  {entry.description && <p className="experience-description">{entry.description}</p>}
                  {entry.highlights.length > 0 && <ul>{entry.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
