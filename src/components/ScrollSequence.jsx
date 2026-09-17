import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Scrubs an ordered WebP frame sequence into a canvas using ScrollTrigger.
 * Frames should be named frame-0001.webp, frame-0002.webp, etc.
 */
export default function ScrollSequence({
  folder,
  frameCount,
  framePrefix = 'frame-',
  frameDigits = 4,
  className = '',
  priority = false,
  end = 'bottom top',
}) {
  const canvasRef = useRef(null)
  const triggerRef = useRef(null)
  const resolvedFolder = folder.startsWith('/')
    ? `${import.meta.env.BASE_URL}${folder.replace(/^\/+/, '')}`
    : `${import.meta.env.BASE_URL}${folder}`

  useLayoutEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !frameCount) return undefined

    const context = canvas.getContext('2d')
    const frames = Array.from({ length: frameCount }, (_, index) => {
      const image = new Image()
      image.src = `${resolvedFolder}/${framePrefix}${String(index + 1).padStart(frameDigits, '0')}.webp`
      if (priority && index === 0) image.fetchPriority = 'high'
      return image
    })

    const drawFrame = (index) => {
      const image = frames[index]
      if (!image?.complete || !image.naturalWidth) return
      const isMobile = window.matchMedia('(max-width: 800px), (max-height: 500px) and (pointer: coarse)').matches
      const scale = isMobile
        ? Math.min(canvas.width / image.naturalWidth, canvas.height / image.naturalHeight)
        : Math.max(canvas.width / image.naturalWidth, canvas.height / image.naturalHeight)
      const width = image.naturalWidth * scale
      const height = image.naturalHeight * scale
      context.clearRect(0, 0, canvas.width, canvas.height)
      context.drawImage(image, (canvas.width - width) / 2, (canvas.height - height) / 2, width, height)
    }

    const resize = () => {
      const bounds = canvas.getBoundingClientRect()
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = bounds.width * pixelRatio
      canvas.height = bounds.height * pixelRatio
      drawFrame(Math.round((triggerRef.current?.progress || 0) * (frameCount - 1)))
    }

    const firstFrame = frames[0]
    firstFrame.addEventListener('load', () => drawFrame(0), { once: true })
    const trigger = gsap.to({}, {
      ease: 'none',
      scrollTrigger: {
        trigger: canvas,
        start: 'top bottom',
        end,
        scrub: true,
        onUpdate: (self) => drawFrame(Math.round(self.progress * (frameCount - 1))),
      },
    })
    triggerRef.current = trigger.scrollTrigger

    resize()
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      trigger.scrollTrigger?.kill()
      frames.forEach((image) => { image.src = '' })
    }
  }, [folder, frameCount, framePrefix, frameDigits, priority])

  return <canvas ref={canvasRef} className={`scroll-sequence ${className}`} aria-label="Animated project sequence" />
}
