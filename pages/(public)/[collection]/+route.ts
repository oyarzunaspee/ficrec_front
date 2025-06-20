import type { PageContextClient } from "vike/types";

export default function route(pageContext: PageContextClient) {
  return /^\/@[\w|\d]+\/[\w|\d]{0,8}-[\w|\d]{0,4}-[\w|\d]{0,4}-[\w|\d]{0,4}-[\w|\d]{0,12}$/.test(pageContext.urlPathname)
}