import ScrollSequence from './ScrollSequence'

const heroSequenceFolder = `${import.meta.env.BASE_URL}sequences/workflow-dark-webp`

// Protected hero surface. Change only when the user explicitly requests a hero update.
export default function Hero() {
  return (
    <section className="hero section-pad" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow reveal">Independent developer / creative technologist</p>
        <h1 id="hero-title" className="display-title reveal">Digital work<br /><em>with feeling.</em></h1>
        <p className="hero-intro reveal">I build considered interfaces, expressive websites, and systems that make ambitious ideas easier to experience.</p>
        <a className="text-link reveal" href="#work">Explore selected work <span>↘</span></a>
      </div>
      <div className="hero-sequence-wrap">
        <ScrollSequence folder={heroSequenceFolder} frameCount={78} priority className="hero-sequence" end="bottom 15%" />
      </div>
      <div className="hero-meta"><span>Based in Amsterdam</span><span>52°22′N / 4°54′E</span><span>01 — 06</span></div>
    </section>
  )
}
