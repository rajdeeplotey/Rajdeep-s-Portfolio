import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionTransition from './SectionTransition'

gsap.registerPlugin(ScrollTrigger)

const technologies = ['React', 'JavaScript', 'GSAP', 'ScrollTrigger', 'Canvas API', 'Vite']

export default function Technology() {
  const trackRef = useRef(null)

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduceMotion) return

      gsap.to(trackRef.current, {
        xPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: trackRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8,
        },
      })
    }, trackRef)

    return () => context.revert()
  }, [])

  return (
    <SectionTransition>
      <section id="process" className="technology-section" aria-labelledby="technology-title">
        <div className="technology-inner">
          <div className="foundation-kicker" data-reveal>
            <p>Technology</p>
          </div>
          <div className="technology-heading">
            <h2 id="technology-title" className="foundation-title" data-reveal>Quiet tools.<br /><em>Strong foundations.</em></h2>
            <p data-reveal>The stack stays close to the work: dependable primitives, clear interfaces, and just enough motion to make the system feel alive.</p>
          </div>
        </div>
        <div className="technology-marquee" aria-label="Technologies used in this project">
          <div className="technology-track" ref={trackRef}>
            {[...technologies, ...technologies].map((technology, index) => <span key={`${technology}-${index}`}>{technology}</span>)}
          </div>
        </div>
        <div id="contact" className="technology-contact" data-reveal>
          <span>Have a thoughtful project in mind?</span>
          <a href="mailto:hello@alexmorgan.dev">hello@alexmorgan.dev <b>↗</b></a>
        </div>
      </section>
    </SectionTransition>
  )
}
