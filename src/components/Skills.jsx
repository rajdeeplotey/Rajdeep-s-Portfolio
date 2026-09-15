const skills = ['Creative development', 'Interaction design', 'Design systems', 'Motion direction', 'Technical strategy', 'Prototyping']

export default function Skills() {
  return (
    <section className="skills section-pad" aria-labelledby="skills-title">
      <div className="section-heading"><p className="eyebrow">What I bring</p></div>
      <div className="skills-layout"><h2 id="skills-title" className="section-title">A broad toolkit,<br /><em>sharply used.</em></h2><div className="skills-list">{skills.map((skill, index) => <div className="skill-row" key={skill}><span>0{index + 1}</span><strong>{skill}</strong><i>↗</i></div>)}</div></div>
    </section>
  )
}
