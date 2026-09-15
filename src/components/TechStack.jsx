import { useEffect, useRef } from 'react'

const groups = [
  ['01', 'FULL-STACK', ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'REST APIs']],
  ['02', 'AI & LLM', ['LLM Integration', 'Prompt Engineering', 'Agentic AI', 'Tool Calling', 'RAG', 'Embeddings', 'Vector Databases', 'Workflow Automation']],
  ['03', 'PYTHON & MACHINE LEARNING', ['Python', 'Pandas', 'Scikit-Learn', 'Logistic Regression', 'Random Forest', 'XGBoost']],
  ['04', 'BACKEND & DATA', ['FastAPI', 'Flask', 'Pydantic', 'SQL', 'MySQL', 'Supabase']],
  ['05', 'FRONTEND & EXPERIENCE', ['HTML5', 'CSS3', 'Responsive UI', 'Scroll-Driven Animation', 'Scroll-Scrubbed Animation']],
  ['06', 'TOOLS & DELIVERY', ['Git', 'GitHub', 'Postman', 'VS Code', 'WebStorm', 'Hostinger', 'AI-Assisted Development']],
]

export default function TechStack() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const revealElements = section.querySelectorAll('.tech-stack-reveal')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealElements.forEach((element) => element.classList.add('is-visible'))
      return undefined
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' })

    revealElements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="tech-stack" className="tech-stack-section" aria-labelledby="tech-stack-title">
      <header className="tech-stack-heading tech-stack-reveal">
        <div className="tech-stack-kicker"><p>Tech Stack</p></div>
        <div className="tech-stack-intro">
          <h2 id="tech-stack-title">The tools behind<br /><em>the work.</em></h2>
          <p>A practical stack built around modern web development, intelligent systems, and production-ready delivery.</p>
        </div>
      </header>

      <div className="tech-stack-groups">
        {groups.map(([number, title, technologies]) => (
          <article className="tech-stack-group tech-stack-reveal" key={title}>
            <div className="tech-stack-group-number">{number}</div>
            <h3>{title}</h3>
            <div className="tech-stack-list">
              {technologies.map((technology) => <span key={technology}>{technology}</span>)}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
