export default function Footer() {
  return (
    <footer className="portfolio-footer">
      <div className="portfolio-footer-main">
        <div className="portfolio-footer-identity">
          <strong>Rajdeep Singh</strong>
          <span>Full-Stack Developer</span>
          <span>MERN · AI/ML · Python</span>
        </div>
        <nav className="portfolio-footer-links" aria-label="Footer links">
          <a href="https://github.com/rajdeeplotey" rel="noreferrer">
            <svg className="footer-icon-github" aria-hidden="true" viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.18-3.37-1.18-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 7.98c.85 0 1.7.11 2.5.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.59c0 .26.18.57.69.48A10 10 0 0 0 12 2Z" /></svg>
            GitHub <b>↗</b>
          </a>
          <a href="https://www.linkedin.com/in/rajdeep-singh-686394423/" rel="noreferrer">
            <svg className="footer-icon-linkedin" aria-hidden="true" viewBox="0 0 24 24"><path d="M5.16 7.5A1.66 1.66 0 1 0 5.16 4a1.66 1.66 0 0 0 0 3.5ZM3.75 9h2.82v9H3.75V9Zm4.59 0h2.71v1.23h.04c.38-.71 1.3-1.46 2.67-1.46 2.85 0 3.38 1.87 3.38 4.3V18h-2.82v-4.37c0-1.04-.02-2.38-1.45-2.38-1.45 0-1.67 1.13-1.67 2.31V18H8.34V9Z" /></svg>
            LinkedIn <b>↗</b>
          </a>
          <a href="mailto:rajdeeplotey21@gmail.com">
            <svg className="footer-icon-mail" aria-hidden="true" viewBox="0 0 24 24"><path d="M3.5 5.5h17v13h-17v-13Zm1.3 1.3 6.92 5.23a.47.47 0 0 0 .56 0L19.2 6.8M4.1 17.2l5.22-4.37m10.58 4.37-5.22-4.37" /></svg>
            Email <b>↗</b>
          </a>
        </nav>
        <div className="portfolio-footer-contact">
          <a href="mailto:rajdeeplotey21@gmail.com">rajdeeplotey21@gmail.com</a>
          <span>Ludhiana, Punjab, India</span>
          <a href="tel:+919779082731">+91 97790 82731</a>
        </div>
      </div>
      <div className="portfolio-footer-bottom">
        <span>© 2026 Rajdeep Singh. All rights reserved.</span>
        <a href="#home">Back to top ↑</a>
      </div>
    </footer>
  )
}
