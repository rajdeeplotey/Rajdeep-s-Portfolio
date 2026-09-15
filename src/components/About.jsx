import SectionTransition from './SectionTransition'

export default function About() {
  return (
    <SectionTransition className="about-transition" revealStart="top 100%">
      <section id="about" className="about-section foundation-section" aria-labelledby="about-title">
        <div className="about-editorial-grid">
          <div className="about-introduction">
            <p className="about-kicker about-reveal" data-reveal>About</p>
            <div className="about-copy about-reveal" data-reveal>
              <p className="about-lede">I&apos;m a Full-Stack Developer focused on building modern web applications, AI-powered workflows, and interactive digital experiences.</p>
              <p>From React interfaces and REST APIs to databases, AI integrations, automation, and deployment, I work across the complete product lifecycle.</p>
            </div>
            <div className="about-profile-line about-reveal" data-reveal>
              <img className="about-profile-photo" src="/rajdeep.jpeg" alt="Rajdeep Singh" />
              <div className="about-profile-copy">
                <strong>Rajdeep Singh</strong>
                <span>Ludhiana, Punjab, India</span>
              </div>
            </div>
          </div>

          <div className="about-statement">
            <p className="about-statement-label about-reveal" data-reveal>Digital products, thoughtfully made</p>
            <h2 id="about-title" className="about-statement-title about-reveal" data-reveal>I build digital products<br /><em>from idea to reality.</em></h2>
          </div>
        </div>

      </section>
    </SectionTransition>
  )
}
