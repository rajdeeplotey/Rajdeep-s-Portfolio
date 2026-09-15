import { useEffect } from 'react'

const loteyImages = ['/lotey-gate.png', '/lotey-staircase.png']

// Presentation-only: ProjectSequence's master ScrollTrigger drives these CSS variables.
export default function LoteyInnerShowcase({ showcaseRef, reducedMotion }) {
  useEffect(() => {
    if (reducedMotion) return undefined
    const preloaders = loteyImages.map((source) => {
      const image = new Image()
      image.decoding = 'async'
      image.src = source
      return image
    })
    return () => preloaders.forEach((image) => { image.src = '' })
  }, [reducedMotion])

  return (
    <div ref={showcaseRef} className={`lotey-inner-showcase ${reducedMotion ? 'lotey-inner-showcase-reduced' : ''}`} aria-label="Lotey Metal Crafts website case study">
      <div className="lotey-inner-panel">
        <img className="lotey-inner-image lotey-inner-gate" src={loteyImages[0]} alt="Stainless-steel and wooden entrance gate by Lotey Metal Crafts" />
        <img className="lotey-inner-image lotey-inner-staircase" src={loteyImages[1]} alt="Glass staircase railing by Lotey Metal Crafts" />
      </div>
    </div>
  )
}
