import { handlePortfolioBack } from '../navigation'

const basePath = import.meta.env.BASE_URL
const withBase = (path) => `${basePath}${path.replace(/^\/+/, '')}`

const totalImages = {
  hero: withBase('total/total 1.png'),
  portfolio: withBase('total/total 2.png'),
  gallery: withBase('total/total 3.png'),
}

const stack = [
  { name: 'React', note: 'Frontend' },
  { name: 'Node.js', note: 'Runtime' },
  { name: 'Express', note: 'Backend' },
  { name: 'MongoDB', note: 'Database' },
]

export default function TotalPublicityDetail({ project }) {
  return (
    <main className="total-publicity-page">
      <div className="total-publicity-canvas">
        <a className="total-publicity-back" href="/#work" onClick={handlePortfolioBack} aria-label="Back to projects" title="Back to projects">←</a>
        <section className="total-publicity-intro" id="top">
          <div className="total-publicity-intro-copy">
            <p className="total-publicity-eyebrow">/ digital experience</p>
            <h1>
              Building a<br />
              digital presence<br />
              for Total Publicity.
            </h1>
          </div>

          <div className="total-publicity-intro-side">
            <p>
              A modern digital experience designed to present Total Publicity&apos;s services,
              capabilities, and creative work through a clearer online presence.
            </p>
            <a href={project.url} target="_blank" rel="noreferrer">
              VIEW LIVE WEBSITE <span>↗</span>
            </a>
          </div>

          <div className="total-publicity-project-name">Total Publicity</div>
        </section>

        <figure className="total-publicity-hero-image">
          <img src={totalImages.hero} alt="Total Publicity website homepage" loading="eager" fetchPriority="high" />
        </figure>

        <section className="total-publicity-project-info" aria-label="Total Publicity project information">
          <div>
            <p className="total-publicity-section-label">Project overview</p>
            <h2>Designing a clearer digital experience.</h2>
          </div>

          <div className="total-publicity-project-facts">
            <div><span>Project</span><strong>Total Publicity Website</strong></div>
            <div><span>Project type</span><strong>Digital Agency Website</strong></div>
            <div><span>Role</span><strong>Design + Development</strong></div>
            <div><span>Focus</span><strong>Digital Presence + UX</strong></div>
          </div>
        </section>

        <section className="total-publicity-overview" id="about">
          <figure className="total-publicity-editorial-image">
            <img src={totalImages.portfolio} alt="Total Publicity portfolio presentation" loading="lazy" />
          </figure>

          <div className="total-publicity-editorial-copy">
            <p className="total-publicity-section-label">Project overview</p>
            <h2>
              Presenting a clearer<br />
              digital story.
            </h2>
            <p>
              Total Publicity is a digital agency website designed to present the brand&apos;s services,
              capabilities, and digital solutions through a modern and structured online
              experience. The project focuses on clear communication, strong visual
              presentation, responsive layouts, and a polished user experience.
            </p>
            <a className="total-publicity-text-link" href={project.url} target="_blank" rel="noreferrer">
              View project <span>↗</span>
            </a>
          </div>
        </section>

        <section className="total-publicity-features" id="services">
          <div className="total-publicity-section-header">
            <p className="total-publicity-section-label">What I built</p>
            <h2>Built for clarity, trust, and movement.</h2>
          </div>

          <div className="total-publicity-feature-list">
            <article>
              <span>01</span>
              <h3>Custom Website</h3>
              <p>A tailored digital presence built around Total Publicity&apos;s service offering and brand.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Responsive Experience</h3>
              <p>Layouts and components designed to stay polished across desktop, tablet, and mobile.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Visual Storytelling</h3>
              <p>Content hierarchy and project presentation structured to communicate capability clearly.</p>
            </article>
            <article>
              <span>04</span>
              <h3>Interactive UI</h3>
              <p>Smooth transitions, polished navigation, and a modern frontend experience throughout.</p>
            </article>
          </div>
        </section>

        <section className="total-publicity-showcase" id="portfolio">
          <div className="total-publicity-showcase-copy">
            <p className="total-publicity-section-label">The digital experience</p>
            <h2>Structured around a clear story.</h2>
          </div>

          <div className="total-publicity-showcase-grid">
            <div className="total-publicity-showcase-nav" aria-label="Website structure list">
              <span>01 HOME</span>
              <span>02 SERVICES</span>
              <span>03 ABOUT</span>
              <span>04 PORTFOLIO</span>
              <span>05 CONTACT</span>
            </div>

            <figure className="total-publicity-showcase-image large">
              <img src={totalImages.hero} alt="Total Publicity homepage showcase" loading="lazy" />
            </figure>

            <div className="total-publicity-showcase-text">
              <p>
                The structure keeps the brand message direct while allowing each offer and project
                section to breathe with a confident editorial rhythm.
              </p>
            </div>
          </div>
        </section>

        <section className="total-publicity-collage" aria-label="Project image collage">
          <figure className="total-publicity-collage-large">
            <img src={totalImages.hero} alt="Large Total Publicity project screen" loading="lazy" />
          </figure>
          <figure className="total-publicity-collage-medium">
            <img src={totalImages.portfolio} alt="Medium Total Publicity project screen" loading="lazy" />
          </figure>
          <figure className="total-publicity-collage-small">
            <img src={totalImages.gallery} alt="Small Total Publicity project screen" loading="lazy" />
          </figure>
        </section>

        <section className="total-publicity-tech" aria-label="Technology stack">
          <p className="total-publicity-section-label">Tech stack</p>
          <h2>Built with a focused modern stack.</h2>

          <div className="total-publicity-tech-list" aria-label="Project technologies used">
            {stack.map((item, index) => (
              <div key={item.name} className="total-publicity-tech-item">
                <span className="tech-index">0{index + 1}</span>
                <strong>{item.name}</strong>
                <small>{item.note}</small>
              </div>
            ))}
          </div>
        </section>

        <section className="total-publicity-details" id="contact">
          <div className="total-publicity-details-grid">
            <div><span>Project</span><strong>Total Publicity Website</strong></div>
            <div><span>Project type</span><strong>Digital Agency Website</strong></div>
            <div><span>Role</span><strong>Design + Development</strong></div>
            <div><span>Technology</span><strong>React · Node.js · Express · MongoDB</strong></div>
          </div>

          <a className="total-publicity-live-link" href={project.url} target="_blank" rel="noreferrer">
            VIEW LIVE WEBSITE <span>↗</span>
          </a>
        </section>

        <footer className="total-publicity-footer">
          <div className="total-publicity-footer-brand">TOTAL PUBLICITY</div>
          <div className="total-publicity-footer-note">/ digital experience</div>
          <a href="/#work" onClick={handlePortfolioBack}>Back to Projects</a>
        </footer>
      </div>
    </main>
  )
}
