export const newsSelector = (state) => {
  return state.news.news
}

export const _metaNewsSelector = (state) => {
  return state.news.meta
}

export const isLoadingSelector = (state) => {
  return state.news.isLoading
}

export const isFetchingSelector = (state) => {
  return state.news.fetching
}
export const idActiveNewsSelector = (state) => {
  return state.news.idActiveNews
}
export const currentPageSelector = (state) => {
  return state.news.currentPage
}
