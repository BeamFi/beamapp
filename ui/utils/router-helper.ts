export const routerShallowPush = (router, page, query) => {
  if (query == null) {
    router.push(`/${page}`, `/${page}.html`, {
      shallow: true
    })
  } else {
    router.push(`/${page}?${query}`, `/${page}.html?${query}`, {
      shallow: true
    })
  }
}
