const basePath = import.meta.env.BASE_URL
const withBase = (path) => `${basePath}${path.replace(/^\/+/, '')}`

export const projects = [
  {
    number: '01',
    title: 'LEAD SCORING',
    slug: 'bsocio',
    category: 'Lead Scoring System / AI & ML',
    technology: 'Python · Pandas · Scikit-Learn',
    folder: 'bsocio',
    frameCount: 124,
    liveUrl: 'https://lead-scoring-beta.vercel.app/index.html',
    images: {
      hero: withBase('b%20socio/b%20socio%201.png'),
      scoring: withBase('b%20socio/b%20socio%202.png'),
      feature: withBase('b%20socio/b%20socio%203.png'),
      final: withBase('b%20socio/b%20socio%204.png'),
    },
    theme: { primary: '#2f7df4', secondary: '#31d7e9', glow: '#5b4df5' },
    overview: 'An intelligent lead-scoring system that helps teams identify high-value opportunities and focus sales effort where it matters most.',
    purpose: 'BSOCIO turns behavioral and business data into a practical signal for prioritizing leads and making outreach more deliberate.',
    role: 'Data and machine learning development',
    features: ['Lead data preparation and analysis', 'Predictive scoring workflow', 'Structured outputs for sales prioritization'],
    details: 'The core challenge was turning inconsistent business inputs into a dependable scoring workflow. The implementation focuses on clean transformations, repeatable model inputs, and results that can be acted on by a non-technical team.',
  },
  {
    number: '02',
    title: 'Total Publicity',
    slug: 'total-publicity',
    category: 'Production Website',
    technology: 'Responsive UI · Frontend · Deployment',
    folder: 'total-publicity',
    frameCount: 124,
    url: 'https://totalpublicity.net/',
    overview: 'A focused production website for a publicity business, built to make its offer legible, credible, and easy to explore.',
    purpose: 'The site gives Total Publicity a stronger digital presence with a clear path from first impression to enquiry.',
    role: 'UI design and frontend development',
    features: ['Responsive page system', 'Service-led information architecture', 'Mobile-first presentation', 'Live website deployment'],
    details: 'The main challenge was creating a confident visual identity without burying the business message. The interface keeps the content direct while giving the brand enough visual character to be memorable.',
  },
  {
    number: '03',
    title: 'Lotey',
    slug: 'lotey',
    category: 'Scroll-Scrubbed Business Website',
    technology: 'HTML · CSS · JavaScript · Image Sequence Animation',
    folder: 'lotey',
    frameCount: 124,
    url: 'https://loteymetalcrafts.com/',
    overview: 'A modern business website built for Lotey MetalCrafts, focused on visual storytelling, smooth scroll-driven interactions, responsive UI, and a premium presentation of the brand and its work. Built with HTML5, CSS, and JavaScript, powered by Vite, with GSAP for animations, Lenis for smooth scrolling, and Lucide for interface icons.',
    purpose: 'Lotey presents the company, its capabilities, and its work through a visual story that feels considered on every screen size.',
    role: 'Creative direction, frontend development, and deployment',
    features: ['Scroll-scrubbed image sequence', 'Responsive business website', 'Craft-focused visual storytelling', 'Production deployment'],
    details: 'The central challenge was preserving a cinematic first impression without compromising usability. The page uses progressive image loading and responsive canvas rendering to keep the experience fluid while the story unfolds through scroll.',
  },
]

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug)
}
