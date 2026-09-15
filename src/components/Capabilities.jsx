const capabilities = [
  ['01', 'FULL-STACK APPLICATIONS', 'Production-ready applications connecting interfaces, APIs, databases, business logic, and deployment.'],
  ['02', 'AI & LLM SYSTEMS', 'AI-powered applications connecting language models, APIs, tools, and structured data.'],
  ['03', 'WORKFLOW AUTOMATION', 'Visual systems connecting inputs, logic, APIs, AI, databases, and automated execution.'],
  ['04', 'DATA & MACHINE LEARNING', 'Applied machine learning systems that turn business data into useful predictions and insights.'],
  ['05', 'INTERACTIVE WEB EXPERIENCES', 'Responsive digital experiences with cinematic motion, scroll interactions, and polished UI.'],
]

export default function Capabilities() {
  return (
    <section id="work" className="what-builds-section" aria-labelledby="what-builds-title">
      <div className="what-builds-intro">
        <div className="what-builds-kicker"><p>What I build</p></div>
        <div className="what-builds-heading">
          <h2 id="what-builds-title" className="what-builds-title">,<br /><em>from interface to intelligence.</em></h2>
          <p className="what-builds-support">I build complete digital products across frontend, backend, AI, automation, and data.</p>
        </div>
      </div>
      <div className="what-builds-list">
        {capabilities.map(([number, title, description]) => (
          <article className="what-builds-item" key={title}>
            <span className="what-builds-number">{number}</span>
            <div className="what-builds-copy">
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
            <span className="what-builds-mark" aria-hidden="true">↗</span>
          </article>
        ))}
      </div>
    </section>
  )
}
