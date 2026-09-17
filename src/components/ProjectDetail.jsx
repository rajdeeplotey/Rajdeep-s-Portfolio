import { useLayoutEffect } from 'react'
import { getProjectBySlug } from './projectData'
import BSocioDetail from './BSocioDetail'
import LoteyDetail from './LoteyDetail'
import TotalPublicityDetail from './TotalPublicityDetail'
import { handlePortfolioBack } from '../navigation'

export default function ProjectDetail({ slug }) {
  const project = getProjectBySlug(slug)

  useLayoutEffect(() => {
    window.history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
  }, [slug])

  if (!project) {
    return (
      <main className="project-detail-page">
        <a className="project-detail-back" href="/#work" onClick={handlePortfolioBack}>Back to Projects</a>
        <div className="project-detail-not-found"><p>Project not found.</p><a href="/#work" onClick={handlePortfolioBack}>Return to Projects</a></div>
      </main>
    )
  }

  if (project.slug === 'bsocio') return <BSocioDetail project={project} />
  if (project.slug === 'lotey') return <LoteyDetail project={project} />
  if (project.slug === 'total-publicity') return <TotalPublicityDetail project={project} />

  const imagePath = (frame) => `/sequences/${project.folder}/frame-${String(frame).padStart(4, '0')}.webp`

  return (
    <main className="project-detail-page">
      <nav className="project-detail-nav" aria-label="Project navigation">
        <a className="project-detail-back" href="/#work" onClick={handlePortfolioBack}>Back to Projects</a>
        <span>{project.number} / Selected work</span>
      </nav>
      <header className="project-detail-hero">
        <p className="project-detail-kicker">{project.category}</p>
        <h1>{project.title}</h1>
        <p className="project-detail-overview">{project.overview}</p>
        <div className="project-detail-actions">
          {project.url && <a className="project-detail-live" href={project.url} target="_blank" rel="noreferrer">View Live Website <span>↗</span></a>}
          <span className="project-detail-tech">{project.technology}</span>
        </div>
      </header>
      <div className="project-detail-gallery">
        <img src={imagePath(1)} alt={`${project.title} project preview`} loading="eager" fetchPriority="high" />
        <img src={imagePath(62)} alt={`${project.title} interface detail`} loading="lazy" />
      </div>
      <section className="project-detail-content">
        <div>
          <p className="project-detail-label">The project</p>
          <h2>{project.purpose}</h2>
        </div>
        <div className="project-detail-facts">
          <div><span>My role</span><strong>{project.role}</strong></div>
          <div><span>Technology</span><strong>{project.technology}</strong></div>
        </div>
      </section>
      <section className="project-detail-bottom">
        <div>
          <p className="project-detail-label">Key features</p>
          <ul>{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
        </div>
        <div>
          <p className="project-detail-label">Development notes</p>
          <p>{project.details}</p>
        </div>
      </section>
      <footer className="project-detail-footer">
        <a className="project-detail-back" href="/#work" onClick={handlePortfolioBack}>Back to Projects</a>
        {project.url && <a className="project-detail-live" href={project.url} target="_blank" rel="noreferrer">View Live Website <span>↗</span></a>}
      </footer>
    </main>
  )
}
