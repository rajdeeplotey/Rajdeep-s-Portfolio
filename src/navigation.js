export const portfolioReturnScrollKey = 'portfolio-project-return-scroll'

export function navigateWithinApp(path, state = {}, replace = false) {
  const method = replace ? 'replaceState' : 'pushState'
  window.history[method](state, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

function isPrimaryNavigationEvent(event) {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false
  if (typeof event.button === 'number' && event.button !== 0) return false
  return true
}

export function handleProjectNavigation(event) {
  if (!isPrimaryNavigationEvent(event)) return

  event.preventDefault()
  const href = event.currentTarget.getAttribute('href')
  const projectId = href?.match(/^\/projects\/([^/]+)\/?$/)?.[1]
  const projectElement = projectId
    ? document.querySelector(`.project-sequence-meta.project-sequence-${projectId}`)
    : null
  sessionStorage.setItem(portfolioReturnScrollKey, JSON.stringify({
    projectId,
    scrollY: window.scrollY,
    projectOffset: projectElement?.getBoundingClientRect().top ?? null,
  }))
  navigateWithinApp(href, { projectReturn: true })
}

export function handlePortfolioBack(event) {
  if (!isPrimaryNavigationEvent(event)) return

  event.preventDefault()
  const projectId = window.location.pathname.match(/^\/projects\/([^/]+)\/?$/)?.[1]
  navigateWithinApp('/#work', { projectReturn: true, projectId }, true)
}