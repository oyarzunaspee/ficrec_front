import type { PageContextClient } from 'vike/types'

export default function route(pageContext: PageContextClient) {
  return /^\/@[\w|\d]+$/.test(pageContext.urlPathname)
}