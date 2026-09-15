const steps = [['01', 'Listen closely', 'Every good project starts by making room for the real question underneath the brief.'], ['02', 'Find the shape', 'We explore, prototype, and test until the right idea has a pulse of its own.'], ['03', 'Make it real', 'Then we sweat the details: fast code, fluid motion, and a finish that feels inevitable.']]

export default function Process() {
  return <section className="process section-pad section-accent" aria-labelledby="process-title"><div className="section-heading"><p className="eyebrow">How I work</p></div><div className="process-top"><h2 id="process-title" className="section-title">Good process<br /><em>makes space.</em></h2><p>Clarity is a creative advantage. A small, focused team and a shared sense of direction can take an idea a long way.</p></div><div className="process-steps">{steps.map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
}
