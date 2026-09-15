import ScrollSequence from './ScrollSequence'

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
        <ScrollSequence folder="/sequences/hero" frameCount={90} priority className="hero-sequence" />
      </div>
      <span className="sequence-note">Scroll to explore</span>
      <div className="hero-meta"><span>Based in Amsterdam</span><span>52°22′N / 4°54′E</span><span>01 — 06</span></div>
    </section>
  )
}
