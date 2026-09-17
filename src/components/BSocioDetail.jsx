import { handlePortfolioBack } from '../navigation'

function updateFloatingImagePull(event, side) {
  if (window.matchMedia('(max-width: 800px), (prefers-reduced-motion: reduce)').matches) return

  const image = event.currentTarget
  const bounds = image.getBoundingClientRect()
  const position = (event.clientX - bounds.left) / bounds.width
  const cursorPull = side === 'left'
    ? Math.max(0, Math.min(18, position * 18))
    : Math.max(-18, Math.min(0, (position - 1) * 18))
  image.style.setProperty('--bsocio-cursor-pull', `${cursorPull}px`)
}

function resetFloatingImagePull(event) {
  event.currentTarget.classList.remove('is-touch-active')
  event.currentTarget.style.removeProperty('transform')
  event.currentTarget.style.setProperty('--bsocio-cursor-pull', '0px')
}

function activateTouchPull(event) {
  if ((event.pointerType !== 'touch' && event.pointerType !== 'pen') || !window.matchMedia('(max-width: 800px)').matches) return

  const image = event.currentTarget
  image.classList.add('is-touch-active')
  const direction = image.classList.contains('bsocio-float-left') ? 75 : -75
  image.style.setProperty('transform', `translateX(${direction}px) scale(1.06)`, 'important')
}

export default function BSocioDetail({ project }) {
  return (
    <main className="bsocio-page">
      <div className="bsocio-canvas">
        <nav className="bsocio-nav" aria-label="B Socio project navigation">
          <a href="/#work" className="bsocio-brand" onClick={handlePortfolioBack}>LEAD INTELLIGENCE</a>
          <div className="bsocio-nav-links">
            <a href="#overview">Overview</a>
            <a href="#scoring">Scoring</a>
            <a href="#technology">Technology</a>
          </div>
          <a href="/#work" className="bsocio-back" aria-label="Back to Projects" title="Back to Projects" onClick={handlePortfolioBack}>←</a>
        </nav>

        <header className="bsocio-hero" id="overview">
          <div className="bsocio-hero-copy">
            <p className="bsocio-eyebrow">AI-POWERED LEAD INTELLIGENCE</p>
            <h1>Lead Scoring<br />System</h1>
            <p className="bsocio-hero-lede">Intelligent lead scoring built to identify high-value opportunities.</p>
            <p className="bsocio-hero-meta">Python / Pandas / Scikit-Learn</p>
          </div>
          <div className="bsocio-hero-visual">
            <img src={project.images.hero} alt="B Socio product landing page" loading="eager" fetchPriority="high" />
            <span>PRODUCT / LEAD SIGNAL</span>
          </div>
        </header>

        {project.liveUrl && (
          <div className="bsocio-live-bridge">
            <a className="bsocio-live" href={project.liveUrl} target="_blank" rel="noopener noreferrer">View Live Project <span>↗</span></a>
          </div>
        )}

        <section className="bsocio-editorial" id="scoring">
          <img className="bsocio-float-image bsocio-float-left" src={project.images.scoring} alt="B Socio scored businesses dashboard" loading="lazy" onPointerMove={(event) => updateFloatingImagePull(event, 'left')} onPointerDown={activateTouchPull} onPointerUp={resetFloatingImagePull} onPointerCancel={resetFloatingImagePull} onPointerLeave={resetFloatingImagePull} />
          <div className="bsocio-editorial-copy">
            <span className="bsocio-star" aria-hidden="true">✦</span>
            <p className="bsocio-section-label">Intelligent lead scoring</p>
            <h2>Smarter leads.<br /><em>Clearer decisions.</em></h2>
            <p>BSOCIO turns behavioral and business data into a practical signal for prioritizing leads and making outreach more deliberate.</p>
            <div className="bsocio-flow-labels"><span>LEAD DATA</span><i>→</i><span>SCORING</span><i>→</i><span>ACTION</span></div>
          </div>
          <img className="bsocio-float-image bsocio-float-right" src={project.images.feature} alt="B Socio manual lead entry interface" loading="lazy" onPointerMove={(event) => updateFloatingImagePull(event, 'right')} onPointerDown={activateTouchPull} onPointerUp={resetFloatingImagePull} onPointerCancel={resetFloatingImagePull} onPointerLeave={resetFloatingImagePull} />
        </section>

        <section className="bsocio-context">
          <p className="bsocio-section-label">The system</p>
          <div className="bsocio-context-copy">
            <h2>From raw lead data to a clearer next move.</h2>
            <p>When lead information arrives in different forms, teams need a consistent way to read the signal. The project frames scoring as a practical bridge between business data and business action.</p>
          </div>
        </section>

        <section className="bsocio-feature-image">
          <div className="bsocio-image-caption"><span>04 / FINAL PRODUCT VIEW</span><strong>Scoring. Prioritization. Action.</strong></div>
          <img src={project.images.final} alt="B Socio analytics dashboard" loading="lazy" />
        </section>

        <section className="bsocio-tech" id="technology">
          <div><p className="bsocio-section-label">Technology</p><h2>A focused stack for a focused signal.</h2></div>
          <div className="bsocio-tech-flow"><span>Python / Pandas</span><i>→</i><span>Scikit-Learn</span><i>→</i><span>Prioritized output</span></div>
        </section>

        <footer className="bsocio-footer">
          <div><p className="bsocio-section-label">B Socio / Lead scoring system</p><h2>Score smarter.</h2></div>
          <a href="/#work" className="bsocio-back" aria-label="Back to Projects" title="Back to Projects" onClick={handlePortfolioBack}>←</a>
        </footer>
      </div>
    </main>
  )
}
