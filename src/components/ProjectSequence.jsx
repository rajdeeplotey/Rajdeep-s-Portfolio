import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { handleProjectNavigation } from '../navigation'

gsap.registerPlugin(ScrollTrigger)

const TRANSITION_WINDOW = 0.12
function getFramePath(folder, frameIndex) {
  return `${import.meta.env.BASE_URL}sequences/${folder}/frame-${String(frameIndex + 1).padStart(4, '0')}.webp`
}

function getInitialReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function ProjectSequence({ projects }) {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const metadataRefs = useRef([])
  const copyRefs = useRef([])
  const playheadRef = useRef({ progress: 0 })
  const activeRef = useRef(0)
  const timersRef = useRef(new Set())
  const [activeIndex, setActiveIndex] = useState(0)
  const reducedMotion = getInitialReducedMotion()

  useLayoutEffect(() => {
    const section = sectionRef.current
    const canvas = canvasRef.current
    if (!section || !canvas) return undefined

    const context = canvas.getContext('2d')
    const projectCount = projects.length
    const images = projects.map(() => [])
    const loaded = projects.map(() => new Set())
    const loading = projects.map(() => new Set())

    const getNearestLoadedFrame = (projectIndex, requestedFrame) => {
      const available = [...loaded[projectIndex]]
      if (!available.length) return -1
      return available.reduce((nearest, frameIndex) => (
        Math.abs(frameIndex - requestedFrame) < Math.abs(nearest - requestedFrame) ? frameIndex : nearest
      ))
    }

    const drawImageCover = (image, width, height, translateY = 0, opacity = 1, focalY = 0.5, zoom = 1) => {
      const isMobile = window.matchMedia('(max-width: 800px), (max-height: 500px) and (pointer: coarse)').matches
      const scale = (isMobile
        ? Math.min(width / image.naturalWidth, height / image.naturalHeight)
        : Math.max(width / image.naturalWidth, height / image.naturalHeight)) * zoom
      const drawWidth = image.naturalWidth * scale
      const drawHeight = image.naturalHeight * scale
      const offsetX = (width - drawWidth) / 2
      const offsetY = ((height - drawHeight) * focalY) + translateY

      context.globalAlpha = opacity
      context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight)
    }

    const drawProjectFrame = (projectIndex, requestedFrame, translateY = 0, opacity = 1) => {
      const frameIndex = getNearestLoadedFrame(projectIndex, requestedFrame)
      const image = frameIndex === -1 ? null : images[projectIndex][frameIndex]
      if (!image?.naturalWidth || !image.naturalHeight) return

      const width = canvas.clientWidth
      const height = canvas.clientHeight
      const isMobile = window.matchMedia('(max-width: 800px), (max-height: 500px) and (pointer: coarse)').matches
      const isTotalPublicity = projects[projectIndex].folder === 'total-publicity'
      const focalY = isTotalPublicity
        ? (isMobile ? 0.5 : 0.42)
        : 0.5
      const zoom = isTotalPublicity
        ? (isMobile ? 1 : 1.4)
        : 1
      const cropShiftY = isTotalPublicity && !isMobile ? -height * 0.04 : 0
      drawImageCover(image, width, height, translateY + cropShiftY, opacity, focalY, zoom)
    }

    const getProjectPosition = (progress) => {
      const projectIndex = Math.min(projectCount - 1, Math.floor(progress * projectCount))
      const localProgress = projectIndex === projectCount - 1
        ? Math.min(1, progress * projectCount - projectIndex)
        : progress * projectCount - projectIndex
      return { projectIndex, localProgress }
    }

    const getTransition = (progress) => {
      const boundarySize = TRANSITION_WINDOW / projectCount
      for (let nextProject = 1; nextProject < projectCount; nextProject += 1) {
        const boundary = nextProject / projectCount
        const distance = progress - boundary
        if (Math.abs(distance) <= boundarySize / 2) {
          return {
            from: nextProject - 1,
            to: nextProject,
            progress: (distance + (boundarySize / 2)) / boundarySize,
          }
        }
      }
      return null
    }

    const easeTransition = (value) => value < 0.5
      ? 2 * value * value
      : 1 - (((-2 * value) + 2) ** 2) / 2

    const updateMetadata = (progress) => {
      const transition = getTransition(progress)
      metadataRefs.current.forEach((metadata, index) => {
        if (!metadata) return
        metadata.style.opacity = '0'
        metadata.style.transform = 'translate3d(0, 0, 0)'
      })
      copyRefs.current.forEach((copy) => {
        if (!copy) return
        copy.style.opacity = '0'
        copy.style.filter = 'blur(0px)'
        copy.style.transform = 'translate3d(0, 0, 0) scale(1)'
      })

      if (transition) {
        const eased = easeTransition(transition.progress)
        const outgoing = metadataRefs.current[transition.from]
        const incoming = metadataRefs.current[transition.to]
        const outgoingCopy = copyRefs.current[transition.from]
        const incomingCopy = copyRefs.current[transition.to]
        if (outgoing) {
          outgoing.style.opacity = String(1 - (0.55 * eased))
          outgoing.style.transform = `translate3d(0, ${-10 * eased}%, 0)`
        }
        if (incoming) {
          incoming.style.opacity = String(0.45 + (0.55 * eased))
          incoming.style.transform = `translate3d(0, ${10 * (1 - eased)}%, 0)`
        }
        if (outgoingCopy) {
          outgoingCopy.style.opacity = String(1 - eased)
          outgoingCopy.style.filter = `blur(${2.5 * eased}px)`
          outgoingCopy.style.transform = `translate3d(${-100 * eased}%, 0, 0) scale(${1 - (0.03 * eased)})`
        }
        if (incomingCopy) {
          incomingCopy.style.opacity = String(eased)
          incomingCopy.style.filter = `blur(${2.5 * (1 - eased)}px)`
          incomingCopy.style.transform = `translate3d(${100 * (1 - eased)}%, 0, 0) scale(${0.97 + (0.03 * eased)})`
        }
        return
      }

      const { projectIndex } = getProjectPosition(progress)
      const activeMetadata = metadataRefs.current[projectIndex]
      const activeCopy = copyRefs.current[projectIndex]
      if (activeMetadata) activeMetadata.style.opacity = '1'
      if (activeCopy) {
        activeCopy.style.opacity = '1'
        activeCopy.style.filter = 'blur(0px)'
        activeCopy.style.transform = 'translate3d(0, 0, 0) scale(1)'
      }
    }

    const renderProgress = (progress) => {
      const { projectIndex, localProgress } = getProjectPosition(progress)
      const transition = getTransition(progress)
      const width = canvas.clientWidth
      const height = canvas.clientHeight

      context.clearRect(0, 0, width, height)
      context.globalAlpha = 1
      if (transition) {
        const eased = easeTransition(transition.progress)
        drawProjectFrame(transition.from, projects[transition.from].frameCount - 1, -height * 0.1 * eased, 1 - (0.55 * eased))
        drawProjectFrame(transition.to, 0, height * 0.1 * (1 - eased), 0.45 + (0.55 * eased))
      } else {
        drawProjectFrame(projectIndex, Math.round(localProgress * (projects[projectIndex].frameCount - 1)))
      }
      context.globalAlpha = 1
      updateMetadata(progress)
    }

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const width = Math.max(1, Math.round(rect.width))
      const height = Math.max(1, Math.round(rect.height))
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      context.imageSmoothingEnabled = true
      context.imageSmoothingQuality = 'high'
      renderProgress(playheadRef.current.progress)
      ScrollTrigger.refresh()
    }

    const loadFrame = (projectIndex, frameIndex) => {
      const frameCount = projects[projectIndex].frameCount
      if (frameIndex < 0 || frameIndex >= frameCount || loaded[projectIndex].has(frameIndex) || loading[projectIndex].has(frameIndex)) return

      loading[projectIndex].add(frameIndex)
      const image = new Image()
      image.decoding = 'async'
      image.src = getFramePath(projects[projectIndex].folder, frameIndex)
      image.onload = () => {
        images[projectIndex][frameIndex] = image
        loaded[projectIndex].add(frameIndex)
        loading[projectIndex].delete(frameIndex)
        renderProgress(playheadRef.current.progress)
      }
      image.onerror = () => loading[projectIndex].delete(frameIndex)
    }

    const progressivelyLoad = (projectIndex) => {
      const frameCount = projects[projectIndex].frameCount
      loadFrame(projectIndex, 0)
      let nextFrame = 1
      const loadBatch = () => {
        for (let count = 0; count < 8 && nextFrame < frameCount; count += 1, nextFrame += 1) {
          loadFrame(projectIndex, nextFrame)
        }
        if (nextFrame < frameCount) {
          const timer = window.setTimeout(() => {
            timersRef.current.delete(timer)
            loadBatch()
          }, 80)
          timersRef.current.add(timer)
        }
      }
      const timer = window.setTimeout(() => {
        timersRef.current.delete(timer)
        loadBatch()
      }, 30)
      timersRef.current.add(timer)
    }

    const loadActiveAndNext = (projectIndex) => {
      progressivelyLoad(projectIndex)
      if (projectIndex + 1 < projectCount) loadFrame(projectIndex + 1, 0)
    }

    const updateProgress = (progress) => {
      playheadRef.current.progress = progress
      const { projectIndex, localProgress } = getProjectPosition(progress)
      if (projectIndex !== activeRef.current) {
        activeRef.current = projectIndex
        setActiveIndex(projectIndex)
        loadActiveAndNext(projectIndex)
      }
      const frameIndex = Math.round(localProgress * (projects[projectIndex].frameCount - 1))
      loadFrame(projectIndex, frameIndex)
      renderProgress(progress)
    }

    loadActiveAndNext(0)
    resizeCanvas()

    let trigger
    const gsapContext = gsap.context(() => {
      if (!reducedMotion) {
        trigger = gsap.to(playheadRef.current, {
          progress: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${window.innerWidth <= 800 ? 5600 : 10000}`,
            scrub: 0.65,
            pin: true,
            onUpdate: (self) => updateProgress(self.progress),
          },
        })
      }
    }, section)

    let resizeRaf = null
    const handleResize = () => {
      if (resizeRaf !== null) cancelAnimationFrame(resizeRaf)
      resizeRaf = requestAnimationFrame(() => {
        resizeRaf = null
        resizeCanvas()
      })
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      if (resizeRaf !== null) cancelAnimationFrame(resizeRaf)
      trigger?.scrollTrigger?.kill()
      trigger?.kill()
      gsapContext.revert()
      timersRef.current.forEach((timer) => window.clearTimeout(timer))
      timersRef.current.clear()
      images.flat().forEach((image) => { if (image) image.src = '' })
    }
  }, [projects, reducedMotion])

  return (
    <>
      <section ref={sectionRef} id="work" className={`projects project-sequence-section project-sequence-active-${projects[activeIndex].slug} ${reducedMotion ? 'project-sequence-reduced' : ''}`} aria-labelledby="projects-title">
      <canvas ref={canvasRef} className="project-sequence-canvas" aria-label="Selected work project sequence" />
      <div className="project-sequence-overlay" aria-hidden="true" />
      <div className="project-sequence-heading">
        <span className="project-sequence-index">01 / Selected work</span>
      </div>
      {projects.map((project, index) => (
        <a
          className={`project-sequence-hitarea project-sequence-${project.slug} ${index === activeIndex ? 'is-active' : ''}`}
          href={`/projects/${project.slug}`}
          key={`${project.folder}-hitarea`}
          aria-label={`View ${project.title} project details`}
          aria-hidden={index !== activeIndex}
          tabIndex={index === activeIndex ? 0 : -1}
          onClick={handleProjectNavigation}
        >
          <span className="project-sequence-explore-cue">CLICK TO EXPLORE <b>↗</b></span>
        </a>
      ))}
      {projects.map((project, index) => (
        <div
          className={`project-sequence-meta project-sequence-${project.slug}`}
          key={project.folder}
          ref={(element) => { metadataRefs.current[index] = element }}
          aria-hidden={index !== activeIndex}
          aria-live={index === activeIndex ? 'polite' : undefined}
        >
          <span className="project-sequence-number">{project.number}</span>
          <div className="project-sequence-copy" ref={(element) => { copyRefs.current[index] = element }}>
            <h3>{project.title}</h3>
            <p>{project.category}</p>
            <span>{project.technology}</span>
          </div>
        </div>
      ))}
    </section>
    </>
  )
}
