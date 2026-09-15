import { useLayoutEffect, useRef } from 'react'

export default function AboutWorkTransition({ children }) {
  const shellRef = useRef(null)

  useLayoutEffect(() => {
    const shell = shellRef.current
    const about = shell?.querySelector('#about')
    if (!shell || !about) return undefined

    const updateHeight = () => {
      shell.style.setProperty('--about-height', `${about.offsetHeight}px`)
    }

    updateHeight()
    const observer = new ResizeObserver(updateHeight)
    observer.observe(about)

    return () => observer.disconnect()
  }, [])

  return <div ref={shellRef} className="about-work-transition">{children}</div>
}