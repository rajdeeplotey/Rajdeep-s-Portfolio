import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SectionTransition({ children, className = '', revealStart = 'top 86%' }) {
  const sectionRef = useRef(null)

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const elements = gsap.utils.toArray('[data-reveal]')
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (reduceMotion) {
        gsap.set(elements, { clearProps: 'all' })
        return
      }

      elements.forEach((element, index) => {
        gsap.fromTo(element,
          { autoAlpha: 0, y: 34 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            delay: index * 0.06,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: revealStart,
              once: true,
            },
          },
        )
      })

    }, sectionRef)

    return () => context.revert()
  }, [revealStart])

  return <div ref={sectionRef} className={`section-transition ${className}`}>{children}</div>
}
