import { handlePortfolioBack } from '../navigation'

const loteyImages = [
  '/lotey/lotey%201.png',
  '/lotey/lotey%202.png',
  '/lotey/lotey%203.png',
  '/lotey/lotey%204.png',
  '/lotey/lotey%205.png',
]

const loteyHeroThumbnails = [loteyImages[1], loteyImages[2], loteyImages[3]]

function TechnologyMark({ type }) {
  if (type === 'html') return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#e34f26" d="M3 2h18l-1.64 18.44L12 22l-7.36-1.56L3 2Z" /><path fill="#fff" d="m12 5.5 6.1 0-.23 2.55H12v2.63h5.66l-.64 6.25L12 18.1v-2.64l2.42-.5.17-1.73H12V5.5Zm-1.08 0H5.7l.23 2.55h4.76V5.5Zm0 5.18H6.4l.22 2.1h4.3v-2.1Zm0 4.27-2.43-.5.17 1.73 2.26.48v-1.71Z" /></svg>
  if (type === 'css') return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#1572b6" d="M3 2h18l-1.64 18.44L12 22l-7.36-1.56L3 2Z" /><path fill="#fff" d="M12 5.5H5.7l.23 2.55H12v2.63H6.16l.46 5.05L12 17.1v-2.65l-2.87-.76-.2-1.05H12V5.5Zm0 0h6.3l-.23 2.55H12V5.5Zm0 5.18h5.84l-.46 5.05L12 17.1v-2.65l2.87-.76.2-1.05H12v-1.96Z" /></svg>
  if (type === 'javascript') return <svg viewBox="0 0 24 24" aria-hidden="true"><rect width="20" height="20" x="2" y="2" fill="#f7df1e" /><path fill="#111" d="M13.1 17.1c.4.7.93 1.2 1.78 1.2.75 0 1.23-.38 1.23-.9 0-.62-.5-.84-1.32-1.2l-.45-.2c-1.3-.56-2.17-1.27-2.17-2.76 0-1.38 1.05-2.43 2.7-2.43 1.17 0 2.02.4 2.63 1.48l-1.44.92c-.32-.56-.66-.78-1.19-.78-.54 0-.88.34-.88.78 0 .55.34.77 1.13 1.11l.45.2c1.53.66 2.4 1.35 2.4 2.88 0 1.65-1.3 2.55-3.05 2.55-1.7 0-2.8-.81-3.34-1.88l1.52-.97Zm-6.35-5.96h1.85v5.13c0 1.88-.8 2.74-2.48 2.74-1.4 0-2.18-.72-2.6-1.58l1.48-.9c.27.48.52.88 1.03.88.47 0 .72-.24.72-1.08v-5.19Z" /></svg>
  if (type === 'vite') return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#bd34fe" d="m2 3 9.67 18L22 3l-10.1 1.84L2 3Z" /><path fill="#41d1ff" d="m12.1 1 3.15 5.52L12 18.5 8.76 6.52 12.1 1Z" /></svg>
  if (type === 'gsap') return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#88ce02" d="M3 4h18v3H7v4h10v3H7v4h14v3H3V4Z" /></svg>
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#111" d="M3 3h18v18H3V3Zm3.6 3.6v10.8h2.2V11l3.1 5.4h2L17 11v6.4h2.4V6.6h-2.3l-3.2 5.7-3.2-5.7H6.6Z" /></svg>
}

export default function LoteyDetail() {
  return (
    <main className="lotey-template">
      <section className="lotey-template-hero" id="lotey-story">
        <img className="lotey-template-hero-image" src={loteyImages[0]} alt="Lotey MetalCrafts custom metal gate" loading="eager" fetchPriority="high" />
        <div className="lotey-template-hero-shade" />
        <a className="lotey-template-back" href="/#work" onClick={handlePortfolioBack} aria-label="Back to Projects">←</a>
        <div className="lotey-template-hero-content">
        </div>
        <div className="lotey-template-hero-footer">
          <div className="lotey-template-hero-note"><span>PRECISION • FABRICATION • CRAFTSMANSHIP</span></div>
          <div className="lotey-template-thumbs" aria-label="Lotey project previews">
            {loteyHeroThumbnails.map((image, index) => <img key={image} src={image} alt={`Lotey project preview ${index + 2}`} loading="lazy" />)}
          </div>
        </div>
      </section>

      <section className="lotey-template-about" id="lotey-about">
        <div className="lotey-template-about-copy">
          <p className="lotey-template-section-label">Website Experience / Lotey MetalCrafts</p>
          <h2>Building<br />a Digital<br /><em>Experience.</em></h2>
          <p className="lotey-template-body">A modern business website built for Lotey MetalCrafts, focused on visual storytelling, smooth scroll-driven interactions, responsive UI, and a premium presentation of the brand and its work. Built with HTML5, CSS, and JavaScript, powered by Vite, with GSAP for animations, Lenis for smooth scrolling, and Lucide for interface icons.</p>
          <div className="lotey-template-stats"><div><strong>01</strong><span>Project Type<br />Business Website</span></div><div><strong>02</strong><span>Core Experience<br />Scroll-Scrubbed UI</span></div><div><strong>03</strong><span>Focus<br />Design + Development</span></div></div>
          <a className="lotey-template-button lotey-template-button-light" href="https://loteymetalcrafts.com/" target="_blank" rel="noreferrer">View project <span>↗</span></a>
        </div>
        <div className="lotey-template-collage" aria-label="Lotey MetalCrafts project collage">
            <img className="lotey-collage-one" src={loteyImages[1]} alt="Lotey staircase metalwork" loading="lazy" />
            <img className="lotey-collage-two" src={loteyImages[2]} alt="Lotey custom fabrication" loading="lazy" />
            <img className="lotey-collage-three" src={loteyImages[3]} alt="Lotey architectural metal detail" loading="lazy" />
            <img className="lotey-collage-four" src={loteyImages[4]} alt="Lotey structural metalwork" loading="lazy" />
        </div>
        <div className="lotey-template-trust"><span><TechnologyMark type="html" />HTML5</span><span><TechnologyMark type="css" />CSS3</span><span><TechnologyMark type="javascript" />JAVASCRIPT</span><span><TechnologyMark type="vite" />VITE</span><span><TechnologyMark type="gsap" />GSAP</span><span><TechnologyMark type="motion" />FRAMER MOTION</span></div>
      </section>

      <section className="lotey-template-services" id="lotey-services" aria-label="Lotey MetalCrafts services">
        {[
          ['lotey-service-one', loteyImages[1], 'CUSTOM WEBSITE'],
          ['lotey-service-two', loteyImages[2], 'SCROLL EXPERIENCE'],
          ['lotey-service-three', loteyImages[3], 'INTERACTIVE UI'],
          ['lotey-service-four', loteyImages[4], 'DEVELOPMENT STACK'],
        ].map(([className, image, label], index) => (
          <article className={`lotey-template-panel ${className}`} key={image}>
            <img src={image} alt={label} loading="lazy" />
            <div className="lotey-template-panel-shade" />
            <div className="lotey-template-panel-content"><small>0{index + 1}</small><h3>{label}</h3></div>
          </article>
        ))}
      </section>
    </main>
  )
}
