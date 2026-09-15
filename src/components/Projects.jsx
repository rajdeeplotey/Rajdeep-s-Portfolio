import { useEffect, useRef } from 'react'

import ProjectSequence from './ProjectSequence'

const projects = [
  { number: '01', title: 'BSOCIO', category: 'Lead Scoring System / AI & ML', technology: 'Python · Pandas · Scikit-Learn', folder: 'bsocio', frameCount: 124 },
  { number: '02', title: 'Web Total', category: 'Production Website / Full-Stack', technology: 'React · APIs · Supabase · Deployment', folder: 'web-total', frameCount: 124 },
  { number: '03', title: 'Total Publicity', category: 'Production Website', technology: 'Responsive UI · Frontend · Deployment', folder: 'total-publicity', frameCount: 124 },
  { number: '04', title: 'Lotey', category: 'Scroll-Scrubbed Business Website', technology: 'HTML · CSS · JavaScript · Image Sequence Animation', folder: 'lotey', frameCount: 124 },
]

export default function Projects() {
  return <ProjectSequence projects={projects} />
}
